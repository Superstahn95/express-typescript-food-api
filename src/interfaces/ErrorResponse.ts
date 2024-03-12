import MessageResponse from "./MessageResponse";

//Since error response is likely to be an extension of the message response and based on the
//environment, will have a stack trace
export interface ErrorResponse extends MessageResponse {
  stack?: string;
}

export default ErrorResponse;
