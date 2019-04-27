// Load the MySQL pool connection
const pool = require('../data/config');
const path = require('path');
// Route the app
const router = app => {
    // Display welcome message on the root
    app.get('/', (request, response) => {
        response.sendFile(path.join(__dirname+'/index.html'));
    });

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


    // Delete a user
    app.delete('/users/:id', (request, response) => {
        const id = request.params.id;

        pool.query('DELETE FROM userData WHERE id = ?', id, (error, result) => {
            if (error) throw error;
            response.send('User deleted.');
        });
    });
}

// Export the router
module.exports = router;