const express = require("express");
const app = express();
const cors = require("cors");
app.use(express.json())
app.use(cors())

//  MySQL Connection
const mysql = require("mysql");
const mydatabase = mysql.createConnection({
  host :    'sql104.epizy.com',
  user:     'epiz_28888471',
  password : 'o4guduIUtZ4E',
  database :  'epiz_28888471_Naveen'
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


app.get("/userlist", function(req,res){
    var id = req.body.id;
    mydatabase.query('select * from student order by id desc' , function(error, rows, fields){
        if(error) throw error
        res.send(JSON.stringify(rows));
        res.end();
    })
})

app.listen(2222, function(){
    console.log("Server is Running on port 2222")
})