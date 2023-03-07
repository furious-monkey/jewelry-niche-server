// Handler function which sends the appropriate error message back to the client
const globalErrorHandler = (err, req, res, next) => {
  // Extract error data from the error object passed as an argument
  const stack = err.stack;
  const message = err.message;
  const status = err.status ? err.status : 'failed';
  const statusCode = err.statusCode ? err.statusCode : 500;

  // Set the HTTP status code in the response and send the error information back to the client
  res.status(statusCode).json({
    statusCode,
    status,
    message
    })
}

// Export the globalErrorHandler function to be used by other parts of the application.
module.exports = globalErrorHandler;