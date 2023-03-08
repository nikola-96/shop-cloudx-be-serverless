import { StocksList } from "../types/stock";
import { ProductsList } from "../types/product";

export const getProductsWithCountInStocks = (
  productsList: ProductsList,
  stocks: StocksList
): ProductsList => {
  return productsList.map((product) => {
    let stock = stocks.find((stock) => stock.product_id === product.id);
    return {
      ...product,
      count: stock ? stock.count : 0,
    };
  });
};
