const express = require("express");
const router = express.Router();
const {
  viewDepartment,
  allDoctors,
  singleDoctor,
} = require("../Controllers/adminControllers");
const {
  registerUser,
  verifyUser,
  verifyPhone,
  verifyotp,
  viewDepartmetDoctor,
  addPatient,
  viewUserAppointment,
  deleteAppointment,
  updateUserProfile,
  viewAllNumberPatient
} = require("../Controllers/userControllers");

router.route("/register").post(registerUser);
router.route("/login").post(verifyUser);
router.route("/phone-verify").post(verifyPhone);
router.route("/otp-verification").post(verifyotp);
router.route("/view-department").get(viewDepartment);
router.route("/view-All-doctors").get(allDoctors);
router.route("/view-single-doctor/:id").get(singleDoctor);
router.route("/view-Department-doctors/:department").get(viewDepartmetDoctor);
router.route("/patient-details").post(addPatient);
router.route("/view-appointments/:id").get(viewUserAppointment);
router.route("/cancel-appointmnets/:id").delete(deleteAppointment);
router.route("/update-profile").put(updateUserProfile);
router.route("/viewAllPatient").get(viewAllNumberPatient)

module.exports = router;
