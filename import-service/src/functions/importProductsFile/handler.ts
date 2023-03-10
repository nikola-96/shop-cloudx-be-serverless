import type { ValidatedEventAPIGatewayProxyEvent } from "@libs/api-gateway";
import { formatJSONResponse } from "@libs/api-gateway";
import { middyfy } from "@libs/lambda";

import { generateFileNameWithPrefix } from "../../utils/importProduct";
import { importProductsService } from "../../services/importProdructsService";

import schema from "./schema";
import { BUCKET_PREFIXES, FILE_TYPES } from "../../constants/s3";

const importProductsFile: ValidatedEventAPIGatewayProxyEvent<
  typeof schema
> = async (event) => {
  const fileName = event.queryStringParameters?.name;

  if (!fileName)
    return formatJSONResponse({
      statusCode: 400,
      data: "Bad request",
    });

  const generatedFileName = generateFileNameWithPrefix(
    BUCKET_PREFIXES.UPLOADED,
    fileName
  );

  const url = await importProductsService.getSignedUrlForPutOperation(
    generatedFileName,
    FILE_TYPES.CSV
  );

  return formatJSONResponse({
    statusCode: 200,
    data: url,
  });
};

export const main = middyfy(importProductsFile);
