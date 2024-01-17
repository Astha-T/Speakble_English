import { createSlice } from "@reduxjs/toolkit";
import { CreateCourse, DeleteCourses, Getcourses, fetch5courses, fetchcourseDetails, updateCourse, } from "../actions/coursesActions";

let intialState = {
  courseslist:[],
  courseDetails:[],
  AllCourseslist:[],
  loading: false,
};

const coursesSlice = createSlice({
  name: "courses",
  initialState: intialState,
  reducers: {

  },
  extraReducers: (builder) => {
    builder
      .addCase(fetch5courses.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetch5courses.fulfilled, (state, action) => {
        state.courseslist = action.payload
        state.loading = false;
      })
      .addCase(fetch5courses.rejected, (state) => {
        state.loading = false;
      })
      .addCase(fetchcourseDetails.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchcourseDetails.fulfilled, (state, action) => {
        state.courseDetails = action.payload
        state.loading = false;
      })
      .addCase(fetchcourseDetails.rejected, (state) => {
        state.loading = false;
      })
      .addCase(Getcourses.pending, (state) => {
        state.loading = true;
      })
      .addCase(Getcourses.fulfilled, (state, action) => {
        state.courseslist = action.payload;
        state.AllCourseslist = action.payload
        state.loading = false;
      })
      .addCase(Getcourses.rejected, (state) => {
        state.loading = false;
      })
      .addCase(DeleteCourses.pending, (state) => {
        state.loading = true;
      })
      .addCase(DeleteCourses.fulfilled, (state, action) => {
        state.loading = false;
      })
      .addCase(DeleteCourses.rejected, (state) => {
        state.loading = false;
      })
      .addCase(CreateCourse.pending, (state) => {
        state.loading = true;
      })
      .addCase(CreateCourse.fulfilled, (state, action) => {
        state.AllCourseslist.push(action.payload)
        state.loading = false;
      })
      .addCase(CreateCourse.rejected, (state) => {
        state.loading = false;
      })
      .addCase(updateCourse.fulfilled, (state, action) => {
        const { courseId, updatedData } = action.payload;
        const updatedCourseIndex = state.AllCourseslist.findIndex((course) => course.id === courseId);
        if (updatedCourseIndex !== -1) {
          const updatedCourse = { ...state.AllCourseslist[updatedCourseIndex], ...updatedData };
          state.AllCourseslist = [
            ...state.AllCourseslist.slice(0, updatedCourseIndex),
            updatedCourse,
            ...state.AllCourseslist.slice(updatedCourseIndex + 1),
          ];
        }      
      })
      .addCase(updateCourse.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      }); 
  },
});

// export const { } = coursesSlice.actions;
export default coursesSlice.reducer;
