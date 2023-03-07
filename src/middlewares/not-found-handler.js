const notFoundErrorHandler = (req, res, next) => {
  const err = new Error(`404 - Not Found: Cannot GET ${req.originalUrl}`);
  next(err);
}

module.exports = notFoundErrorHandler;
