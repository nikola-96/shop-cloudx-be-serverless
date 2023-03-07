import { handlerPath } from "@libs/handler-resolver";

export default {
  handler: `${handlerPath(__dirname)}/handler.main`,
  events: [
    {
      httpApi: {
        method: "get",
        path: "/products/{productId}",
        summary: "Get Product by Id",
        description: "Returns a product by id",
        responseData: {
          200: {
            description: "Returns a product by id",
            bodyType: "Product",
          },
          400: {
            description: "Request failed",
          },
          404: {
            description: "Product not found",
          },
          500: {
            description: "Server Error",
          },
        },
      },
    },
  ],
};
