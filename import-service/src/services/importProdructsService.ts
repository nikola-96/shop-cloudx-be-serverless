import S3, { OperationForSignedUrl, BaseS3 } from "../s3/index";

export default class ImportProductsService {
  private bucketName: string;
  private storageClient: BaseS3;

  constructor(storageClient: BaseS3, bucketName: string) {
    this.storageClient = storageClient;
    this.bucketName = bucketName;
    this.storageClient.setBucketName(bucketName);
  }

  async getSignedUrlForPutOperation(
    fileName: string,
    contentType: string
  ): Promise<string> {
    return await this.storageClient.getSignedUrl(
      fileName,
      contentType,
      OperationForSignedUrl.PUT_OBJECT
    );
  }
}

export const importProductsService = new ImportProductsService(
  S3,
  "shop-uploaded"
);
