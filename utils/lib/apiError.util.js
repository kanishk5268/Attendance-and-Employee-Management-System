class ApiError extends Error {
  constructor(
    statusCode,
    message = "Something went very wrong",
    errors = [],
    stack = ""
  ) {
    super(message);
    this.code = statusCode;
    this.message = message;
    this.success = false;
    this.errors = errors;

    if (stack) {
      this.stack = stack;
    } else {
      Error.captureStackTrace(this, this.constructor);
    }
  }
}

export default ApiError;
