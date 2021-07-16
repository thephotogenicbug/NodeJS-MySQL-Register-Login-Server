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
    var sql = "insert into emp(name , password, mobile) values('"+name+"', '"+password+"', '"+mobile+"')";
    mydatabase.query( sql , function(error , rows, fields){
        if(error) throw error
        res.send("User Details Received Successfully !");
        res.end();
    })
});


app.get("/userlist", function(req,res){
    var id = req.body.id;
    mydatabase.query('select * from users order by id desc' , function(error, rows, fields){
        if(error) throw error
        res.send(JSON.stringify(rows));
        res.end();
    })
})

app.listen(2222, function(){
    console.log("Server is Running on port 2222")
})