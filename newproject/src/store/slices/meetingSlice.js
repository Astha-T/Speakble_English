import { createSlice } from "@reduxjs/toolkit";
import { Deletemeeting, fetchAllmeetings, updatemeeting, Create_meetings } from "../actions/meetingsActions";
// import { fetchAllstudents,Signup_Student,async_loaduser,async_removeuser,fetchStudentDetails, DeleteStudent, updateStudent } from "../actions/studentsActions";

let intialState = {
  loading: false,
  meetinglist:[],
  Allmeetinglist : [],
};

const meetingsSlice = createSlice({
  name: "meetings",
  initialState: intialState,
  reducers: {
 
  },
  extraReducers: (builder) => {
    builder
    .addCase(fetchAllmeetings.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchAllmeetings.fulfilled, (state, action) => {
        state.meetinglist = action.payload;
        state.Allmeetinglist = action.payload
        state.loading = false;
      })
      .addCase(fetchAllmeetings.rejected, (state) => {
        state.loading = false;
      })
      .addCase(Create_meetings.fulfilled, (state, action) => {
        state.Allmeetinglist = action.payload;
        state.Allmeetinglist.push(action.payload)
        state.loading = false;
      })
      .addCase(Create_meetings.rejected, (state) => {
        state.loading = false;
      })
      .addCase(Deletemeeting.fulfilled, (state, action) => {
        state.loading = false;
        state.Allmeetinglist = state.Allmeetinglist.filter((meeting) => meeting.id !== action.payload);
      })
      .addCase(Deletemeeting.rejected, (state, action) => {
        state.loading = true;
      })
      .addCase(updatemeeting.fulfilled, (state, action) => {
        const {meeting_ID, updatedData } = action.payload;
        console.log(meeting_ID,updatedData);
        console.log(action.payload)
        const updatedmeetingIndex = state.Allmeetinglist.findIndex((meeting) => meeting.id === meeting_ID);
      
        if (updatedmeetingIndex !== -1) {
          const updatedmeeting = { ...state.Allmeetinglist[updatedmeetingIndex], ...updatedData };
          state.Allmeetinglist = [
            ...state.Allmeetinglist.slice(0, updatedmeetingIndex),
            updatedmeeting,
            ...state.Allmeetinglist.slice(updatedmeetingIndex + 1),
          ];
        }
      })
      .addCase(updatemeeting.rejected, (state, action) => {
        state.error = action.error.message;
      })
    // Add other cases if needed
  },
});

export const { } = meetingsSlice.actions;
export default meetingsSlice.reducer;

