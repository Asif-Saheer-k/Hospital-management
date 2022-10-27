const asyncHandler = require("express-async-handler");
const User = require("../models/userModels");
const Department = require("../models/departmentModel");

const generateToken = require("../utils/generateToken");
const Doctor = require("../models/doctorModel");
const { cloudinary } = require("../utils/cloudinary");
const Patient = require("../models/patientModel");

const adminLOgin = (req, res) => {
  const email = process.env.EMAIL;
  const password = process.env.ADMIN_PASS;
  console.log(req.body, email, password);
  const adminEmail = req.body.email;
  const adminPassword = req.body.password;

  if (adminEmail == email && adminPassword == password) {
    res.json({
      email,
      token: generateToken(email),
    });
    res.status(200).json;
  } else {
    res.status(400);
    throw new Error("Invalid Email or Password!");
  }
};

const viewAllUser = asyncHandler(async (req, res) => {
  const users = await User.find({});

  res.status(200).json(users);
});

const uploadImage = asyncHandler(async (req, res) => {
  try {
    const filestr = req.body.base64EncodedImage;

    const uploadedResponse = await cloudinary.uploader.upload(filestr, {
      upload_preset: "dev_setups",
    });
    console.log(uploadedResponse.url);
    res.status(200).json(uploadedResponse.url);
  } catch (error) {
    console.log(error);
    res.status(500).json({ err: "somthing wrong" });
  }
  console.log("hooi");
});
const singleDoctor = asyncHandler(async (req, res) => {
  const doctorId = req.params.id;
  console.log(doctorId);
  const doctors = await Doctor.findById(req.params.id);
  console.log(doctors);
  if (doctors) {
    res.status(200).json(doctors);
  } else {
    res.status(400).json("failed");
  }
});
const updateDoctorStatus = asyncHandler(async (req, res) => {
  console.log(req.params.id);
  const update = await Doctor.findByIdAndUpdate(req.params.id, {
    valid: true,
  });
  if (update) {
    console.log("success");
    res.status(200).json({ success: true });
  } else {
    res.status(400).json("failed");
    throw new Error("failed");
  }
});

const viewRequest = asyncHandler(async (req, res) => {
  const valid = false;
  const doctors = await Doctor.find({ valid });
  console.log(doctors);
  if (doctors) {
    res.status(200).json(doctors);
  } else {
    res.status(400);
    throw new Error("Invalid Email and Password");
  }
});
const deleteDoctors = asyncHandler(async (req, res) => {
  console.log("ghjklkjhgfdsdfghjk");
  const doctorId = req.params.id;
  const deletes = await Doctor.deleteOne({ doctorId });
  if (deletes) {
    res.status(200).json({ delte: true });
  } else {
    res.status(400);
    throw new Error("invalid details");
  }
});
const allDoctors = asyncHandler(async (req, res) => {
  const valid = true;
  const doctors = await Doctor.find({ valid })
  if (doctors) {
    res.status(200).json(doctors);
  } else {
    res.status(400);
    throw new Error("somthing is happen");
  }  
});
const addDepartment = asyncHandler(async (req, res) => {
  console.log(req.body);
  const Departments = req.body.department;
  const department = await Department.create({ Departments });
  if (department) {
    res.status(200).json({
      id: department._id,
    });
  } else {
    res.status(400);
    throw new Error("Invalid Details");
  }
});
const viewDepartment = asyncHandler(async (req, res) => {
  const department = await Department.find({});
  console.log(department);
  if (department) {
    res.status(200).json(department);
  } else {
    res.status(400);
    throw new Error("Invalid Details");
  }
});

const deleteDepartment = asyncHandler(async (req, res) => {
  console.log(req.body.id);
  const departmentId = req.body.id;
  const Delete = await Department.deleteOne(departmentId);
  if (Delete) {
    res.status(200).json(Delete);
  } else {
    res.status(400);
    throw new Error("Invalid Error");
  }
});
const viewFullAppintment = asyncHandler(async(req,res)=>{
  console.log('.......................................');
  const valid=true
  const Allappointment=await Patient.find({valid})
  if(Allappointment){
    console.log(Allappointment);
    res.status(200).json(Allappointment)
  }else{
    res.status(400).json({error:'error occure'})
  }

})
const viewAllTodayAppointment=asyncHandler(async(req,res)=>{
  const pick = new Date();
  const date = pick.toLocaleDateString("en-CA");
  const appointment=await Patient.find({date})
  if(appointment){
    res.status(200).json(appointment)
  }else{
    res.status(400).json({error:"NO Appoitment"})
  }

})
module.exports = {
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
  viewFullAppintment,
  viewAllTodayAppointment
};
