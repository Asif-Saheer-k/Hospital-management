const mongoose = require("mongoose");

const patientSchema = mongoose.Schema(
  {
  
    name: {
      type: String,
      require: true,
    },
    phone: {
      type: String,
      require: true,
    },
    message: {
      type: String,
      require: false,
    },
    date: {
      type: String,
      require: true,
    },
    Age:{
      type:Number,
      require:true

    },
    selectedTime: {
      type: String,
      require: true,
    },
    doctorId: {
      type: String,
      require: true,
    },
    userId: {
      type: String,
      require: true,
    },
    Token: {
        type: Number,
        require: true,
      },
      Medcine:{
        type:String,
        require:false
      },
      valid:{
        type:Boolean,
        require:false
      
      }
  },
  {
    timestamps: true,
  }
);
const Patient = mongoose.model("Patient", patientSchema);
module.exports = Patient;
