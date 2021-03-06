var mysql = require("mysql");
var inquirer = require("inquirer");
var connection = mysql.createConnection({
    host: "localhost",

    // Your port; if not 3306
    port: 3306,

    // Your username
    user: "root",

    // Your password
    password: "testtest",
    database: "bamazon"//set these two in final merge!!!!!!!!!!!!
});
connection.connect(function (err) {
    if (err) throw err;
    console.log("Connected as ID " + connection.threadID);
    // readProducts();
});

// function readProducts() {
//     console.log("Selecting all products...\n");
//     connection.query("SELECT * FROM products", function (err, res) {
//         if (err) throw err;
//         // Log all results of the SELECT statement
//         console.log(res);
//         connection.end();
//     });
// }

connection.query("select * FROM products", function (error, results, fields) {
    if (error) throw error;
    console.log("Items currently for sale")

    for (let i = 0; i < results.length; i++) {
        const products = results[i];
        console.log(products.item_id + " " + products.product_name + " " + products.price)
    }
    promptUser();



});

function promptUser() {

    inquirer.prompt([{
        type: "input",
        message: "What is the ID of the item you'd like to buy?",
        name: "initialPrompt"
    },
    {
        type: "input",
        message: "How many would you like to purchase?",
        name: "initialPrompt2"
    },

    ]).then(answers => {
        console.log(answers.initialPrompt, answers.initialPrompt2)

        let itemChoice = answers.initialPrompt;
        let howMany = answers.initialPrompt2;
        var itemID = 'SELECT * FROM products WHERE ?';

        connection.query(itemID, { item_id: answers.initialPrompt }, function (err, data) {



            console.log("You'd like to buy " + howMany + " " + data[0].product_name + "s at $" + data[0].price + " each")

            let total = addTotal(parseFloat(data[0].price.toFixed(2)), parseFloat(howMany))

            console.log("Your toal is: $" + total)
            if (data.length === 0) {
                console.log("Need a valid ID")
            }
            else if (data[0].stock_quantity > howMany) {
                var updateStock = 'UPDATE products SET stock_quantity = ' + (data[0].stock_quantity - howMany) + ' WHERE item_id = ' + itemChoice;
                var inventory = data[0].stock_quantity;

                connection.query(updateStock, function (err, data) {
                    console.log("Success. We have that item in stock")

                })
            } else if (data[0].stock_quantity < howMany) {
                console.log("Sorry that item is not in stock in that quantity. Please try again")
            }
            connection.end();

        })
    });
}



function addTotal(item, quantity) {
    let total = item * quantity
    return total.toFixed(2)

}