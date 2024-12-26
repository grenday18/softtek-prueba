import { CloudFormationCustomResourceCreateEvent, CloudFormationCustomResourceEvent } from "aws-lambda";
import { AdminCreateUserCommand, CognitoIdentityProviderClient, ListUsersCommand } from '@aws-sdk/client-cognito-identity-provider'

// Helper to send response to CloudFormation
const sendResponse = async (
  event: any,
  status: 'SUCCESS' | 'FAILED',
  data: any
) => {
  const responseBody = JSON.stringify({
    Status: status,
    Reason: data.Message || 'See the details in CloudWatch Log',
    PhysicalResourceId: event.LogicalResourceId || 'CustomResource',
    StackId: event.StackId,
    RequestId: event.RequestId,
    LogicalResourceId: event.LogicalResourceId,
    Data: data,
  });

  console.log('Response:', responseBody);

  const response = await fetch(event.ResponseURL, {
    method: 'PUT',
    body: responseBody,
    headers: { 'content-type': '' },
  });

  console.log('CloudFormation response:', response.status);
}


export const createCognitoUser = async (event: CloudFormationCustomResourceEvent) => {

  const client = new CognitoIdentityProviderClient()
  const userPoolId = event.ResourceProperties.UserPoolId
  const defaultEmail = event.ResourceProperties.DefaultEmail
  const tempPassword = event.ResourceProperties.TempPassword

  try {

    const listCommand = new ListUsersCommand({
      UserPoolId: userPoolId,
      Filter: `username = "${defaultEmail}"`,
    })
  
    const existingUsers = await client.send(listCommand)
    if (existingUsers.Users && existingUsers.Users.length > 0) {
      console.log(`User "${defaultEmail}" already exists`)
      return sendResponse(event, 'SUCCESS', { Message: 'User already exists' })
    }
  
    const createCommand =  new AdminCreateUserCommand({
      UserPoolId: userPoolId,
      Username: defaultEmail,
      TemporaryPassword: tempPassword,
      UserAttributes: [
        { Name: 'email', Value: defaultEmail },
        { Name: 'email_verified', Value: 'true' },
      ]
    })
  
    await client.send(createCommand)
    return sendResponse(event, 'SUCCESS', { Message: 'User created successfully' })
  } catch (error: any) {
    return sendResponse(event, 'FAILED', { Message: error.message })
  }
}