var inquirer = require('inquirer');
var mysql = require('mysql');

// Define the MySQL connection parameters
var connection = mysql.createConnection({
    host: 'localhost',
    port: 3306,
    user: 'root',
    password: '',
    database: 'bamazon_db'
});

// connection.connect(function (err) {
//     if (err) throw err;
//     console.log('connected as id: ' + connection.threadId)
// });


inquirer.prompt([
    {
        name: 'itemID',
        type: 'input',
        message: 'What is your item number?'
    }, {
      name: "units",
      type: "input",
      message: "How many units would you like?"
    }
  ]).then(function(answers) {
    const userInput = answers.itemID
  });
  