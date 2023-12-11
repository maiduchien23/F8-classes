const bcrypt = require("bcrypt");
const passport = require("passport");
const model = require("../../../models/index");
const User = model.User;
const UserOtp = model.UserOtp;
const sendEmail = require("../../../utils/send.email");
const otpGenerator = require("otp-generator");
const { sendOtpEmail } = require("../../../utils/send.email");

module.exports = {
  login: (req, res) => {
    res.render("auth/login", { layout: "layouts/auth.layout.ejs" });
  },

  register: (req, res) => {
    res.render("auth/register", { layout: "layouts/auth.layout.ejs" });
  },

  verify_otp: (req, res) => {
    res.render("auth/verify-otp", { layout: "layouts/auth.layout.ejs" });
  },

  handleLogin: async (req, res) => {
    const user = req.user;

    const otp = otpGenerator.generate(6, {
      digits: true,
      alphabets: false,
      upperCase: false,
      specialChars: false,
    });
    const expiry = new Date();
    expiry.setMinutes(expiry.getMinutes() + 10); // OTP hết hạn sau 10 phút

    await UserOtp.create({
      userId: user.id,
      otp: otp,
      expires: expiry,
    });

    try {
      await sendOtpEmail(user.email, otp);
      res.redirect("/verify-otp");
    } catch (error) {
      console.error("Error sending OTP email:", error);

      res.redirect("/auth/login");
    }
  },

  handleRegister: async (req, res) => {
    const { name, email, password, phone, address, typeId } = req.body;
    if (!name || !email || !password || !phone || !address || !typeId) {
      req.flash("error_msg", "Vui lòng điền đầy đủ thông tin");
      return res.redirect("/auth/register");
    }

    try {
      const existingUser = await User.findOne({ where: { email } });
      if (existingUser) {
        req.flash("error_msg", "Email đã tồn tại");
        return res.redirect("/auth/register");
      }

      const hash = await bcrypt.hash(password, 10);
      await User.create({
        name,
        email,
        password: hash,
        phone,
        address,
        typeId,
        firstLogin: 0,
        createdAt: new Date(),
        updatedAt: new Date(),
      });

      req.flash("success_msg", "Đăng ký tài khoản thành công");
      res.redirect("/auth/login");
    } catch (error) {
      console.error("Registration error:", error);
      req.flash("error_msg", "Lỗi xảy ra trong quá trình đăng ký");
      res.redirect("/auth/register");
    }
  },

  logout: (req, res) => {
    req.logout(() => {
      res.redirect("/auth/login");
    });
  },
};
