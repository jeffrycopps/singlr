var express   =    require("express");
var mysql     =    require('mysql');
var app       =    express();
var bodyParser = require('body-parser');
var pool      =    mysql.createPool({
    connectionLimit : 100, //important
    host     : 'localhost',
    user     : 'root',
    password : '',
    database : 'testdb',
    debug    :  false
});
/** bodyParser.urlencoded(options)
 * Parses the text as URL encoded data (which is how browsers tend to send form data from regular forms set to POST)
 * and exposes the resulting object (containing the keys and values) on req.body
 */
app.use(bodyParser.urlencoded({
    extended: true
}));

/**bodyParser.json(options)
 * Parses the text as JSON and exposes the resulting object on req.body.
 */
app.use(bodyParser.json());

function ut_input_handler(req,res, service_name) {
   
    pool.getConnection(function(err,connection){
        if (err) {
			console.log(err);
          res.json({"code" : 100, "status" : "Error in connection database"});
          return;
        }  

        //console.log('connected as id ' + connection.threadId);
//==================add_apartment======================================================{       
		if(service_name == "add_apartment"){
			console.log("Add partment");
			var post  = req.body;
			console.log("Input: "+JSON.stringify(post));
			var query = connection.query('INSERT INTO t_apartment SET ?', post, function(err, result) {
				if(err)
				{
					/* Returns DB eror explained */
					res.json(err); 
					return;
				}
			
				/* Returns successful result - affected number of rows */
				res.json(result);
			});
		}
//==================add_apartment======================================================}

//==================get_apartment_by_id======================================================{		
		if(service_name == "get_apartment_by_id"){
			console.log("get_apartment_by_id");
			var post  = req.body;
			console.log("Input: "+JSON.stringify(post));
			/*var query = connection.query('INSERT INTO t_apartment SET ?', post, function(err, result) {
				if(err)
				{
					/* Returns DB eror explained */
				/*	res.json(err); 
					return;
				}
			
				/* Returns successful result - affected number of rows */
				/*res.json(result);
			});
			*/
			connection.query("SELECT * FROM t_apartment WHERE id = '"+post.id+"' LIMIT 1", function (error, results, fields) {
				console.log(error);
				if (error) {
					console.log(error);
					res.json({"code" : 100, "status" : "Error in connection database"});
				}
				
				if(results.length  > 0) {
					console.log(results);
					//res.json({"code" : 100, "status" : "Good response"});
					res.json(results);
				}
				else{
					res.json({"code" : 100, "status" : "Not available in table"});
					//res.json(results);
				}
					
			});
		}
		
//==================get_apartment_by_id======================================================}


//==================get_apartment_by_name======================================================{		
		if(service_name == "get_apartment_by_name"){
			console.log("get_apartment_by_name");
			var post  = req.body;
			console.log("Input: "+JSON.stringify(post));
			connection.query("SELECT * FROM t_apartment WHERE c_apartment_name = '"+post.c_apartment_name+"' LIMIT 1", function (error, results, fields) {
				if (error) {
					console.log(error);
					res.json({"code" : 100, "status" : "Error in connection database"});
					return;
				}
				
				if(results.length  > 0) {
					console.log(results);
					res.json(results);
					return;
				}
				else{
					res.json({"code" : 100, "status" : "Not available in table"});
					return;
				}
					
			});
		}
		
//==================get_apartment_by_name======================================================}


//==================get_all_apartments======================================================{		
		if(service_name == "get_all_apartments"){
			console.log("get_all_apartments");
			connection.query("SELECT * FROM t_apartment", function (error, results, fields) {
				if (error) {
					console.log(error);
					res.json({"code" : 100, "status" : "Error in connection database"});
					return;
				}
				
				if(results !=undefined && results.length  > 0) {
					console.log(results);
					res.json(results);
					return;
				}
				else{
					res.json({"code" : 100, "status" : "Not available in table"});
					//res.json(results);
					return;
				}
					
			});
		}
		
//==================get_all_apartments======================================================}

//==================remove_apartment_by_id======================================================{		
		if(service_name == "remove_apartment_by_id"){
			console.log("remove_apartment_by_id");
			var post  = req.body;
			connection.query("DELETE FROM t_apartment where id = '"+post.id+"'", function (error, results, fields) {
				if (error) {
					console.log(error);
					res.json({"code" : 100, "status" : "Error in connection database"});
					return;
				}
				if(results !=undefined) {
					console.log(results);
					res.json(results);
					return;
				}
				else{
					res.json({"code" : 100, "status" : "Not available in table"});
					return;
				}
					
			});
		}
		
//==================remove_apartment_by_id======================================================}

//==================shit======================================================{		
		if(service_name == "shit"){
			res.json({"code" : 100, "status":"Result not found"});
			return;
		}
		
//==================shit======================================================}

//==================get_service_status======================================================{		
		if(service_name == "get_service_status"){
			res.json({"code" : 100, "status":"Services are up.:)"});
			return;
		}
		
//==================get_service_status======================================================}

//==================add_flat======================================================{       
		if(service_name == "add_flat"){
			console.log("Add flat");
			var post  = req.body;
			console.log("Input: "+JSON.stringify(post));
			var query = connection.query('INSERT INTO t_flat SET ?', post, function(err, result) {
				if(err)
				{
					/* Returns DB eror explained */
					res.json(err); 
					return;
				}
			
				/* Returns successful result - affected number of rows */
				res.json(result);
			});
		}
//==================add_flat======================================================}
//==================get_all_flats======================================================{		
		if(service_name == "get_all_flats"){
			console.log("get_all_flats");
			connection.query("SELECT * FROM t_flat", function (error, results, fields) {
				if (error) {
					console.log(error);
					res.json({"code" : 100, "status" : "Error in connection database"});
					return;
				}
				
				if(results !=undefined && results.length  > 0) {
					console.log(results);
					res.json(results);
					return;
				}
				else{
					res.json({"code" : 100, "status" : "Not available in table"});
					//res.json(results);
					return;
				}
					
			});
		}
		
//==================get_all_flats======================================================}
//==================get_flats_by_apartment_id======================================================{		
		if(service_name == "get_flats_by_apartment_id"){
			console.log("get_flats_by_apartment_id");
			var post  = req.body;
			console.log("Input: "+JSON.stringify(post));

			connection.query("SELECT * FROM t_flat WHERE c_flat_apartment_id = '"+post.c_flat_apartment_id+"'", function (error, results, fields) {
				console.log(error);
				if (error) {
					console.log(error);
					res.json({"code" : 100, "status" : "Error in connection database"});
				}
				
				if(results.length  > 0) {
					console.log(results);
					//res.json({"code" : 100, "status" : "Good response"});
					res.json(results);
				}
				else{
					res.json({"code" : 100, "status" : "Not available in table"});
					//res.json(results);
				}
					
			});
		}
		
//==================get_flats_by_apartment_id======================================================}


//==================get_flats_by_flat_name======================================================{		
		if(service_name == "get_flats_by_flat_name"){
			console.log("get_flats_by_flat_name");
			var post  = req.body;
			console.log("Input: "+JSON.stringify(post));
			connection.query("SELECT * FROM t_flat WHERE c_flat_name = '"+post.c_flat_name+"'", function (error, results, fields) {
				if (error) {
					console.log(error);
					res.json({"code" : 100, "status" : "Error in connection database"});
					return;
				}
				
				if(results.length  > 0) {
					console.log(results);
					res.json(results);
					return;
				}
				else{
					res.json({"code" : 100, "status" : "Not available in table"});
					return;
				}
					
			});
		}
		
//==================get_flats_by_flat_name======================================================}

//==================remove_flat_by_id======================================================{		
		if(service_name == "remove_flat_by_id"){
			console.log("remove_flat_by_id");
			var post  = req.body;
			connection.query("DELETE FROM t_flat where id = '"+post.id+"'", function (error, results, fields) {
				if (error) {
					console.log(error);
					res.json({"code" : 100, "status" : "Error in connection database"});
					return;
				}
				if(results !=undefined) {
					console.log(results);
					res.json(results);
					return;
				}
				else{
					res.json({"code" : 100, "status" : "Not available in table"});
					return;
				}
					
			});
		}
		
//==================remove_flat_by_id======================================================}
//==================add_user======================================================{       
		if(service_name == "add_user"){
			console.log("Add user");
			var post  = req.body;
			console.log("Input: "+JSON.stringify(post));
			var query = connection.query('INSERT INTO t_user SET ?', post, function(err, result) {
				if(err)
				{
					/* Returns DB eror explained */
					res.json(err); 
					return;
				}
			
				/* Returns successful result - affected number of rows */
				res.json(result);
			});
		}
//==================add_user======================================================}
//==================get_all_users======================================================{		
		if(service_name == "get_all_users"){
			console.log("get_all_users");
			connection.query("SELECT * FROM t_user", function (error, results, fields) {
				if (error) {
					console.log(error);
					res.json({"code" : 100, "status" : "Error in connection database"});
					return;
				}
				
				if(results !=undefined && results.length  > 0) {
					console.log(results);
					res.json(results);
					return;
				}
				else{
					res.json({"code" : 100, "status" : "Not available in table"});
					//res.json(results);
					return;
				}
					
			});
		}
//==================get_all_users======================================================}
//==================remove_user_by_id======================================================{		
		if(service_name == "remove_user_by_id"){
			console.log("remove_user_by_id");
			var post  = req.body;
			connection.query("DELETE FROM t_user where id = '"+post.id+"'", function (error, results, fields) {
				if (error) {
					console.log(error);
					res.json({"code" : 100, "status" : "Error in connection database"});
					return;
				}
				if(results !=undefined) {
					console.log(results);
					res.json(results);
					return;
				}
				else{
					res.json({"code" : 100, "status" : "Not available in table"});
					return;
				}
					
			});
		}
		
//==================remove_user_by_id======================================================}
//==================add_service======================================================{       
		if(service_name == "add_service"){
			console.log("add_service");
			var post  = req.body;
			console.log("Input: "+JSON.stringify(post));
			var query = connection.query('INSERT INTO t_service SET ?', post, function(err, result) {
				if(err)
				{
					/* Returns DB eror explained */
					res.json(err); 
					return;
				}
			
				/* Returns successful result - affected number of rows */
				res.json(result);
			});
		}
//==================add_service======================================================}
//==================add_bill======================================================{       
		if(service_name == "add_bill"){
			console.log("add_bill");
			var post  = req.body;
			console.log("Input: "+JSON.stringify(post));
			var query = connection.query('INSERT INTO t_bill SET ?', post, function(err, result) {
				if(err)
				{
					/* Returns DB eror explained */
					res.json(err); 
					return;
				}
			
				/* Returns successful result - affected number of rows */
				res.json(result);
			});
		}
//==================add_bill======================================================}
//==================is_admin_credentials_valid===================================={
		if(service_name == "is_admin_credentials_valid"){
			console.log("is_admin_credentials_valid");
			var post  = req.body;
			console.log("Input: "+JSON.stringify(post));
			connection.query("SELECT * FROM t_admin WHERE c_admin_username = '"+post.c_admin_username+"' and c_admin_password = '"+post.c_admin_password+"'", function (error, results, fields) {
				if (error) {
					console.log(error);
					res.json({"code" : 100, "status" : "Error in connection database"});
					return;
				}
				
				if(results.length  > 0) {
					console.log(results);
					res.json({"code" : 200, "status" : "Available in the table"});
					//res.json(results);
					return;
				}
				else{
					res.json({"code" : 100, "status" : "Not available in table"});
					return;
				}
					
			});
		}

//==================is_admin_credentials_valid====================================}

        connection.on('error', function(err) {      
              res.json({"code" : 100, "status" : "Error in connection database"});
              return;    
        });
  });
}





