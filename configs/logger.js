const { createLogger, transports, format } = require("winston");

// Custom winston logger
const logger = createLogger({
  transports: [
    new transports.File({
      level: "info",
      filename: "application-info.log",
      dirname: `${__dirname}../../logs/`,
      format: format.combine(
        format.timestamp(),
        format.printf((i) => `${i.timestamp} (${i.level}) | ${i.message}`)
      ),
    }),
    new transports.File({
      level: "error",
      filename: "application-error.log",
      dirname: `${__dirname}../../logs/`,
      format: format.combine(
        format.timestamp(),
        format.printf((i) => `${i.timestamp} (${i.level}) | ${i.message}`)
      ),
    }),
  ],
});

if (process.env.NODE_ENV !== "production") {
  logger.add(
    new transports.Console({
      level: "debug",
      colorize: true,
      format: format.combine(
        format.colorize(),
        format.simple(),
        format.printf((i) => `${i.level} | ${i.message}`)
      ),
    })
  );
}

logger.stream = {
  write: function (message) {
    logger.info(message.substring(0, message.lastIndexOf("\n")));
  },
};

module.exports = logger;
