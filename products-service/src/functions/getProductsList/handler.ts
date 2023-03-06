import type { ValidatedEventAPIGatewayProxyEvent } from "@libs/api-gateway";
import { formatJSONResponse } from "@libs/api-gateway";
import { middyfy } from "@libs/lambda";

import { productService, stockService } from "../../services";
import { getProductsWithCountInStocks } from "../../utils/product";

import { StocksList, ProductsList } from "../../types";
import schema from "./schema";

export const getProductsList: ValidatedEventAPIGatewayProxyEvent<
  typeof schema
> = async (_) => {
  const [products, stocks]: [ProductsList, StocksList] = await Promise.all([
    productService.getProductsList(),
    stockService.getStocksList(),
  ]);

  const productsWithCountInStocks = getProductsWithCountInStocks(
    products,
    stocks
  );

  return formatJSONResponse({
    statusCode: 200,
    data: productsWithCountInStocks,
  });
};

export const main = middyfy(getProductsList);
