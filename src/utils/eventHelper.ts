import { APIGatewayProxyEventV2 } from "aws-lambda";

export const getClientIpFromEvent = (event: APIGatewayProxyEventV2) => {
  return event.requestContext?.http?.sourceIp
}

export const getUserAgentFromEvent = (event: APIGatewayProxyEventV2) => {
  return event.requestContext?.http?.userAgent
}