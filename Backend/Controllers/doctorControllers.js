const asyncHandler = require("express-async-handler");
const Doctor = require("../models/doctorModel");
const generateToken = require("../utils/generateToken");

const addDoctors = asyncHandler(async (req, res) => {
  const date = new Date().toLocaleTimeString()

  const valid = false;

  console.log(req.body);
  const {
    Name,
    email,
    password,
    phone,
    Qualification,
    place,
    specailist,
    address,
    Day,
    time,
    url,
    About,
  } = req.body;
 
  console.log(req.body);

  const doctor = await Doctor.create({
    Name,
    email,
    password,
    phone,
    Qualification,
    place,
    specailist,
    address,
    Day,
    time,
    url,
    About,
    valid,
    date,
  });
  if (doctor) {
    res.status(201).json({
      _id: doctor._id,
    });
  } else {
    res.status(400);
    throw new Error("Invalid Details");
  }
});

const verifyDoctor = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  const DoctorDetails = await Doctor.findOne({ email });


  
  if (DoctorDetails && (await DoctorDetails.matchPassword(password))) {
    if(DoctorDetails.valid==true){
    res.json({
      email: DoctorDetails.email,
      token: generateToken(DoctorDetails._id),
    });
  } else {
    res.status(400)
    throw new Error("Admin Not Verified")
  }
}else{
  res.status(400);
    throw new Error("Invalid Email or Password!");
}
});

module.exports = { verifyDoctor, addDoctors };
