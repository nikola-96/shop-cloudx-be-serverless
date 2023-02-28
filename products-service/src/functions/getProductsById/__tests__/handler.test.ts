import { formatJSONResponse } from "@libs/api-gateway";
import { getProductsById } from "@functions/getProductsById/handler";
import { productsListMock } from "../../../mocks";

jest.mock("@middy/core", () => {
  return (handler) => {
    return {
      use: jest.fn().mockReturnValue(handler),
    };
  };
});

describe("getProductsList lambda test", () => {
  it("should return 200 with the products list", async () => {
    const event = {
      pathParameters: { productId: productsListMock[0].id },
    } as any;

    const result = await getProductsById(event, null, null);

    expect(result).toEqual(
      formatJSONResponse({ statusCode: 200, data: productsListMock[0] })
    );
  });
});
