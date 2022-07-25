const asyncHandler = require("express-async-handler");
const Doctor = require("../models/doctorModel");
const Patient = require("../models/patientModel");
const generateToken = require("../utils/generateToken");

const addDoctors = asyncHandler(async (req, res) => {
  const date = new Date().toLocaleTimeString();

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
    if (DoctorDetails.valid == true) {
      res.status(200).json({
        id:DoctorDetails._id,
        url: DoctorDetails.url,
        email: DoctorDetails.email,
        token: generateToken(DoctorDetails._id),
        Name: DoctorDetails.Name,
        eamil: DoctorDetails.email,
        addres: DoctorDetails.address,
        Qualification: DoctorDetails.Qualification,
        specailist: DoctorDetails.specailist,
        place: DoctorDetails.place,    
        About: DoctorDetails.About,
        Phone: DoctorDetails.phone,
        time: DoctorDetails.time,  
      });
    } else {
      res.status(400);
      throw new Error("Admin Not Verified");
    }
  } else {
    res.status(400);
    throw new Error("Invalid Email or Password!");
  }
});  

const viewAllAppointment=asyncHandler(async(req,res)=>{
const doctorId=req.params.id;

const Patients=await Patient.find({ doctorId }) 
     
if(Patients){
  res.status(200).json(Patients)
}else{
  res.status(400)
  throw new Error("Wrong")
}
})  
module.exports = {verifyDoctor,addDoctors,viewAllAppointment};
    