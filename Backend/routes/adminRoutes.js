const express = require("express");
const router = express.Router();
const {
  adminLOgin,
  viewAllUser,
  uploadImage,
  singleDoctor,
  updateDoctorStatus,
  viewRequest,
  deleteDoctors,
  allDoctors,
  addDepartment,
  viewDepartment,
  deleteDepartment,
  viewFullAppintment
} = require("../Controllers/adminControllers");
const { viewAllNumberPatient } = require("../Controllers/userControllers");
const { verifyToken } = require("../middleware/jwtcheck");

router.route("/login").post(adminLOgin);
router.route("/all-user").get(verifyToken, viewAllUser);
router.route("/add-doctors/uploadImage").post(uploadImage);
router.route("/view-single-doctor/:id").get(verifyToken,singleDoctor);
router.route("/doctor-status/:id").post(updateDoctorStatus);
router.route("/view-doctors-request").get(verifyToken,viewRequest);
router.route("/delete-doctors/:id").post(verifyToken,deleteDoctors);
router.route("/all-doctors").get(verifyToken,allDoctors);
router.route("/add-department").post(verifyToken,addDepartment);
router.route("/view-department").get(viewDepartment)
router.route("/delete/department").delete(verifyToken,deleteDepartment)
router.route("/view-all-patients").get(viewAllNumberPatient)
router.route("/view-all-Appointment").get(viewFullAppintment)
module.exports = router;
