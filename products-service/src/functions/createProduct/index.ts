import { handlerPath } from "@libs/handler-resolver";

export default {
  handler: `${handlerPath(__dirname)}/handler.main`,
  events: [
    {
      httpApi: {
        method: "post",
        path: "/products",
        summary: "Create product",
        description: "Create product",
        responseData: {
          201: {
            description: "Successfully created product",
            bodyType: "Product",
          },
          400: {
            description: "Request failed",
          },
          422: {
            description: "Unprocessable entity",
          },
          500: {
            description: "Server Error",
          },
        },
      },
    },
  ],
};
