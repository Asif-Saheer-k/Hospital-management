const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const doctorSchema = mongoose.Schema(
  {
    Name: {
      type: String,
      required:false,
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
      require:true,

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
      required: false,
    },
    phone: {
      type: String,
      require: true,
    },
    Day:{ 
      type:Object,
      require:false
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
      
    }
  },
  {
    timestamps: true,
  }
);
doctorSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    next();
  }
const salt = await bcrypt.genSaltSync(10);
const password = await this.password;
});

doctorSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
}; 

const Doctor = mongoose.model("Doctor", doctorSchema);            
module.exports = Doctor;
