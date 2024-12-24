import { ApiRequestValidator } from "../../../src/utils" 
import { eventMockSuccess, eventMockError } from "../mocks/eventMock"
import { bodySchemeByTest, pathSchemeByTest, querySchemeByTest } from "../params/schemasByValidation"

describe('Request Validation', () => {

  const apiValidatorSuccess = new ApiRequestValidator(eventMockSuccess)
  const apiValidatorError = new ApiRequestValidator(eventMockError)

  test('Expect true for valid path params', () => {
    apiValidatorSuccess.pathScheme = pathSchemeByTest
    apiValidatorSuccess.errors = apiValidatorSuccess.validatePathParams()
    expect(apiValidatorSuccess.isValid).toBe(true)
  })

  test('Expect false for valid path params', () => {
    apiValidatorError.pathScheme = pathSchemeByTest
    apiValidatorError.errors = apiValidatorError.validatePathParams()
    expect(apiValidatorError.isValid).toBe(false)
  })

  test('Expect true for valid query params', () => {
    apiValidatorSuccess.queryScheme = querySchemeByTest
    apiValidatorSuccess.errors = apiValidatorSuccess.validatePathParams()
    expect(apiValidatorSuccess.isValid).toBe(true)
  })

  test('Expect false for valid query params', () => {
    apiValidatorError.queryScheme = querySchemeByTest
    apiValidatorError.errors = apiValidatorError.validatePathParams()
    expect(apiValidatorError.isValid).toBe(false)
  })

  test('Expect true for valid body params', () => {
    apiValidatorSuccess.bodyScheme = bodySchemeByTest
    apiValidatorSuccess.errors = apiValidatorSuccess.validatePathParams()
    expect(apiValidatorSuccess.isValid).toBe(true)
  })

  test('Expect false for valid body params', () => {
    apiValidatorError.bodyScheme = bodySchemeByTest
    apiValidatorError.errors = apiValidatorError.validatePathParams()
    expect(apiValidatorError.isValid).toBe(false)
  })
}) 