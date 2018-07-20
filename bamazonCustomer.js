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
            var item = answer.choice;
              connection.query('SELECT `quanity` FROM `products` WHERE `name`=' + connection.escape(item), function(err, results) {
                if (err) throw err;
                for(var i = 0; i < results.length; i++){
                currentQuanity = results[i].quanity;
                }
            
              if(answer.quanity > currentQuanity){
                console.log("That item is out of stock! There are only " + currentQuanity + " " + item + "(s) left.")
              }
              else{
                console.log("You just bought " + answer.quanity + " " + item + "(s).");
                var newQuanity = (currentQuanity -= answer.quanity)
                connection.query("UPDATE products SET ? WHERE ?",[{quanity: newQuanity},{name: item}],function(error) {
                  if (error) throw err;
                connection.query('SELECT `price` FROM `products` WHERE `name`=' + connection.escape(item), function(err, results){
                  if (err) throw err;
                  for(var i =0; i < results.length; i++){
                    itemPrice = results[i].price;
                  }
                  currentPrice = (itemPrice * answer.quanity);
                  console.log("That will be $" + currentPrice);
                  
                })
                });

              }
          });
        });
      });
    }