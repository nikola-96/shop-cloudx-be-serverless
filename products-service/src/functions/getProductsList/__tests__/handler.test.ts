import { formatJSONResponse } from "@libs/api-gateway";
import { getProductsList } from "@functions/getProductsList/handler";
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
    const event = {} as any;

    const result = await getProductsList(event, null, null);

    expect(result).toEqual(
      formatJSONResponse({ statusCode: 200, data: productsListMock })
    );
  });
});
