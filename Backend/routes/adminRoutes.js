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
router.route("/view-single-doctor/:id").get(singleDoctor);
router.route("/doctor-status/:id").post(updateDoctorStatus);
router.route("/view-doctors-request").get(viewRequest);
router.route("/delete-doctors/:id").post(deleteDoctors);
router.route("/all-doctors").get(allDoctors);
router.route("/add-department").post(addDepartment);
router.route("/view-department").get(viewDepartment)
router.route("/delete/department").delete(deleteDepartment)

module.exports = router;
