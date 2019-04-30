# REST-API Task
A basic api to register users in a database, including basic functions such as search and delete users.

### Installation
Run the following commands - 
1. Clone the repository
2. cd rest-api
3. npm init
4. npm install ejs body-parser express mysql request
5. Create local mysql database : 
userName varchar(25) NOT Null,
emailId varchar(50) primary key,
phoneNo varchar(10) Not Null,
password varchar(50) Not Null,

6. Run node app.js everytime you want to run the server.
7. Open browser and go to localhost:3002/
