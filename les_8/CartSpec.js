describe("Shopping Cart", function() {
  var cart;
  var productId = 1;
  var product = {id: productId, name: "Game 1", price: 100, count: 1};

  beforeEach(function() {
    cart = new Cart();
  });

  it("should be able to add product", function() {
    cart.addProduct(product);
    expect(cart.items.length).toBe(1);
    expect(cart.getProduct(productId)).toBe(product);
  });
  it("should be able to remove product", function() {
    cart.addProduct(product);
    cart.removeProduct(productId);
    expect(cart.items.length).toBe(0);
    expect(cart.getProduct(productId)).not.toBeDefined();
  });
  it("should be able to count items", function() { //не работает
    cart.addProduct(product);
    expect(cart.itemsCount).not.toBe(0);
  });
});

describe("Shopping Cart Async Request", function() {
  var cart;
  var productId = 1;

  beforeEach(function(done) {
    cart = new Cart();
    cart.onAdd(productId, done);
    cart.onClear(done);
    // cart.request(Api.load, done); //после проверки реквеста почему,то ломается вообще весь код))
  });
  it("shuold be able to clear the basket", function(done){ //не работает
    cart.onClear();
    expect(cart.items.length).toBe(0);
    expect(cart.itemsCount).toBe(0);
    expect(cart.totalAmount).toBe(0);
    done();
  });
  it("should be able to add product async", function(done) {
    expect(cart.items.length).toBe(1);
    expect(cart.getProduct(productId).id).toBe(productId);
    done();
  });
  // it("should be able to get config async", function(done) { //ломает код
  //   cart.request(Api.load);
  //   expect(cart.items.length).not.toBe(0);
  //   done();
  // });
});
