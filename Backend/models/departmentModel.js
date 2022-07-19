const mongoose = require("mongoose");

const departmentSchema = mongoose.Schema({
  Departments: {
    type: String,
    require: true,
    unique: true,
  },
});
const Department = mongoose.model("Department", departmentSchema);
module.exports = Department;
