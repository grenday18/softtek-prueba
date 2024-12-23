import type { APIGatewayProxyEventV2 } from "aws-lambda"
import moment from "moment"
import { HistoryTopic } from "../topics"
import { HistoryRepository } from "../repository"

export default class HistoryModel {
  requesterId: string
  timestamp: string
  userAgent: string
  routeKey: string
  responseStatus: string
  responsePayload: string
  
  constructor (event?: APIGatewayProxyEventV2){
    if (event) {
      this.timestamp = moment().format("YYYY-MM-DDTHH:mm:ss.sssZ")
      this.requesterId = event.requestContext?.http?.sourceIp
      this.userAgent = event.requestContext.http.userAgent
      this.routeKey = event.routeKey
    }
  }

  async notify(responseStatus: string, responsePayload: string) {
    this.responseStatus = responseStatus
    this.responsePayload = responsePayload
    const sns = new HistoryTopic()
    await sns.publish(this)
  }

  async save() {
    const repo = new HistoryRepository()
		await repo.save(this)
  }
}