export const statusCodeHelper = (statusCode: number): string => {
  const messages: Record<number, string> = {
    200: "Request successful.",
    201: "Resource created successfully.",
    204: "Request successful, no content to return.",
    400: "Bad request. Please check your input.",
    401: "Unauthorized. Authentication is required.",
    403: "Forbidden. You do not have permission to access this resource.",
    404: "Resource not found.",
    409: "Conflict. The request could not be completed due to a conflict with the current state.",
    500: "Internal server error. Please try again later.",
    502: "Bad gateway. The server received an invalid response.",
    503: "Service unavailable. Please try again later.",
    504: "Gateway timeout. The server took too long to respond.",
  };

  return messages[statusCode] || "An unexpected error occurred.";
}