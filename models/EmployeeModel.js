const mongoose = require('mongoose');
const EmployeeSchema = mongoose.Schema({
    name:String,
    age:Number,
    salary:Number,
    organization:String,
    dateofbirth:String,
    email:String
});

const EmployeeModel = mongoose.model("EmployeeModel", EmployeeSchema, "employee");
module.exports = EmployeeModel;