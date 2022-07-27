const express = require("express");
const router = express.Router();
const {verifyDoctor,addDoctors,viewAllAppointment,todayAppointment,appointmentFinished,deleteAppointment}=require('../Controllers/doctorControllers')

router.route('/login').post(verifyDoctor)
router.route("/register").post(addDoctors)
router.route('/view-all-appointment/:id').get(viewAllAppointment) 
router.route('/Today-appoitment/:id').get(todayAppointment)
router.route('/appointment-finished').patch(appointmentFinished)
router.route('/delete-appoinments/:id').delete(deleteAppointment)



module.exports = router;
