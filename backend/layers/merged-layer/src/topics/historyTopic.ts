import { HistoryModel } from "../models"
import Topic from "./topic"

export default class HistoryTopic extends Topic<HistoryModel> {
  arn = process.env.SEARCHED_TOPIC_ARN
  subject = "history"
}