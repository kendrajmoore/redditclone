// shopping-cart.js
// These methods crete a simple shopping cart system.

var cart = []

function createItem(name, price, quantity = 1){
  return { name, price, quantity}
}
function addToCart(newItem){
  for (let item of cart) {
    // If the item exists in the cart, increment the quantity
    // by 1.  ^__^
    if  (newItem.name == item.name) {
      item.quantity += newItem.quantity
      return; // bye bye :)
    }
  }
  cart.push(newItem);
}
function getCart(){
  return [...cart];
}
function getCount() {
   return cart.reduce((total, item) => {
    /* (total, item) -> int

        Return the sum of the quantity of items
        in the shopping cart.

    */
    return total + item.quantity;
  }, 0);

}

function removeFromCart(itemName){
  for (let item in cart){
    if (cart[item].name == itemName){
      cart[item].quantity -= 1;

      if (cart[item].quantity < 1){
        cart.splice(item, 1);
        return
      }
    }
  }
}

function getTotal() {
  return cart.reduce((total, item) => {
    return total + (item.quantity * item.price);
  }, 0);
}

function clearCart() {
  cart = [];
}

function getTotalTax(total, tax_perc) {
  return getTotal() * (1 + tax_perc)
}
module.exports.createItem = createItem;
module.exports.addToCart = addToCart;
module.exports.getCart = getCart;
module.exports.getCount = getCount;
module.exports.getTotal = getTotal;
module.exports.clearCart = clearCart;
module.exports.removeFromCart = removeFromCart;
module.exports.getTotalTax = getTotalTax;
