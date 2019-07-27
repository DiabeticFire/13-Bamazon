const mysql = require("mysql");
const inquirer = require("inquirer");

const connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "Joseph96",
  database: "bamazon_db"
});

connection.connect(err => {
  if (err) throw err;
});

console.log("Welcome to Bamazon!");
console.log("Here are our products:");

connection.query("SELECT * FROM products", (err, res) => {
  if (err) throw err;

  res.forEach(product => {
    let id = "id: " + product.item_id;
    let name = " || name: " + product.product_name;
    let price = " || price: " + product.price;

    id = id.padEnd(7);
    name = name.padEnd(25);

    console.log(id + name + price);
  });

  ready();
});

function ready() {
  inquirer
    .prompt([
      {
        name: "id",
        message: "What is the id of the item you wish to purchase? "
      },
      {
        name: "quantity",
        message: "How many would you like to buy? "
      }
    ])
    .then(answers => {
      enoughSupply(answers.id, answers.quantity);
    });
}

function enoughSupply(id, ordered) {
  connection.query(
    "SELECT stock_quantity FROM products WHERE item_id = ?",
    [id],
    (err, res) => {
      if (err) throw err;

      let supply = res[0].stock_quantity;

      if (ordered > supply) console.log("Insufficient Supply");
      else console.log("Order Complete");
    }
  );
}
