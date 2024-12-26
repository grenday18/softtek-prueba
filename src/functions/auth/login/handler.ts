import { APIGatewayProxyEventV2, APIGatewayProxyHandlerV2 } from "aws-lambda"
import { CognitoUserPool, CognitoUser, AuthenticationDetails } from 'amazon-cognito-identity-js'
import { ApiGatewayHelper } from "@layer"
import { AuthFlowType } from "@aws-sdk/client-cognito-identity-provider"

export const login: APIGatewayProxyHandlerV2  = (event: APIGatewayProxyEventV2, context, callback) => {
  console.log(event)
  console.log(event.body)
  const { username, password } = JSON.parse(event.body || "")
  
  const authenticationData = {
    Username: username,
    Password: password,
    AuthFlowType: "USER_PASSWORD_AUTH"
  }

  const authenticationDetails = new AuthenticationDetails(authenticationData)
  const cognitoUser = new CognitoUser({
    Username: username,
    Pool: new CognitoUserPool({
      UserPoolId: process.env.COGNITO_USER_POOL_ID || "",
      ClientId: process.env.COGNITO_USER_POOL_CLIENT_ID || ""
    })
  })

  cognitoUser.authenticateUser(authenticationDetails, {
    onSuccess: (result: any) => {
      const accessToken = result.getAccessToken().getJwtToken()
      const refreshToken = result.getRefreshToken().getToken()
      const response = ApiGatewayHelper.formatJSONResponseOk({
        accessToken,
        refreshToken
      })

      return callback(null, response)
    },
    onFailure: (err: any) => {
      console.log(err)
      const response = ApiGatewayHelper.formatJSONResponseError({message: "Credenciales inválidas"})
      return callback(null, response)
    },
    newPasswordRequired: (challengeParameters) => {
      console.log(challengeParameters)
      cognitoUser.completeNewPasswordChallenge(password, {}, {
        onSuccess: (result) => console.log(result),
        onFailure: (err) => console.log(err),
      });
    }
  })
}
