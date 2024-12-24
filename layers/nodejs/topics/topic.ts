import { SNSClient, PublishCommand } from "@aws-sdk/client-sns"

export default class Topic<T> {
  arn: string
  subject: string

  async publish(message: T) {
    const params = {
      TopicArn: this.arn,
      Subject: this.subject,
      Message: JSON.stringify(message)
    }
    try {
      await new SNSClient({}).send(new PublishCommand(params))
      console.info("SNS_PUBLISH:\n", JSON.stringify(params))
    } catch (err) {
      console.info("SNS_ERROR:\n", err)
    }
  }
}
