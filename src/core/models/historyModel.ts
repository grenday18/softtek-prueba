import moment from "moment"
import type { APIGatewayProxyEventV2 } from "aws-lambda"
import { HistoryRepository, HistoryTopic } from "@services"
import { getClientIpFromEvent, getUserAgentFromEvent } from "../../utils/eventHelper"

class HistoryModel {
  requesterId: string = ""
  timestamp: string = moment().format("YYYY-MM-DDTHH:mm:ss.sssZ")
  userAgent: string = ""
  routeKey: string = ""
  responseStatus: number = 500
  responsePayload: string = ""
  
  constructor (event?: APIGatewayProxyEventV2){
    if (event) {
      this.requesterId = getClientIpFromEvent(event)
      this.userAgent = getUserAgentFromEvent(event)
      this.routeKey = event.routeKey
    }
  }

  async notify(responseStatus: number, responsePayload: string) {
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

export default HistoryModel