import { configureStore } from "@reduxjs/toolkit";
import  studentsSlice from './slices/studentsSlice'
import teacherSlice from './slices/teacherSlice'
import coursesSlice from "./slices/coursesSlice";
import meetingSlice from "./slices/meetingSlice";                                                   
import bookingSlice from "./slices/bookingSlice";
import paymentSlice from "./slices/paymentSlice";
import packageSlice from "./slices/packageSlice";
import enquirySlice from "./slices/enquirySlice";

export const store = configureStore({
  reducer: {
    students: studentsSlice,
    teachers: teacherSlice,
    courses:  coursesSlice,
    meetings: meetingSlice,                                              
    bookings: bookingSlice, 
    payments: paymentSlice,
    packages: packageSlice,
    enquiries: enquirySlice  
  },
});
 