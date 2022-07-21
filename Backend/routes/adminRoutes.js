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
  deleteDepartment
} = require("../Controllers/adminControllers");
const { verifyToken } = require("../middleware/jwtcheck");

router.route("/login").post(adminLOgin);
router.route("/all-user").get(verifyToken, viewAllUser);
router.route("/add-doctors/uploadImage").post(uploadImage);
router.route("/view-single-doctor/:id").get(verifyToken,singleDoctor);
router.route("/doctor-status/:id").post(verifyToken,updateDoctorStatus);
router.route("/view-doctors-request").get(verifyToken,viewRequest);
router.route("/delete-doctors/:id").post(verifyToken,deleteDoctors);
router.route("/all-doctors").get(verifyToken,allDoctors);
router.route("/add-department").post(verifyToken,addDepartment);
router.route("/view-department").get(verifyToken,viewDepartment)
router.route("/delete/department").delete(verifyToken,deleteDepartment)

module.exports = router;
