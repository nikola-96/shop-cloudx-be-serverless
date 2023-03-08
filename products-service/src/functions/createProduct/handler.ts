import type { ValidatedEventAPIGatewayProxyEvent } from "@libs/api-gateway";
import { formatJSONResponse } from "@libs/api-gateway";
import { middyfy } from "@libs/lambda";

import { productService, stockService } from "../../services";
import { validateAgainstConstraints } from "../../utils/validators";
import requestConstraints from "../../constraint/product/create.product.constraint.json";
import ProductModel from "src/models/productModel";
import schema from "./schema";

export const createProduct: ValidatedEventAPIGatewayProxyEvent<
  typeof schema
> = async (event) => {
  console.log("Incoming event for createProduct fnc");
  const productModel = new ProductModel(event.body);

  try {
    await validateAgainstConstraints(
      productModel.getEntityMappingsForAvailableProduct(),
      requestConstraints
    );

    Promise.all([
      await productService.createProduct(
        productModel.getEntityMappingsForProduct()
      ),
      await stockService.createSingleStock({
        product_id: productModel.getId(),
        count: productModel.getCount(),
      }),
    ]);

    console.log(
      `Created products, product id: ${JSON.stringify(productModel.getId())}`
    );
  } catch (error) {
    return formatJSONResponse(error);
  }

  return formatJSONResponse({
    data: productModel.getEntityMappingsForAvailableProduct(),
    statusCode: 201,
  });
};

export const main = middyfy(createProduct);
