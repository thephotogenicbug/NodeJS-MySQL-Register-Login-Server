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
    var password = req.body.password;
    var mobile = req.body.mobile;
    var email = req.body.email;
    var sql = "insert into users(name, password, mobile, email) values('"+name+"', '"+password+"', '"+mobile+"', '"+email+"')";
    mydatabase.query( sql , function(error , rows, fields){
        if(error) throw error
        res.send("Registration Successfull !");
        res.end();
    })
});

// login with validation
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


// get product list
app.get("/product", function(req , res){
    var sql = "select * from product order by pid desc";
    mydatabase.query( sql , function(error , rows, fields){
        if(error) throw error
			res.send(rows);
			res.end();
    })
});

// post product details
app.post("/saveproduct", function(req , res){
    var name = req.body.pname;
    var price = req.body.pprice;
    var qty = req.body.pqty;
    var details = req.body.pdetails;
    var sql = "insert into product(name, price, qty, details) values('"+name+"', '"+price+"', '"+qty+"', '"+details+"')";
    mydatabase.query( sql , function(error , rows, fields){
        if(error) throw error
        res.send("Product Save Successfully!");
        res.end();
    })
});


app.listen(2222, function(){
    console.log("Server is Running on port 2222")
})