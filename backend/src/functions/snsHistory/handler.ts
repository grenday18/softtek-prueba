import { SNSEvent, SNSHandler } from "aws-lambda";
import { HistoryModel } from "merged-layer";

export const snsHistory: SNSHandler = async (event: SNSEvent) => {

  for (const record of event.Records) {
    const snsMessage = record.Sns.Message
    const parsedMessage = JSON.parse(snsMessage)
    const history = Object.assign(new HistoryModel(), parsedMessage)

    await history.save()
  }

  console.log("SNS Event processed successfully!");
}