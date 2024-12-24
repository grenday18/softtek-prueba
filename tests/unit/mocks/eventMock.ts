import { APIGatewayProxyEventV2 } from "aws-lambda";

export const eventMockSuccess : APIGatewayProxyEventV2 = {
  "version": "2.0",
  "routeKey": "GET /example/{id}",
  "rawPath": "/example/123",
  "rawQueryString": "name=JohnDoe&age=30",
  "headers": {},
  "queryStringParameters": {
    "name": "JohnDoe",
    "age": "30"
  },
  "pathParameters": {
    "id": "123"
  },
  "requestContext": {
    "accountId": "123456789012",
    "apiId": "api-id",
    "domainName": "example.com",
    "domainPrefix": "example",
    "http": {
      "method": "GET",
      "path": "/example/123",
      "protocol": "HTTP/1.1",
      "sourceIp": "192.168.1.1",
      "userAgent": "Mozilla/5.0"
    },
    "requestId": "id",
    "routeKey": "GET /example/{id}",
    "stage": "dev",
    "time": "23/Dec/2024:00:00:00 +0000",
    "timeEpoch": 1703299200000
  },
  "body": "{\"key1\":\"value1\",\"key2\":\"value2\"}",
  "isBase64Encoded": false
} 

export const eventMockError : APIGatewayProxyEventV2 = {
  "version": "2.0",
  "routeKey": "GET /example/{id}",
  "rawPath": "/example/asd123a%%$#",
  "rawQueryString": "name=12312&age=asdasdasdas",
  "headers": {},
  "queryStringParameters": {
    "name": "12312",
    "age": "asdasdasdas"
  },
  "pathParameters": {
    "ids": "asd123a%%$#"
  },
  "requestContext": {
    "accountId": "123456789012",
    "apiId": "api-id",
    "domainName": "example.com",
    "domainPrefix": "example",
    "http": {
      "method": "GET",
      "path": "/example/123",
      "protocol": "HTTP/1.1",
      "sourceIp": "192.168.1.1",
      "userAgent": "Mozilla/5.0"
    },
    "requestId": "id",
    "routeKey": "GET /example/{id}",
    "stage": "dev",
    "time": "23/Dec/2024:00:00:00 +0000",
    "timeEpoch": 1703299200000
  },
  "body": "{\"key\":\"value\"}",
  "isBase64Encoded": false
} 