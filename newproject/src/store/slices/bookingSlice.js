import { createSlice } from "@reduxjs/toolkit";
import { fetchAllbookings, Add_booking, Updatebooking, Deletebooking } from "../actions/bookingActions";

let intialState = {
  loading: false,
  bookinglist:[],
  Allbookinglist : [],
};

const bookingsSlice = createSlice({
  name: "bookings",
  initialState: intialState,
  reducers: {
 
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchAllbookings.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchAllbookings.fulfilled, (state, action) => {
        state.bookinglist = action.payload;
        state.Allbookinglist = action.payload
        state.loading = false;
      })
      .addCase(fetchAllbookings.rejected, (state) => {
        state.loading = false;
      })
      .addCase(Add_booking.fulfilled, (state, action) => {
        state.Allbookinglist = action.payload;
        state.Allbookinglist.push(action.payload)
        state.loading = false;
      })
      .addCase(Add_booking.rejected, (state) => {
        state.loading = false;
      })
      .addCase(Deletebooking.fulfilled, (state, action) => {
        state.loading = false;
        state.Allbookinglist = state.Allbookinglist.filter((Booking) =>Booking.id !== action.payload);
      })
      .addCase(Deletebooking.rejected, (state, action) => {
        state.loading = true;
      })
      .addCase(Updatebooking.fulfilled, (state, action) => {
        const {BookingID, updatedData } = action.payload;
        console.log(BookingID,updatedData);
        console.log(action.payload)
        const updatedBookingIndex = state.Allbookinglist.findIndex((Booking) => Booking.id === BookingID);
      
        if (updatedBookingIndex !== -1) {
          const updatedBooking = { ...state.Allbookinglist[updatedBookingIndex], ...updatedData };
          state.Allbookinglist = [
            ...state.Allbookinglist.slice(0, updatedBookingIndex),
            updatedBooking,
            ...state.Allbookinglist.slice(updatedBookingIndex + 1),
          ];
        }
      })
      .addCase(Updatebooking.rejected, (state, action) => {
        state.error = action.error.message;
      })
    // Add other cases if needed
  },
});

export const { } = bookingsSlice.actions;
export default bookingsSlice.reducer;

