const bcrypt = require("bcrypt");
const passport = require("passport");
const model = require("../../../models/index");
const User = model.User;

module.exports = {
  login: (req, res) => {
    res.render("auth/login", { layout: "layouts/auth.layout.ejs" });
  },

  register: (req, res) => {
    res.render("auth/register", { layout: "layouts/auth.layout.ejs" });
  },

  handleLogin: (req, res, next) => {
    passport.authenticate("local", {
      successRedirect: "/",
      failureRedirect: "/auth/login",
      failureFlash: true,
    })(req, res, next);
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
