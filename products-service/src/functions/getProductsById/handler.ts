import type { ValidatedEventAPIGatewayProxyEvent } from "@libs/api-gateway";
import { formatJSONResponse } from "@libs/api-gateway";
import { middyfy } from "@libs/lambda";

import { Product } from "@src/types/product";

import productsMock from "@mocks/products.mock.json";

import schema from "./schema";

const getProductsById: ValidatedEventAPIGatewayProxyEvent<
  typeof schema
> = async (event) => {
  const productId: string = event.pathParameters.productId;
  const product: Product = productsMock.find(
    ({ id }: { id: string }) => id === productId
  );

  return formatJSONResponse({
    data: product,
  });
};

export const main = middyfy(getProductsById);
