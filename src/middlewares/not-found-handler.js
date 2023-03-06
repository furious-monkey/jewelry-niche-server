const notFoundErrorHandler = (req, res, next) => {
  const err = new Error(`Can't find ${req.originaUrl} on the server`)
  next(err);
}

module.exports = notFoundErrorHandler;