app.post("/add_apartment",function(req,res){
        ut_input_handler(req, res, "add_apartment");
        /*
		{
			"c_apartment_name": "Nail Biter",
			"c_apartment_username": "username_is_myname",
			"c_apartment_password": "pleasedontseehere"
		}*/
});

app.post("/get_apartment_by_id",function(req,res){
        ut_input_handler(req, res, "get_apartment_by_id");
        /*{
			"id":"2"
		}*/
});

app.post("/get_apartment_by_name",function(req,res){
        ut_input_handler(req, res, "get_apartment_by_name");
        /*{
			"c_apartment_name":"polo1"
		}*/
});

app.post("/get_all_apartments",function(req,res){
        ut_input_handler(req, res, "get_all_apartments");
        
});

app.post("/remove_apartment_by_id",function(req,res){
        ut_input_handler(req, res, "remove_apartment_by_id");
        /*{
			"id":"2"
		}*/
});

app.post("/add_flat",function(req,res){
        ut_input_handler(req, res, "add_flat");
        /*
		{
			"c_flat_name": "Nail Biter",
			"c_flat_apartment_id": "2"
		}
		*/
});
app.post("/get_all_flats",function(req,res){
        ut_input_handler(req, res, "get_all_flats");
        /*
		{
		
		}
		*/
});

