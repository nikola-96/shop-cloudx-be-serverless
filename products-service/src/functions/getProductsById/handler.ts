import type { ValidatedEventAPIGatewayProxyEvent } from "@libs/api-gateway";
import { formatJSONResponse } from "@libs/api-gateway";
import { middyfy } from "@libs/lambda";

import { Product, Stock } from "../../types";

import { productService, stockService } from "../../services";

import schema from "./schema";

export const getProductsById: ValidatedEventAPIGatewayProxyEvent<
  typeof schema
> = async (event) => {
  const productId: string = event.pathParameters.productId;
  const [product, stock]: [Product, Stock] = await Promise.all([
    productService.getProductById(productId),
    stockService.getSingleStock(productId),
  ]);

  const productWithStock = { ...product, count: stock.count };
  const response = product
    ? {
        statusCode: 200,
        data: productWithStock,
      }
    : {
        statusCode: 404,
        data: "Product not found",
      };

  return formatJSONResponse(response);
};

export const main = middyfy(getProductsById);
