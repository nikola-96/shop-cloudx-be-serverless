import ProductService from "./productService";
import StockService from "./stocksService";

import dynamoDBClient from "../database/db";

export const productService = new ProductService(
  dynamoDBClient,
  process.env.PRODUCTS_TABLE
);

export const stockService = new StockService(
  dynamoDBClient,
  process.env.STOCKS_TABLE
);
