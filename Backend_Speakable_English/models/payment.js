const mongoose = require('mongoose');

const paymentSchema = mongoose.Schema({
 
      Student_ID: {
        type:mongoose.Types.ObjectId,
        ref:"student"
      },
      Teachers_ID: {
        type:mongoose.Types.ObjectId,
        ref:"teacher"
      },
      Amount: {
        type: Number,
        required: true,
      },
      Booking_ID: {
        type:mongoose.Types.ObjectId,
        ref:"booking"
      },
      Status:{
        type:"String",
        require:true
      },
      Method:{
        type:"String",
        required:true
      },
      Created_at: {
    Date: {
      type:"String",
    },
    Time: {
      type:"String",
      }
  }
  // Updated_at: [{
  //   Date: {
  //     type: Date,
  //   },
  //   Time: {
  //       type: Date,
  //     }
  // }], 
});


const payments = mongoose.model('payments', paymentSchema);
module.exports = payments;