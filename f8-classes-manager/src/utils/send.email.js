const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.MAIL_USERNAME,
    pass: process.env.MAIL_PASSWORD,
  },
});

const sendOtpEmail = async (email, otp) => {
  const mailOptions = {
    from: process.env.MAIL_USER,
    to: email,
    subject: "Mã Xác Minh OTP",
    text: `Mã OTP của bạn là: ${otp}. Mã này có hiệu lực trong 10 phút.`,
  };

  try {
    await transporter.sendMail(mailOptions);
  } catch (error) {
    console.error("Error sending email:", error);
  }
};

module.exports = {
  sendOtpEmail,
};
