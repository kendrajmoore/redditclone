// cart.test.js
// Import Chai for assaertions


const chai = require('chai')
const should = chai.should()
const expect = chai.expect


// We will be testing these methods from cart.js
const shoppingCart = require('./shopping-cart');
const createItem = shoppingCart.createItem;
const count = shoppingCart.getCount;
const clearCart = shoppingCart.clearCart;
const addToCart = shoppingCart.addToCart;
const removeFromCart = shoppingCart.removeFromCart;
const getTotal = shoppingCart.getTotal;
const getTotalTax = shoppingCart.getTotalTax;

it('Should create a new item with name and price', () => {
  var newItem = shoppingCart.createItem("Laptop", 3000.00);
  expect(newItem).to.have.property("name");
  expect(newItem).to.have.property("price");
})

it('Should return an array containing all items in cart', ()=>{
  var cart = shoppingCart.getCart();
  expect(cart).to.have.lengthOf(0);
  expect(cart).to.be.an('array');
});

it('Should add a new item to the shopping cart', ()=>{
  let item = shoppingCart.createItem("dollar",3.99);
  shoppingCart.addToCart(item);
  expect(shoppingCart.getCart()).to.have.length(1);

});
it('Should return the number of items in the cart', () => {
  //need to clear cart first
  clearCart();
  let apple = createItem("Apple", 0.99);
  shoppingCart.addToCart(apple);
  let cartCount = shoppingCart.getCount();
  expect(cartCount).to.equal(1);
});
it('Should remove items from cart', () => {
  clearCart();
  let apple = createItem("Apple", 0.99);
  shoppingCart.addToCart(apple);
  expect(shoppingCart.getCount()).to.equal(1);
  clearCart();
  expect(shoppingCart.getCount()).to.equal(0);

});

// Stretch challenges
it('Should update the count of items in the cart', () => {
  clearCart();
  let apple = createItem("Apple", 0.99);
  addToCart(apple);
  let itemCount = count  // Should be 1
  let greenApple = createItem("Apple", 0.90, 3);
  addToCart(greenApple);
  itemCount = count(); // update the count, it should be 2 now
  expect(itemCount).to.equal(4);
});
it('Should remove an item when its count is 0',() =>{
  clearCart()
  let apple = createItem("Apple", .90, 3);
  addToCart(apple);
  removeFromCart("Apple");
  removeFromCart("Apple");
  removeFromCart("Apple");
  itemCount = count();
  expect(itemCount).to.equal(0);
  expect(shoppingCart.getCart()).to.have.length(0);
} );
it('Should return the total cost of all items in the cart', () => {
  clearCart();

  let apple = createItem("Apple", 0.99, 2);
  addToCart(apple);
  let totalPrice = getTotal();
  expect(totalPrice).to.equal(0.99 * 2);

  let orange = createItem("Orange", 1.99);
  addToCart(orange);
  totalPrice = getTotal();
  expect(totalPrice).to.equal((0.99 * 2) + 1.99);
});
it("should return an estimated total when tax and/or shipping is added", () => {
  clearCart();
  let shoes = createItem("Shoes", 100, 2);
  addToCart(shoes);
  let totalPrince = getTotal();
  except(getTotalTax(.1)).to.equal(220);

})
