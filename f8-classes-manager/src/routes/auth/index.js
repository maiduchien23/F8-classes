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

module.exports = router;
