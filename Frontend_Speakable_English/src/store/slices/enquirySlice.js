import { createSlice } from "@reduxjs/toolkit";
import { fetchAllenquiries, fetchStudentEnquiry, Create_Enquiry_Student, Delete_Enquiry_Student, Update_Enquiry_Student } from "../actions/enquiryActions";

let intialState = {
  loading: false,
  enquirylist:[],
  Allenquirylist : [],
};

const enquirySlice = createSlice({
  name: "enquiries",
  initialState: intialState,
  reducers: {
 
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchAllenquiries.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchAllenquiries.fulfilled, (state, action) => {
        state.enquirylist = action.payload;
        state.Allenquirylist = action.payload
        state.loading = false;
      })
      .addCase(fetchAllenquiries.rejected, (state) => {
        state.loading = false;
      })
      .addCase(Create_Enquiry_Student.fulfilled, (state, action) => {
        state.Allenquirylist = action.payload;
        state.Allenquirylist.push(action.payload)
        state.loading = false;
      })
      .addCase(Create_Enquiry_Student.rejected, (state) => {
        state.loading = false;
      })
      .addCase(Delete_Enquiry_Student.fulfilled, (state, action) => {
        const {EnquiryID, StudentID } = action.payload;
        state.loading = false;
        state.Allenquirylist = state.Allenquirylist.filter((Enquiry) =>Enquiry.id !== EnquiryID && Enquiry.StudentID !== StudentID);
      })
      .addCase(Delete_Enquiry_Student.rejected, (state, action) => {
        state.loading = true;
      })
      .addCase(Update_Enquiry_Student.fulfilled, (state, action) => {
        const {EnquiryID, StudentID, updatedData } = action.payload;
        console.log(EnquiryID,StudentID,updatedData);
        console.log(action.payload)
        const updatedEnquiryIndex = state.Allenquirylist.findIndex((Enquiry) =>Enquiry.id !== EnquiryID && Enquiry.StudentID !== StudentID);
      
        if (updatedEnquiryIndex !== -1) {
          const updatedEnquiry = { ...state.Allenquirylist[updatedEnquiryIndex], ...updatedData };
          state.Allenquirylist = [
            ...state.Allenquirylist.slice(0, updatedEnquiryIndex),
            updatedEnquiry,
            ...state.Allenquirylist.slice(updatedEnquiryIndex + 1),
          ];
        }
      })
      .addCase(Update_Enquiry_Student.rejected, (state, action) => {
        state.error = action.error.message;
      })
    // Add other cases if needed
  },
});

export const { } = enquirySlice.actions;
export default enquirySlice.reducer;

