const errorHandlingMiddleware = require("./errorHandler.middleware");

const methods =
  (methods = ["GET"]) =>
  (req, res, next) => {
    if (methods.includes(req.method)) return next();
    return errorHandlingMiddleware(
      `The ${req.method} method for the "${req.originalUrl}" route is not supported.`,
      405,
      "",
      res
    );
  };

module.exports = methods;