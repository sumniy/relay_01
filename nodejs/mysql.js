var mysql = require('mysql');
var connection = newFunction();
connection.query('SELECT * FROM topic', function(error, results, fields){
  if(error) {
    console.log(error);
  }
  console.log(results);
});
connection.end();

function newFunction() {
  var connection = mysql.createConnection({
    host: '127.0.0.1',
    user: 'admin',
    password: 'admin',
    database: 'opentutorials'
  });
  connection.connect();
  return connection;
}
