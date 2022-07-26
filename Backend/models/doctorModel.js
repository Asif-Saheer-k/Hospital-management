const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const doctorSchema = mongoose.Schema(
  {
    Name: {
      type: String,
      required:true,
    },
    email: {
      type: String,
      required: true,
    },
    address: {
      type: String,
      required: true,
    },
    Qualification: {
      type: String,
      require: true,
    },
    specailist: {
      type: String,
      require: true,
    },
    place:{
      type:String,
      require:false,

    },
    url: {
      type: String,
      require: true,
    },
    About: {
      type: String,
      require: false,
    },
    password: {
      type: String,
      required: true,
    },
    phone: {
      type: String,
      require: true,
    },

    time:{
      type:Array,
      require:false
    },
    valid:{
      type:Boolean,
      require:false
    } ,
    date:{
      type:String,
      require:true,
      
    },
  
  },
  {
    timestamps: true,
  }
);
doctorSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    next();
  }
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

doctorSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};


const Doctor = mongoose.model("Doctor", doctorSchema);            
module.exports = Doctor;
