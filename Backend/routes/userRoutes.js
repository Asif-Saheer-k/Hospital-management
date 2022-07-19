const express = require("express");
const { viewDepartment } = require("../Controllers/adminControllers");
const router = express.Router();
const { registerUser,verifyUser,verifyPhone,verifyotp } = require("../controllers/userControllers");

router.route("/register").post(registerUser);
router.route("/login").post(verifyUser)
router.route('/phone-verify').post(verifyPhone)
router.route('/otp-verification').post(verifyotp)
router.route('/view-department').get(viewDepartment)

module.exports = router;      
   