import { DocumentClient } from "aws-sdk/clients/dynamodb";

export default abstract class BaseService {
  constructor(readonly docClient: DocumentClient, readonly tableName: string) {
    this.docClient = docClient;
    this.tableName = tableName;
  }

  async getAllFromTable<T>(): Promise<T[]> {
    const result = await this.docClient
      .scan({
        TableName: this.tableName,
      })
      .promise();

    return result.Items as T[];
  }
  async getSingleValueFromTable<T>(
    keyIdentifier: string,
    value: string | number
  ): Promise<T> {
    const result = await this.docClient
      .get({
        TableName: this.tableName,
        Key: { [keyIdentifier]: value },
      })
      .promise();

    return result.Item as T;
  }
}
