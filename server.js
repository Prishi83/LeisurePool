const mongoose = require("mongoose");
const app = require("./app");
const config = require("./configs/config");
const logger = require("./configs/logger");

// Connecting to MongoDB then starting Node server
let server;
mongoose.connect(config.mongoose.url, config.mongoose.options).then(() => {
  logger.info("Connected to MongoDB");
  server = app.listen(config.PORT, () => {
    logger.info(`Listening to port ${config.PORT}`);
  });
});

// Will stop Node server when called
const exitHandler = () => {
  if (server) {
    server.close(() => {
      logger.info("Server closed");
      process.exit(1);
    });
  } else {
    process.exit(1);
  }
};

// Will be called when any uncaught Exception or unhandled Rejection occurs
const unexpectedErrorHandler = (error) => {
  logger.error(error);
  exitHandler();
};

// Listening for any uncaught Exception or unhandled Rejection
process.on("uncaughtException", unexpectedErrorHandler);
process.on("unhandledRejection", unexpectedErrorHandler);

// Graceful shutdown of Node process
process.on("SIGTERM", () => {
  logger.info("SIGTERM received");
  if (server) {
    server.close();
  }
});
