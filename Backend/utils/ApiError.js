class ApiError extends Error {
  constructor(statusCode, message) {
    super(message); // parent Error class ko message dena
    this.statusCode = statusCode;
    this.success = false;
    this.data = null;
  }
}

export default ApiError;
