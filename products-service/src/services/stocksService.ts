import { DocumentClient } from "aws-sdk/clients/dynamodb";

import { StocksList, Stock } from "../types/stock";
import BaseService from "./baseService";

export default class StockService extends BaseService {
  constructor(docClient: DocumentClient, tableName: string) {
    super(docClient, tableName);
  }

  async getStocksList(): Promise<StocksList> {
    return await this.getAllFromTable<Stock>();
  }

  async getSingleStock(productId): Promise<Stock> {
    return await this.getSingleValueFromTable<Stock>("product_id", productId);
  }
}
