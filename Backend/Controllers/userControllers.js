const { log, time } = require("console");
const asyncHandler = require("express-async-handler");
const Doctor = require("../models/doctorModel");
const Patient = require("../models/patientModel");
const User = require("../models/userModels");

const generateToken = require("../utils/generateToken");
const serviceSsid = "VA1fc8601062b890c4c88cc2b48cb6af2d";
const AccountSsid = "AC1e87d53421c94f577a326da40ae89172";
const token = "f5a98f9b70abf8793dcf0900f76e753e";
const bcrypt = require("bcryptjs");
const client = require("twilio")(AccountSsid, token);

const registerUser = asyncHandler(async (req, res) => {
  console.log("gdhgf", req.body);

  const { username, email, password, phoneNumber, address, genders } = req.body;

  const uerExists = await User.findOne({ email });
  if (uerExists) {  
    res.status(400);
    throw new Error("User Already Exists");
  }
  const user = await User.create({
    username,
    email,
    password,
    phoneNumber,
    address,
    genders,
  });
  if (user) {
    res.status(201).json({
      _id: user._id,
      name: user.username,
      email: user.email,
      phone: user.phoneNumber,
    });
  } else {
    res.status(400);
    throw new Error("Error occured");
  }
});
const verifyUser = asyncHandler(async (req, res) => {
  console.log("hi user", req.body);
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  console.log(user);
  if (user && (await user.matchPassword(password))) {
    res.json({
      _id: user._id,
      name: user.username,
      email: user.email,
      phone:user.phoneNumber,
      Address:user.address,
      token: generateToken(user._id),
    });
  } else {
    res.status(400);
    throw new Error("Invalid Email or Password!");
  }
});

const verifyPhone = asyncHandler(async (req, res) => {
  console.log(req.body);
  console.log(process.env.ACCOUT);
  const phoneNumber = req.body.phone;
  console.log(phoneNumber);
  const userExist = await User.findOne({ phoneNumber });
  if (userExist) {
    console.log(serviceSsid);
    client.verify
      .services(serviceSsid)
      .verifications.create({ to: `+917034515384`, channel: "sms" })
      .then((resp) => {
        console.log("hfhf", resp);
      });
    res.status(200).json({
      phone: phoneNumber,
    });
  } else {
    res.status(401).json({ eror: "User dose not Exist" });
  }
});
const verifyotp = asyncHandler(async (req, res) => {
  const otp = req.body.otp;
  const phone = req.body.phone;
  const userExist = await User.findOne({ phone });
  console.log(userExist);
  client.verify
    .services(serviceSsid)
    .verificationChecks.create({
      to: `+91${phone}`,
      code: otp,
    })
    .then((resp) => {
      console.log("otp res", resp);
      const user = resp.valid;
      if (user) {
        res.status(200).json({
          _id: userExist._id,
          name: userExist.username,
          email: userExist.email,
          token: generateToken(userExist._id),
        });
      } else {
        res.status(401).json({ eror: "Otp Invalid" });
      }
    });
});
const viewDepartmetDoctor = asyncHandler(async (req, res) => {
  const specailist = req.params.department;

  const doctors = await Doctor.find({ specailist });
  console.log(doctors, "hgfghjkl");
  if (doctors) {
    res.status(200).json(doctors);
  } else {
    res.status(400);
    throw new Error("Somthing went ");
  }
});
const addPatient = asyncHandler(async (req, res) => {
  console.log(req.body);
  const { name, phone, message, date, selectedTime, doctorId, userId,selectedDay,Age} =
    req.body;


  //Today
  // const day=new Date()
  // console.log(day.toLocaleDateString('en-CA'));
  const _id = doctorId;
  console.log(date, "ffffffffffffffffffffffff");
  var TotalPatient = 0;

  const doctorData = await Doctor.findById({ _id });
  console.log(doctorData,selectedDay,"fffffffffffff");

  doctorData.time.map((obj) => {
    if (selectedTime == obj.Time && obj.Day== selectedDay ) {
      console.log(selectedTime,obj.Time,"ff");
      console.log(obj,";;");
      TotalPatient = obj.Patient;
    }
  });
  console.log(TotalPatient, "vbbbbbbbbbbbbbbbbbb");
  const TokenNumber = await Patient.find({doctorId,date});
  console.log(TokenNumber,"Toen");
  const TotalAppointment = TokenNumber.length;
  console.log("ssssssss", TotalAppointment);
  console.log("zzzzzzzz", TotalPatient);
   const valid=true

  if (TotalAppointment < TotalPatient) {
    const Token=TotalAppointment+1;
    const patients = await Patient.create({
    
      name,
      phone,
      message,
      date,
      Age,
      selectedTime,
      doctorId,
      userId,
      Token,
      valid,
   
    });
    if (patients) {

      res.status(200).json(patients);
    } else {
      res.status(400);
      throw new Error("invalid Deatials");
    }
  } else {
    res.status(400).json("Appointment Closed");
  }
});
const viewUserAppointment=asyncHandler(async(req,res)=>{
const userId=req.params.id
const appointments=await Patient.find({userId})
if(appointments){
  res.status(200).json(appointments)
}else{
  res.status(400).json("No Appointments")
}
})
const deleteAppointment=async(req,res)=>{
  _id=req.params.id
  console.log(_id,"fff");
  const data= await Patient.deleteOne({_id})
  if(data){
    console.log("hoi");
    res.status(200).json("deleted")
  }else{
    console.log("kooi");
  }
}
const updateUserProfile=asyncHandler(async(req,res)=>{
  const { username,email,password,phoneNumber,address,oldPassword } = req.body;
  const user = await User.findOne({ email });
  const _id=user._id
  console.log(_id);
  console.log(user);
  if(await bcrypt.compare(oldPassword,user.password)) {
    console.log("sucess");
    const user = await User.findByIdAndUpdate(_id,{
      username,
      email,
      password,
      phoneNumber,
      address,
    },{new:true});
    console.log("sucess");

   res.status(200).json("success")
  }else{
    console.log("failrd");
    res.status(400).json("Invalid Password")
  }

})
const viewAllNumberPatient=asyncHandler(async(req,res)=>{
  const valid=false
  const Patients = await Patient.find({valid});
  if(Patients){
    res.status(200).json(Patients)
  }else{
     res.status(400).json("Invalid details")
  }
})


module.exports = {
  registerUser,
  verifyUser,
  verifyPhone,
  verifyotp,
  viewDepartmetDoctor,
  addPatient,
  viewUserAppointment,
  deleteAppointment,
  updateUserProfile,
  viewAllNumberPatient,
};
