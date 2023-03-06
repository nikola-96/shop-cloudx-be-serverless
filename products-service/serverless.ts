import type { AWS } from "@serverless/typescript";

import getProductsList from "@functions/getProductsList";
import getProductsById from "@functions/getProductsById";

const serverlessConfiguration: AWS = {
  service: "products-service",
  frameworkVersion: "3",
  plugins: [
    "serverless-auto-swagger",
    "serverless-esbuild",
    "serverless-offline",
    "serverless-dotenv-plugin",
  ],
  provider: {
    name: "aws",
    runtime: "nodejs14.x",
    profile: "serverless-cloudx-js",
    region: "eu-west-1",
    stage: process.env.STAGE,
    apiGateway: {
      minimumCompressionSize: 1024,
      shouldStartNameWithService: true,
    },
    environment: {
      AWS_NODEJS_CONNECTION_REUSE_ENABLED: "1",
      NODE_OPTIONS: "--enable-source-maps --stack-trace-limit=1000",
      PRODUCTS_TABLE: process.env.PRODUCTS_TABLE,
      STOCKS_TABLE: process.env.STOCKS_TABLE,
    },
    httpApi: {
      cors: {
        allowedOrigins: ["https://d1nzjjfu3ikc22.cloudfront.net"],
        allowedMethods: ["GET"],
      },
    },
    iam: {
      role: {
        managedPolicies: ["arn:aws:iam::aws:policy/AmazonDynamoDBFullAccess"],
      },
    },
  },
  // import the function via paths
  functions: { getProductsList, getProductsById },
  package: { individually: true },
  custom: {
    esbuild: {
      bundle: true,
      minify: false,
      sourcemap: true,
      exclude: ["aws-sdk"],
      target: "node14",
      define: { "require.resolve": undefined },
      platform: "node",
      concurrency: 10,
    },
    "serverless-offline": {
      httpPort: 4000,
    },
    autoswagger: {
      apiType: "httpApi",
      generateSwaggerOnDeploy: true,
      basePath: `/`,
      typefiles: ["./src/types/product.ts"],
    },
  },
};

module.exports = serverlessConfiguration;
