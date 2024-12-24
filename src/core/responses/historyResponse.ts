import HistoryModel from "@core/models/historyModel"

class HistoryResponse {
  requesterId: string
  timestamp: string
  userAgent: string
  routeKey: string
  responseStatus: number
  responsePayload: string

  constructor (model: HistoryModel) {
    this.requesterId = model.requesterId
    this.timestamp = model.timestamp
    this.userAgent = model.userAgent
    this.routeKey = model.routeKey
    this.responseStatus = model.responseStatus
    this.responsePayload = model.responsePayload
  }
}

export default HistoryResponse