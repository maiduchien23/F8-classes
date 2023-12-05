const LocalStrategy = require("passport-local").Strategy;
const bcrypt = require("bcrypt");
const model = require("../../models/index");

module.exports = new LocalStrategy(
  {
    usernameField: "email",
    passwordField: "password",
  },
  async function (email, password, done) {
    try {
      // Kiểm tra email và mật khẩu không được bỏ trống
      if (!email || !password) {
        return done(null, false, {
          message: "Email và mật khẩu không được bỏ trống",
        });
      }

      // Tìm người dùng theo email
      const user = await model.User.findOne({ where: { email } });
      if (!user) {
        return done(null, false, { message: "Email không tồn tại" });
      }

      // So sánh mật khẩu
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        return done(null, false, { message: "Mật khẩu không chính xác" });
      }

      // Mật khẩu đúng, trả về người dùng
      return done(null, user);
    } catch (error) {
      console.error("Error in local passport strategy:", error);
      return done(error);
    }
  }
);