app.post("/get_flats_by_apartment_id",function(req,res){
        ut_input_handler(req, res, "get_flats_by_apartment_id");
        /*
		{
			"c_flat_apartment_id" : "8"
		}
		*/
});

app.post("/get_flats_by_flat_name",function(req,res){
        ut_input_handler(req, res, "get_flats_by_flat_name");
        /*
		{
			"c_flat_name" : "101"
		}
		*/
});

app.post("/remove_flat_by_id",function(req,res){
        ut_input_handler(req, res, "remove_flat_by_id");
        /*
		{
			"id" : "1"
		}
		*/
});

app.post("/add_user",function(req,res){
        ut_input_handler(req, res, "add_user");
        /*
		{
			"c_user_name": "Nail Biter",
			"c_user_password": "2",
			"c_is_user_flat_associated": "0",
			"c_user_flat_id": "1"
		}
		*/
});

app.post("/get_all_users",function(req,res){
        ut_input_handler(req, res, "get_all_users");
        /*
		{
		
		}
		*/
});

app.post("/remove_user_by_id",function(req,res){
        ut_input_handler(req, res, "remove_user_by_id");
        /*{
			"id":"2"
		}*/
});

app.post("/add_service",function(req,res){
        ut_input_handler(req, res, "add_service");
        /*
        {
			"c_service_name":"Maintenance"
		}*/
});

app.post("/add_bill",function(req,res){
        ut_input_handler(req, res, "add_bill");
        /*
        {
			"c_user_id":"5",
			"c_amount": "55.66",
			"c_service_id": "3",
			"c_from": "2008-7-04", 
			"c_to": "2008-7-04",
			"c_is_paid": "0"
		}*/
});

app.post("/is_admin_credentials_valid",function(req,res){
        ut_input_handler(req, res, "is_admin_credentials_valid");
        /*
         {
          "c_admin_username" : "polo",
          "c_admin_password" : "pwd"
         }
         */
});

app.post("/",function(req,res){-
		console.log("get_service_status");
        ut_input_handler(req,res, "get_service_status");
});


app.post("/*",function(req,res){-
		console.log("get_service_status");
        ut_input_handler(req,res, "shit");
});
app.get("/*",function(req,res){-
		console.log("get_service_status");
        ut_input_handler(req,res, "get_service_status");
});
app.get("/*",function(req,res){-
		console.log("get_service_status");
        ut_input_handler(req,res, "get_service_status");
});


app.listen(8080);
console.log("APIs hosted");
