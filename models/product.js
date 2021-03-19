class Product {
  constructor(
    id,
    ownerId,
    title,
    imageUrl,
    description,
    price,
    spPrice,
    category
  ) {
    this.id = id;
    this.ownerId = ownerId;
    this.imageUrl = imageUrl;
    this.title = title;
    this.description = description;
    this.price = price;
    this.spPrice = spPrice;
    this.category = category;
  }
}

export default Product;
