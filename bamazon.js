var inquirer = require('inquirer');
var mysql = require('mysql');
var Table = require('cli-table');


 


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

const buyerID = () => {
    inquirer.prompt([{
        name: 'itemID',
        type: 'input',
        message: 'What is your item number?'
    }, {
        name: "units",
        type: "input",
        message: "How many units would you like?"
    }]).then(function (answers) {
        // console.log('answers', answers)
        let input = answers.itemID
        let unitAmount = parseInt(answers.units)
        let query = 'SELECT product_name, price, stock_quantity FROM products WHERE itemID=?';
        connection.query(query, [input], (error, data) => {            
            if (error) {
                throw error;
            } else {
                // unitAmount <= stockQuantity
                // console.log('Insufficent Quantity!')
                if (data.length == 0) {
                    console.log('There is no product found for this ID')
                    return; // if i don't have my return, then it will continue down to the function
                }
                let stockQuantity = data[0].stock_quantity; //[0] when you call the library, it returns an array of "stuff"
                if (unitAmount > stockQuantity) {
                    // console.log('stockQuantity', stockQuantity)
                    // console.log('unitAmount', unitAmount)
                    console.log('Insufficent Quantity!');
                } else {
                    let newQuantity = stockQuantity - unitAmount
                    let totalPrice = data[0].price * unitAmount
                    // console.log('newQuantity', newQuantity)
                    // console.log('stockQuantity', stockQuantity)
                    // console.log('unitAmount', unitAmount)
                    connection.query(
                        "UPDATE products SET ? WHERE ?",
                        [
                            {
                                stock_quantity: newQuantity
                            },
                            {
                                itemID: input
                            }
                        ],
                
                        function(err, res){
                            if (error) {
                                throw error;
                            } else {
                                console.log("$" + totalPrice);
                                return;
                            }
                        }
                    )
                }         
            }


        });
    });
}
buyerID();

// take my ID value, query the DB (use select statement). 
// save the price of the unit to a variable, calculate my totals, 
// update the same record in the database by subtracting stock_quantity from how many units the user wants to buy

// then display the totals
//if there isnt --> console log (“Insufficient quantity”)

// if there is --> calculate totals, display total price to user, and update record in DB