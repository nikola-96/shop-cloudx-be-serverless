import { DocumentClient } from "aws-sdk/clients/dynamodb";

import { ProductsList, Product } from "../types/product";
import BaseService from "./baseService";
export default class ProductService extends BaseService {
  constructor(docClient: DocumentClient, tableName: string) {
    super(docClient, tableName);
  }

  async getProductsList(): Promise<ProductsList> {
    return await this.getAllFromTable<Product>();
  }

  async getProductById(productId: string): Promise<Product | undefined> {
    return await this.getSingleValueFromTable<Product | undefined>(
      "id",
      productId
    );
  }

  async createProduct(data: Product): Promise<void> {
    this.createEntity(data);
  }
}
