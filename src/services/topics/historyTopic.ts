import HistoryModel from "@core/models/historyModel"
import { Topic } from "@layer"

export default class HistoryTopic extends Topic<HistoryModel> {
  arn = process.env.SEARCHED_TOPIC_ARN || ""
  subject = "history"
}