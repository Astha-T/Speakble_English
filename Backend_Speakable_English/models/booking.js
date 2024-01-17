const mongoose = require('mongoose');

const bookingSchema = mongoose.Schema({
  Note_for_teacher: {
    type: String,
    required: true,
  },
  Student_ID: {
    type:mongoose.Types.ObjectId,
    ref:"student"
  },
  Teachers_ID: {
    type:mongoose.Types.ObjectId,
    ref:"teacher"
  },
  Meeting_ID: {
    type:mongoose.Types.ObjectId,
    ref:"Meeting"
  },
  Status: {
    type: String,
    require: true
  },
    Scheduled_Date: {
      type: Date,
      ref: 'teacher',
      require: false
    },
    Time_Slot : [{
      Start_time: {
        type: Date,
        ref:"teacher",
        require: false
      },
      End_time: {
        type: Date,
        ref:"teacher",
        require: false
      }
    }]
  

});

const bookings = mongoose.model('bookings', bookingSchema);
module.exports = bookings;
