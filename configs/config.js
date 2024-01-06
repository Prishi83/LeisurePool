const dotenv = require("dotenv");
const path = require("path");

// Specify custom path for .env file
dotenv.config({ path: path.join(__dirname, "../.env") });

module.exports = {
  PORT: process.env.PORT,
  mongoose: {
    url: process.env.MONGODB_URL,
    options: {
      useCreateIndex: true,
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useFindAndModify: false,
    },
  },
  gmail: {
    email: process.env.GMAIL_EMAIL,
    password: process.env.GMAIL_PASSWORD,
  },
  host: {
    development: process.env.DEVELOPMENT_HOST,
    production: process.env.PRODUCTION_HOST,
  },
  jwtPrivateKey: process.env.JWT_SECRET,
};
