const express = require("express");
const app = express();
const cors = require("cors");
app.use(express.json())
app.use(cors())

//  MySQL Connection
const mysql = require("mysql");
const mydatabase = mysql.createConnection({
  host :    'localhost',
  user:     'root',
  password : '',
  database :  'project1'
});
mydatabase.connect(); 

//  post Method
app.post("/register", function(req , res){
    var name = req.body.uname;
    var email = req.body.email
    var password = req.body.password;
    var mobile = req.body.mobile;
    var sql = "insert into users(name, email, password, mobile) values('"+name+"', '"+email+"', '"+password+"', '"+mobile+"')";
    mydatabase.query( sql , function(error , rows, fields){
        if(error) throw error
        res.send("Registration Successfull !");
        res.end();
    })
});
app.post("/login", function(req , res){
    var password = req.body.password;
    var email = req.body.email;
	
    var sql = "select * from users where email='" +email+ "' and password='" +password+ "'";
    mydatabase.query( sql , function(error , rows, fields){
        if(error) throw error
		if(rows.length > 0){
			res.send(rows);
			res.end();
		}else{
			res.send({"id":""});
			res.end();
		}
       
    })
});

app.get("/products", function(req , res){
    var sql = "select * from product order by pid desc";
    mydatabase.query( sql , function(error , rows, fields){
        if(error) throw error
			res.send(rows);
			res.end();
    })
});

// app.get("/userlist", function(req,res){
//     var id = req.body.id;
//     mydatabase.query('select * from users order by id desc' , function(error, rows, fields){
//         if(error) throw error
//         res.send(JSON.stringify(rows));
//         res.end();
//     })
// })

app.listen(2222, function(){
    console.log("Server is Running on port 2222")
})