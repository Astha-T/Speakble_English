import { createSlice } from "@reduxjs/toolkit";
import { fetchAllpayments, Add_payment, Updatepayment, Deletepayment } from "../actions/paymentActions";

let intialState = {
  loading: false,
  paymentlist:[],
  Allpaymentlist : [],
};

const paymentsSlice = createSlice({
  name: "payments",
  initialState: intialState,
  reducers: {
 
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchAllpayments.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchAllpayments.fulfilled, (state, action) => {
        state.paymentlist = action.payload;
        state.Allpaymentlist = action.payload
        state.loading = false;
      })
      .addCase(fetchAllpayments.rejected, (state) => {
        state.loading = false;
      })
      .addCase(Add_payment.fulfilled, (state, action) => {
        state.Allpaymentlist = action.payload;
        state.Allpaymentlist.push(action.payload)
        state.loading = false;
      })
      .addCase(Add_payment.rejected, (state) => {
        state.loading = false;
      })
      .addCase(Deletepayment.fulfilled, (state, action) => {
        state.loading = false;
        state.Allpaymentlist = state.Allpaymentlist.filter((Payment) =>Payment.id !== action.payload);
      })
      .addCase(Deletepayment.rejected, (state, action) => {
        state.loading = true;
      })
      .addCase(Updatepayment.fulfilled, (state, action) => {
        const {PaymentID, updatedData } = action.payload;
        console.log(PaymentID,updatedData);
        console.log(action.payload)
        const updatedPaymentIndex = state.Allpaymentlist.findIndex((Booking) => Booking.id === PaymentID);
      
        if (updatedPaymentIndex !== -1) {
          const updatedBooking = { ...state.Allpaymentlist[updatedPaymentIndex], ...updatedData };
          state.Allpaymentlist = [
            ...state.Allpaymentlist.slice(0, updatedPaymentIndex),
            updatedBooking,
            ...state.Allpaymentlist.slice(updatedPaymentIndex + 1),
          ];
        }
      })
      .addCase(Updatepayment.rejected, (state, action) => {
        state.error = action.error.message;
      })
    // Add other cases if needed
  },
});

export const { } = paymentsSlice.actions;
export default paymentsSlice.reducer;

