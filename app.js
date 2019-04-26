// Require packages and set the port
const express = require('express');
const port = 3002;
const bodyParser = require('body-parser');
const app = express();

const path = require('path');
const mysql = require('mysql');

// Set database connection credentials
const config = {
    host: 'localhost',
    user: 'root',
    password: 'technothlon',
    database: 'api',
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
    pool.query("Insert into userData (userName,password,emailId,phoneNo) VALUES ('"+request.body.name+"','"+request.body.pwd+"','"+request.body.email+"','"+request.body.contact+"')",function(err, result)      
    {                                                      
      if (err)
         throw err;
    });
    response.sendFile(path.join(__dirname+'/res.html'));
    
});

app.get('/search',function(req,res){
	pool.query('SELECT emailId from userData where emailId like "%'+req.query.key+'%"', function(err, rows, fields) {
		  if (err) throw err;
	    var data=[];
	    for(i=0;i<rows.length;i++)
	      {
	        data.push(rows[i].first_name);
	      }
	      res.end(JSON.stringify(data));
		});
});


// Delete a user
app.delete('/users/:id', (request, response) => {
    pool.query("Insert into userData (userName,password,emailId,phoneNo) VALUES ('"+request.body.name+"','"+request.body.pwd+"','"+request.body.email+"','"+request.body.contact+"')",function(err, result)      
    {                                                      
      if (err)
         throw err;
    });
    response.sendFile(path.join(__dirname+'/res.html'));
});

// Start the server
const server = app.listen(port, (error) => {
    if (error) return console.log(`Error: ${error}`);

    console.log(`Server listening on port ${server.address().port}`);
});