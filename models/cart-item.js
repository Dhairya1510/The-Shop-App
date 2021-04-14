class CartItem {
  constructor(quantity, productImage, productPrice, productTitle, sum) {
    this.quantity = quantity;
    this.image = productImage;
    this.productPrice = productPrice;
    this.productTitle = productTitle;
    this.sum = sum;
  }
}

export default CartItem;
