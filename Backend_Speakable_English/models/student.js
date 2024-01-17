const mongoose = require('mongoose');
const bcrypt = require('bcrypt')
const jwt  = require('jsonwebtoken')

const studentSchema = mongoose.Schema({
  Username: {
    type: String,
    required: true,
  },
  Password: {
    type: String,
    required: true,
  },
  Phone_Number: {
    type: Number,
    required: true,
  },
  Address: {
    type: String,
    required: true,
  },
  Profile_Image:[],
  UserType:{
    type:String,
    default:"student"
  },
  Email:{
    type:String,
    required:true
  },
  Enquiry_Student:[{
    type:mongoose.Types.ObjectId,
    ref:'Enquiry_Student'
  }],
  Courses_assign:[{
    type:mongoose.Types.ObjectId,
    ref:'courses'
  }]

});

studentSchema.pre('save', async function (next) {
  try {
    // Check if the password has changed
    if (!this.isModified('Password')) {
      return next(); // Skip hashing if the password hasn't changed
    }
    // Generate a salt using the specified cost factor
    const salt = await bcrypt.genSalt(parseInt(process.env.SALT_ROUND, 10));
    const hashedPassword = await bcrypt.hash(this.Password, salt);
    this.Password = hashedPassword;
    next();
  } catch (error) {
    next(error);
  }
});

// Static method to compare passwords
studentSchema.statics.comparePassword = async function (enteredPassword, storedPassword) {
  try {
    return await bcrypt.compare(enteredPassword, storedPassword);
  } catch (error) {
    throw error;
  }
};

studentSchema.methods.jwttoken = function(){
  return jwt.sign({id:this._id},process.env.JWT_SECRET_KEY,{expiresIn : "1h"})
}

const Student = mongoose.model('student', studentSchema);
module.exports = Student;
