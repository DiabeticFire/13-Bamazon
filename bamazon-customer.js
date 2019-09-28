const mysql = require("mysql");
const inquirer = require("inquirer");
const typeSet = require("./typeSet");

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

  let numOfIDs = 0;

  res.forEach(product => {
    let id = "id: " + typeSet.id(product.item_id);
    let name = " || name: " + product.product_name;
    let price = " || price: " + typeSet.price(product.price);

    name = name.padEnd(25);

    console.log(id + name + price);

    numOfIDs++;
  });

  ready(numOfIDs);
});

function ready(numOfIDs) {
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
      let id = Number(answers.id);
      let quantity = Number(answers.quantity);
      if (id <= numOfIDs) enoughSupply(id, quantity);
      else console.log("Invalid ID");
    });
}

function enoughSupply(id, ordered) {
  connection.query(
    "SELECT stock_quantity, price FROM products WHERE item_id = ?",
    [id],
    (err, res) => {
      if (err) throw err;

      let supply = res[0].stock_quantity;
      let price = res[0].price;

      if (ordered > supply) {
        console.log("Insufficient Supply");
        connection.end();
      } else completeOrder(id, supply, ordered, price);
    }
  );
}

function completeOrder(id, supply, ordered, price) {
  connection.query(
    "UPDATE products SET stock_quantity = ? WHERE item_id = ?",
    [supply - ordered, id],
    err => {
      if (err) throw err;

      console.log(
        "Thank you for your purchase of " + typeSet.price(price * ordered)
      );

      connection.end();
    }
  );
}
