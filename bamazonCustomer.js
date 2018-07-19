var mysql = require("mysql");
var inquirer = require("inquirer");

var connection = mysql.createConnection({
  host: "localhost",

  // Your port; if not 3306
  port: 8889,

  // Your username
  user: "root",

  // Your password
  password: "root",
  database: "bamazon_DB"
});

connection.connect(function(err) {
  if (err) throw err;
  console.log("connected as id " + connection.threadId);
  showItems();
});

function showItems() {
    connection.query('SELECT `id`, `name`, `price` FROM `products`', function(err, res) {
      if (err) throw err;
      console.log(res);
      bidAuction();
    });
  }
  function bidAuction() {
      connection.query('SELECT `id`, `name`, `price` FROM `products`', function(err, results) {
        if (err) throw err;
        inquirer
          .prompt([
            {
              name: "choice",
              type: "rawlist",
              choices: function() {
                var choiceArray = [];
                for (var i = 0; i < results.length; i++) {
                  choiceArray.push(results[i].name);
                }
                return choiceArray;
              },
              message: "What item would you like to buy?"
            },
            {
              name: "quanity",
              type: "input",
              message: "How many would you like to buy?"
            }
          ])
          .then(function(answer) {
            // 7. Once the customer has placed the order, your application should check if your store has enough of the product to meet the customer's request.

            //    * If not, the app should log a phrase like `Insufficient quantity!`, and then prevent the order from going through.

            // 8. However, if your store _does_ have enough of the product, you should fulfill the customer's order.
            //    * This means updating the SQL database to reflect the remaining quantity.
            //    * Once the update goes through, show the customer the total cost of their purchase.
            });
        });
    }