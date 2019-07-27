function price(n) {
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

function id(n) {
  n = n.toString();
  return n.padStart(3, "0");
}

module.exports.id = id;
module.exports.price = price;
