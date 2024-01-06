const morgan = require("morgan");
const logger = require("./logger");

// Custom HTTP request log message
const getIpFormat = () =>
  process.env.NODE_ENV === "production" ? ":remote-addr - " : "";
const customMorganConfig = morgan(
  `${getIpFormat()}:method :url :status - :response-time ms`,
  {
    stream: logger.stream,
  }
);

module.exports = customMorganConfig;
