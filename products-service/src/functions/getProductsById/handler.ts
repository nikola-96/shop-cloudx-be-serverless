import type { ValidatedEventAPIGatewayProxyEvent } from "@libs/api-gateway";
import { formatJSONResponse } from "@libs/api-gateway";
import { middyfy } from "@libs/lambda";

import { Product } from "@src/types/product";

import { productService } from "../../services";

import schema from "./schema";

export const getProductsById: ValidatedEventAPIGatewayProxyEvent<
  typeof schema
> = async (event) => {
  const productId: string = event.pathParameters.productId;
  const product: Product = await productService.getProductById(productId);
  const response = product
    ? {
        statusCode: 200,
        data: product,
      }
    : {
        statusCode: 404,
        data: "Product not found",
      };

  return formatJSONResponse(response);
};

export const main = middyfy(getProductsById);
