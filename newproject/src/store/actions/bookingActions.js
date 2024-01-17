import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../../helpers/axiosconfig";


// ACTIONS : api calls
export const fetchAllbookings = createAsyncThunk(
  "bookings/getbookings",
  async () => {
    const response = await axios.get(`getbookings`);
    return response.data;
  }
);


export const Add_booking = createAsyncThunk(
    "bookings/Add_booking",
    async (formData) => {
    const response = await axios.post(`/Create_Booking`, formData);
      console.log(response.data)
      return response.data;
    }
  );

  export const Deletebooking = createAsyncThunk(
    'bookings/Deletebooking',
     async (BookingID) => {
      try {
        const response = await axios.get(`Delete_Booking/${BookingID}`);
        console.log(response);
        return response.data; 
      } catch (error) {
        console.log(error)
      }
  });


  export const Updatebooking = createAsyncThunk(
    'bookings/Updatebooking',
     async ({ BookingID, updatedData }) => {
    console.log(BookingID)
    try {
      const response = await axios.post(`Update_Booking/${BookingID}`, updatedData );
        console.log(response.data);
        return response.data
        // return { student_ID, updatedData };
    } catch (error) {
      console.log(error.message);
    }
  });






