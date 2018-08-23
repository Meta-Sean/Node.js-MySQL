var mysql = require("mysql");
var inquirer = require("inquirer");

// create the connection information for the sql database
var connection = mysql.createConnection({
  host: "localhost",

  // Your port; if not 3306
  port: 3306,

  // Your username
  user: "root",

  // Your password
  password: "root",
  database: "bamazonDB"
});

// connect to the mysql server and sql database
connection.connect(function(err) {
  if (err) throw err;
  // run the start function after the connection is made to prompt the user
  start();
});

// function which prompts the user for what action they should take
function start() {
  inquirer
  .prompt([
    {
      name: "id",
      type: "input",
      message: "What is the id of the item you would like to purchase?"
    },
    {
      name: "units",
      type: "input",
      message: "How many units of the item would you like to purchase?"
    },
     
  ])
    .then(function(answer) {
      //Run a function that checks the quantity of the given item id
      quanitityCheck(answer.id,answer.units); 
      
    });
}

function quanitityCheck(arg,arg2){
    connection.query("SELECT stock_quantity FROM products WHERE ?",{id: arg}, function(err, res) {
        if (err) throw err;
       
      //If the quanitity is less than the amount of units they want to purchase
      // Return Insufficent quanitity
      //Store the quantity in variable 
        //console.log(res[0].stock_quantity);
        var stock_quantity = res[0].stock_quantity;
        var newStock = stock_quantity - arg2;
        if (newStock <= 0){
            console.log('Insufficient quantity!, Check back later');
            connection.end();
            return;
        }else{
          
          decreaseInventory(arg,newStock);
          calcPrice(arg,arg2);
        }
        

      });

}

function decreaseInventory(id,newStock){
    console.log('Updating item quanitites');
    connection.query("UPDATE products SET ? WHERE ?",
    [
        {
            stock_quantity: newStock
        },
        {
            id: id
        } 
    ],  
    function(err, res) {
        console.log('Enjoy your purchase');
        console.log(res.affectedRows + " product updated!\n");
        console.log('New stock quantity: '+newStock);
        
       

        connection.end();
      });

}

//Function for calculating price of transaction
function calcPrice(arg,arg2){
  connection.query("SELECT price FROM products WHERE ?",{id: arg}, function(err, res) {
      if (err) throw err;
  
      var price = res[0].price;
      var cost = price * arg2;
      console.log('Total cost of purchase: $'+cost)
     
    });

}



