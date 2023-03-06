import * as AWS from "aws-sdk";
import { DocumentClient } from "aws-sdk/clients/dynamodb";

const generateAwsLocalConfig = () => {
  return {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    region: process.env.REGION,
    endpoint:
      process.env.DYNAMODB_ENDPOINT ||
      `https://dynamodb.${process.env.REGION}.amazonaws.com`,
  };
};

const createDynamoDBClient = (): DocumentClient => {
  if (process.env.IS_OFFLINE) {
    return new AWS.DynamoDB.DocumentClient(generateAwsLocalConfig());
  }
  return new AWS.DynamoDB.DocumentClient();
};

const dynamoDBClient = createDynamoDBClient();

export default dynamoDBClient;
