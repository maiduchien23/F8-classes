var express = require("express");
var router = express.Router();
const authController = require("../../http/controllers/auth/auth.controller");

const passport = require("passport");

const isLogin = (req, res, next) => {
  if (req.user) {
    res.redirect("/");
  }

  next();
};

/* Authentication Routes */
router.get("/login", isLogin, authController.login);
router.post(
  "/login",
  passport.authenticate("local", {
    successRedirect: "/",
    failureRedirect: "/auth/login",
    failureFlash: true,
  }),
  authController.handleLogin
);
router.get("/register", isLogin, authController.register);
router.post("/register", authController.handleRegister);

router.get("/logout", authController.logout);

router.get("/verify-otp", authController.verify_otp);

router.post("/verify-otp", async (req, res) => {
  const { otp } = req.body;
  const userId = req.user.id;

  const userOtpRecord = await UserOtp.findOne({ where: { userId: userId } });

  if (!userOtpRecord) {
    req.flash("error_msg", "Mã OTP không hợp lệ hoặc đã hết hạn.");
    return res.redirect("/verify-otp");
  }

  if (new Date() > userOtpRecord.expires) {
    req.flash("error_msg", "Mã OTP đã hết hạn.");
    await UserOtp.destroy({ where: { id: userOtpRecord.id } });
    return res.redirect("/verify-otp");
  }

  if (userOtpRecord.otp !== otp) {
    req.flash("error_msg", "Mã OTP không chính xác.");
    return res.redirect("/verify-otp");
  }

  await UserOtp.destroy({ where: { id: userOtpRecord.id } });
  res.redirect("/");
});

module.exports = router;
