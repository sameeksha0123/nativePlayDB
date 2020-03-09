const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql');

const connection = mysql.createPool({
  host     : 'http://staging.webstyle365.com/phpmyadmin/',
  user     : 'web365st_staging',
  password : 'sCAD&_23k.5N',
  database : 'web365st_robolist'
});

const app = express();

// Creating a GET route that returns data from the 'users' table.
app.get('/', function (req, res) {
     
    // Connecting to the database.
    connection.getConnection(function (err, connection) {
        if (err) throw err; 
    // Executing the MySQL query (select all data from the 'users' table).
    connection.query('SELECT * FROM wp_user_record LIMIT 0, 10', function (error, results, fields) {
      // If some error occurs, we throw an error.
      if (error) throw error;

      // Getting the 'response' from the database and sending it to our route. This is were the data is.
      res.send(JSON.stringify(results))
    });
  });
});

// Starting our server.
app.listen(3000, () => {
 console.log('Go to http://localhost:3000/ so you can see the data.............................');
});