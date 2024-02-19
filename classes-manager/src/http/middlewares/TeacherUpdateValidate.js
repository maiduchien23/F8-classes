const { body } = require("express-validator");
const { Op } = require("sequelize");

const model = require("../../models/index");
const User = model.User;

module.exports = () => {
    return [
        body("name", "Tên giảng viên không được để trống").notEmpty(),
        body("name", "Tên giảng viên nên có 2 - 30 ký tự").isLength({
            min: 2,
            max: 30,
        }),
        body("email", "Email không được để trống").notEmpty(),
        body("email").custom(async (value, { req }) => {
            const { id } = req.params;

            const user = await User.findOne({
                where: {
                    email: value,
                    [Op.not]: [
                        {
                            id: id,
                        },
                    ],
                },
            });
            if (user) {
                throw new Error("Email đã tồn tại");
            }
        }),
        body("email", "Email không hợp lệ").isEmail(),
        body("phone", "Số điện thoại không được để trống").notEmpty(),
        body("phone", "Số điện thoại không hợp lệ").isLength({
            min: 10,
            max: 11,
        }),
        body("phone", "Số điện thoại không hợp lệ").isMobilePhone("vi-VN"),
        body("address", "Địa chỉ không được để trống").notEmpty(),
        body("typeName", "Vui lòng chọn chức vụ").notEmpty(),
    ];
};
