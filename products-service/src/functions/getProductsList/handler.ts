import type { ValidatedEventAPIGatewayProxyEvent } from "@libs/api-gateway";
import { formatJSONResponse } from "@libs/api-gateway";
import { middyfy } from "@libs/lambda";

import { productService } from "../../services";

import schema from "./schema";

const getProductsList: ValidatedEventAPIGatewayProxyEvent<
  typeof schema
> = async (_) => {
  const products = await productService.getProductsList();

  return formatJSONResponse({
    statusCode: 200,
    data: products,
  });
};

export const main = middyfy(getProductsList);
