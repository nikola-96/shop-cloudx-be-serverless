import { handlerPath } from "@libs/handler-resolver";

export default {
  handler: `${handlerPath(__dirname)}/handler.main`,
  events: [
    {
      httpApi: {
        method: "get",
        path: "/products",
        responseData: {
          200: {
            description: "Returns a products list",
            bodyType: "ProductsList",
          },
          400: {
            description: "Request failed",
          },
          500: {
            description: "Server Error",
          },
        },
      },
    },
  ],
};
