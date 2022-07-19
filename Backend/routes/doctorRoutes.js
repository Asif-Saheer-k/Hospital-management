const express = require("express");
const router = express.Router();
const {verifyDoctor,addDoctors}=require('../Controllers/doctorControllers')

router.route('/login').post(verifyDoctor)
router.route("/register").post(addDoctors)    



module.exports = router;
