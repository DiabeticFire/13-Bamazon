const mysql = require("mysql");
const inquirer = require("inquirer");
const typeSet = require("./typeSet");

const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "Joseph96",
  database: "bamazon_db"
});

db.connect(err => {
  if (err) throw err;
});

console.log("Welcome to Bamazon - Manager!");

inquirer
  .prompt([
    {
      name: "command",
      type: "list",
      message: "What would you like to do today?",
      choices: [
        "View Products for Sale",
        "View Low Inventory",
        "Add to Inventory",
        "Add New Product"
      ]
    }
  ])
  .then(answers => {
    switch (answers.command) {
      case "View Products for Sale":
        viewProducts();
        break;

      case "View Low Inventory":
        break;

      case "Add to Inventory":
        break;

      case "Add New Product":
        break;

      default:
        throw "error";
    }
  });

function viewProducts() {
  db.query(
    "SELECT item_id, product_name, price, stock_quantity FROM products",
    (err, res) => {
      if (err) throw err;

      res.forEach(record => {
        let id = "id: " + typeSet.id(record.item_id);
        let name = " || name: " + record.product_name;
        let price = " || price: " + typeSet.price(record.price);
        let quantity = " || quantity: " + record.stock_quantity;

        name = name.padEnd(25);
        price = price.padEnd(20);

        console.log(id + name + price + quantity);
      });
    }
  );
}
