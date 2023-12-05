var express = require("express");
var router = express.Router();
const dashboardController = require("../../http/controllers/admin/dashboard.controller");
/* GET home page. */
router.get("/", dashboardController.index);

module.exports = router;
