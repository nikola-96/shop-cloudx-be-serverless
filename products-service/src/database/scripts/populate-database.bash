#!/usr/bin/env bash

aws dynamodb batch-write-item \
    --request-items file://src/database/scripts/products-dynamo-batch-write.json \
    --profile serverless-cloudx-js \
    --region eu-west-1