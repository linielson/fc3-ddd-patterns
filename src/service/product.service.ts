import Product from "../entity/product";

// It is not recommended to perform this method to upgrade all database products.
// Common sense to define the services

export default class ProductService {
  static increasePrices(products: Product[], percentage: number): Product[] {
    products.forEach(product => {
      product.changePrice(product.price * percentage / 100 + product.price);
    });
    return products;
  }
}
