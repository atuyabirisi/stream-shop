import logger from "../config/logger.js";

const errorHandler = (error, _req, res, _next) => {
  logger.error(error.message, { metadata: error });

  res.status(500).send("Something went wrong");
};

export default errorHandler;
