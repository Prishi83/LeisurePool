const nodemailer = require("nodemailer");
const config = require("../configs/config");

let mailTransporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: config.gmail.email,
    pass: config.gmail.password,
  },
});

// Send email verification to user for account registration confirmation
const sendEmail = async (recipient, token) => {
  host =
    process.env.NODE_ENV === "development"
      ? config.host.development
      : config.host.production;
  const mailDetails = {
    from: config.gmail.email,
    to: recipient,
    subject: "Account Verification Token",
    text:
      "Hello,\n\n" +
      "Please verify your account by clicking the link: \nhttp://" +
      host +
      "/api/confirmation/" +
      token +
      ".\n",
  };

  await mailTransporter.sendMail(mailDetails);
};

module.exports = sendEmail;
