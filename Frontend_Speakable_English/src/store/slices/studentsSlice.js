import { createSlice } from "@reduxjs/toolkit";
import { fetchAllstudents,Signup_Student,async_loaduser,async_removeuser,fetchStudentDetails, DeleteStudent, updateStudent } from "../actions/studentsActions";

let intialState = {
  studentslist: [],
  studentDetails:[],
  AllStudentlist:[],
  loading: false,
  studentuser: null,
  isAuthenticated: false,
};

const studentsSlice = createSlice({
  name: "students",
  initialState: intialState,
  reducers: {
    loaduser: (state, action) => {
      state.studentuser = action.payload;
      state.isAuthenticated = true;
    },
    removeuser: (state, action) => {
        state.studentuser = null;
        state.isAuthenticated = false;
    },

  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchAllstudents.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchAllstudents.fulfilled, (state, action) => {
        state.studentslist = action.payload;
        state.AllStudentlist = action.payload
        state.loading = false;
      })
      .addCase(fetchAllstudents.rejected, (state) => {
        state.loading = false;
      })
      .addCase(Signup_Student.pending, (state) => {
        state.loading = true;
      })
      .addCase(Signup_Student.fulfilled, (state, action) => {
        state.studentDetails = action.payload;
        state.AllStudentlist.push(action.payload)
        state.isAuthenticated = true;
        state.loading = false;
      })
      .addCase(Signup_Student.rejected, (state) => {
        state.loading = false;
      })  
      .addCase(async_loaduser.pending, (state) => {
        state.loading = true;
      })
      .addCase(async_loaduser.fulfilled, (state, action) => {
        state.studentDetails = action.payload;
        state.studentuser = action.payload
        state.isAuthenticated = true;
        state.loading = false;
      })
      .addCase(async_loaduser.rejected, (state) => {
        state.loading = false;
      })
      .addCase(async_removeuser.pending, (state) => {
        state.loading = true;
      })
      .addCase(async_removeuser.fulfilled, (state, action) => {
        state.isAuthenticated = false;
        state.loading = false;
      })
      .addCase(async_removeuser.rejected, (state) => {
        state.loading = false;
      })
      .addCase(fetchStudentDetails.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchStudentDetails.fulfilled, (state, action) => {
        state.studentDetails = action.payload;
        state.loading = false;
      })
      .addCase(fetchStudentDetails.rejected, (state) => {
        state.loading = false;
      })
      .addCase(DeleteStudent.fulfilled, (state, action) => {
        state.loading = false;
        state.AllStudentlist = state.AllStudentlist.filter((teacher) => teacher.id !== action.payload);
      })
      .addCase(DeleteStudent.rejected, (state, action) => {
        state.loading = true;
      })
      .addCase(updateStudent.fulfilled, (state, action) => {
        const {student_ID, updatedData } = action.payload;
        console.log(student_ID,updatedData);
        console.log(action.payload)
        const updatedStudentIndex = state.AllStudentlist.findIndex((student) => student.id === student_ID);
      
        if (updatedStudentIndex !== -1) {
          const updatedStudent = { ...state.AllStudentlist[updatedStudentIndex], ...updatedData };
          state.AllStudentlist = [
            ...state.AllStudentlist.slice(0, updatedStudentIndex),
            updatedStudent,
            ...state.AllStudentlist.slice(updatedStudentIndex + 1),
          ];
        }
      
      })
      .addCase(updateStudent.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
    // Add other cases if needed
  },
});

export const { loaduser,removeuser } = studentsSlice.actions;
export default studentsSlice.reducer;
