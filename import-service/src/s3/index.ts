import { S3 as AWS_S3, config } from "aws-sdk";

export enum OperationForSignedUrl {
  PUT_OBJECT = "putObject",
}

export class BaseS3 {
  protected S3: AWS_S3;
  protected bucketName: string;

  constructor() {
    this.S3 = new AWS_S3();

    if (process.env.IS_OFFLINE) this.setOfflineConfig();
  }

  private setOfflineConfig() {

    this.S3.config.update({
      accessKeyId: process.env.AWS_ACCESS_KEY_ID_LOCAL,
      secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY_LOCAL,
      region: process.env.REGION_LOCAL,
    });
  }

  setBucketName(bucketName: string) {
    this.bucketName = bucketName;
  }

  getSignedUrl(
    fileName: string,
    contentType: string,
    operation: OperationForSignedUrl
  ): string {
    return this.S3.getSignedUrl(operation, {
      Bucket: this.bucketName,
      Expires: 60 * 60,
      Key: fileName,
      ContentType: contentType,
    });
  }
}

const S3 = new BaseS3();

export default S3;
