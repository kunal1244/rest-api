// Require packages and set the port
const express = require('express');
const port = 3002;
const bodyParser = require('body-parser');
const app = express();

const path = require('path');
const mysql = require('mysql');

// Set database connection credentials
const config = {
    host: 'db-intern.ciupl0p5utwk.us-east-1.rds.amazonaws.com',
    port: '3306',
    user: 'dummyUser',
    password: 'dummyUser01',
    database: 'b_intern',
};

// Create a MySQL pool
const pool = mysql.createPool(config);

app.set('view engine', 'ejs');
app.engine('html', require('ejs').renderFile);


// Use Node.js body parsing middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true,
}));

app.get('/', (request, response) => {
    response.sendFile(path.join(__dirname+'/reindex.html'));
});

app.get('/hash', (request, response) => {
    response.sendFile(path.join(__dirname+'/search.html'));
});

app.use(express.static(path.join(__dirname, 'statics')));

// Display all users
app.get('/users', (request, response) => {
    pool.query('SELECT * FROM userData', (error, result) => {
        if (error) throw error;

        response.send(result);
    });
});

// Add a new user
app.post('/users', (request, response) => {
    pool.query('SELECT * from userData where emailId like "%'+request.body.email+'%"', function(err, rows, fields) {
    	if (rows.length==0){
		    pool.query("Insert ignore into userData (userName,password,emailId,phoneNo) VALUES ('"+request.body.name+"','"+request.body.pwd+"','"+request.body.email+"','"+request.body.contact+"')",function(err, result)      
		    {                                                      
		      if (err)
		         throw err;
		    });
		    response.sendFile(path.join(__dirname+'/res.html'));
		}
		else{
			response.sendFile(path.join(__dirname+'/test.html'));
		}
	});
    
});

app.get('/search',function(req,res){
	pool.query('SELECT * from userData where emailId like "%'+req.query.key+'%"', function(err, rows, fields) {
		  if (err) throw err;
	    var data=[];
	    for(i=0;i<rows.length;i++)
	      {
	        data.push(rows[i].emailId, rows[i].userName, rows[i].phoneNo);
	      }
	      res.send(JSON.stringify(data));
		});
});


// Start the server
const server = app.listen(port, (error) => {
    if (error) return console.log(`Error: ${error}`);

    console.log(`Server listening on port ${server.address().port}`);
});
