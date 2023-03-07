import { ProductsList, Product } from "../types/product";
import { productsListMock } from "../mocks";

class ProductService {
  async getProductsList(): Promise<ProductsList> {
    return new Promise((resolve) => {
      setTimeout(() => resolve(productsListMock), 150);
    });
  }

  async getProductById(productId: string): Promise<Product | undefined> {
    return new Promise((resolve) => {
      setTimeout(
        () => resolve(productsListMock.find(({ id }) => id === productId)),
        150
      );
    });
  }
}

const productService = new ProductService();

export default productService;
