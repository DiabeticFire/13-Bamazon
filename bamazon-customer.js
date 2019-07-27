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
    let id = "id: " + typeId(product.item_id);
    let name = " || name: " + product.product_name;
    let price = " || price: " + typePrice(product.price);

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
    "SELECT stock_quantity, price FROM products WHERE item_id = ?",
    [id],
    (err, res) => {
      if (err) throw err;

      let supply = res[0].stock_quantity;
      let price = res[0].price;

      if (ordered > supply) console.log("Insufficient Supply");
      else completeOrder(id, supply, ordered, price);
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
        "Thank you for your purchase of " + typePrice(price * ordered)
      );
    }
  );
}

function typePrice(n) {
  let result = "$";
  if (n % 1 === 0) result += n + ".00";
  else {
    let decimal = n - Math.floor(n);
    let whole = n - decimal;

    decimal = decimal.toString();

    decimal = decimal.padEnd(2, "0");
    decimal = decimal.substr(0, 2);

    result += whole + "." + decimal;
  }
  return result;
}

function typeId(n) {
  n = n.toString();
  return n.padStart(3, "0");
}
