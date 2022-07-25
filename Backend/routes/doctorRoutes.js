const express = require("express");
const router = express.Router();
const {verifyDoctor,addDoctors,viewAllAppointment}=require('../Controllers/doctorControllers')

router.route('/login').post(verifyDoctor)
router.route("/register").post(addDoctors)
router.route('/view-all-appointment/:id').get(viewAllAppointment) 



module.exports = router;
