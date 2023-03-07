import type { ValidatedEventAPIGatewayProxyEvent } from "@libs/api-gateway";
import { formatJSONResponse } from "@libs/api-gateway";
import { middyfy } from "@libs/lambda";

import { Product, Stock } from "../../types";

import { productService, stockService } from "../../services";

import schema from "./schema";

export const getProductsById: ValidatedEventAPIGatewayProxyEvent<
  typeof schema
> = async (event) => {
  console.log("Incoming event for getProductsById function");
  try {
    const productId: string = event.pathParameters.productId;
    const [product, stock]: [Product, Stock] = await Promise.all([
      productService.getProductById(productId),
      stockService.getSingleStock(productId),
    ]);

    const productWithStock = { ...product, count: stock ? stock.count : null };
    const response = product
      ? {
          statusCode: 200,
          data: productWithStock,
        }
      : {
          statusCode: 404,
          data: "Product not found",
        };

    console.log(`getProductById id value: ${JSON.stringify(product.id)}`);

    return formatJSONResponse(response);
  } catch (error) {
    return formatJSONResponse({
      statusCode: 500,
      data: error,
    });
  }
};

export const main = middyfy(getProductsById);
