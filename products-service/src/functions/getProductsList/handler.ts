import type { ValidatedEventAPIGatewayProxyEvent } from "@libs/api-gateway";
import { formatJSONResponse } from "@libs/api-gateway";
import { middyfy } from "@libs/lambda";

import productsMock from "@mocks/products.mock.json";

import schema from "./schema";

const getProductsList: ValidatedEventAPIGatewayProxyEvent<
  typeof schema
> = async (_) => {
  return formatJSONResponse({
    data: productsMock,
  });
};

export const main = middyfy(getProductsList);
