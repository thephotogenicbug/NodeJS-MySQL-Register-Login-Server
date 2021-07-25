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

//  vendor register 
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

// vendor login login with validation
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


// post data to backend by vendor id (fetch function)
app.post("/vendorproduct", function(req , res){
    var vid   = req.body.vid;
    var sql = "select * from product where vendor='"+vid+"' order by pid desc";
    mydatabase.query( sql , function(error , rows, fields){
        if(error) throw error
			res.send(rows);
			res.end();
    })
});

// post data by vendor
app.post("/saveproduct", function(req , res){
    var name      = req.body.pname;
    var price     = req.body.pprice;
    var qty       = req.body.pqty;
    var details   = req.body.pdetails;
    var vid       = req.body.vid;
    // var pic       = req.body.pic
    var sql = "insert into product(vendor, name, price, qty, details) values('"+vid+"', '"+name+"', '"+price+"', '"+qty+"', '"+details+"')";
    mydatabase.query( sql , function(error , rows, fields){
        if(error) throw error
        res.send("Product Saved Successfully!");
        res.end();
    })
});

// add to cart
app.post("/addtocart", function(req , res){
    var vendor    = req.body.vendor; //on click send vendor id and product id 
    var pid       = req.body.pid;
    var sql = "insert into cart(vendor, pid, qty) values('"+vendor+"', '"+pid+"', '1')";
    mydatabase.query( sql , function(error , rows, fields){
        if(error) throw error
        res.send("Item Added in Cart Successfully!");
        res.end();
    })
});

// get cart item for customer
app.get("/cartitem", function(req , res){
    var sql = "select product.*, cart.* from cart,product where cart.pid=product.pid order by cartid desc";
    mydatabase.query( sql , function(error , rows, fields){
        if(error) throw error
			res.send(rows);
			res.end();
    })
});

// place order by customer
app.post("/placeorder", function(req , res){
	var cname = req.body.cname;
	var mobile = req.body.mobile;
	var address = req.body.address;
    var sql = "select product.name, product.price, product.photo, product.details, cart.pid, cart.qty, cart.vendor from cart, product where cart.pid=product.pid";
    mydatabase.query( sql , function(error , rows, fields){
			rows.map(pdata=>{ // run the for loop function 
				var sql2 = "insert into myorder(pid , qty, name, price, photo, vendor, details, customername, mobile, address) values('"+pdata.pid+"', '"+pdata.qty+"', '"+pdata.name+"', '"+pdata.price+"', '"+pdata.photo+"', '"+pdata.vendor+"', '"+pdata.details+"', '"+cname+"', '"+mobile+"', '"+address+"')";
				mydatabase.query(sql2);
			})               // truncate tableName
            mydatabase.query("truncate cart") // to clear data from cart after placing the order
			res.send("Order Placed Successfully !");
			res.end();
    })
});


// post data to myorder vendor page 
app.post("/vendororder", function(req , res){
    var vid   = req.body.vid;
    var sql = "select * from myorder where vendor='"+vid+"' order by orderid desc";
    mydatabase.query( sql , function(error , rows, fields){
        if(error) throw error
			res.send(rows);
			res.end();
    })
});

app.listen(2222, function(){
    console.log("Server is Running on port 2222")
})

  // alter table mysql query
/*
   alter table myorder
   add name    varchar(255),
   add price   float,
   add photo   text,
   add details text
*/