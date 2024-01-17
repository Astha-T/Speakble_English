const mongoose = require('mongoose');

const packageSchema = mongoose.Schema({
    Students_ID: [{
        type:mongoose.Types.ObjectId,
        ref:"student",
      }],
    Teachers_ID: {
    type:mongoose.Types.ObjectId,
    ref:"teacher"
  },
  Course_Name:{
    type:String,
    ref:"courses"
  },
  Amount:{
   type:Number,
   required: true,
  },
  Number_of_Lectures: {
    type: Number,
    required: true,
  }
});

const packages = mongoose.model('packages', packageSchema);
module.exports = packages;
