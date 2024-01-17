import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../../helpers/axiosconfig";



export const fetch5courses = createAsyncThunk(
    "courses/fetch5courses",
    async () => {
      const response = await axios.get(`Fetch5courses`);
      // console.log(response)
      return response.data.courseslist
    }
  );

  export const fetchcourseDetails = createAsyncThunk(
    "courses/fetchcourseDetails",
    async (id) => {
      const response = await axios.get(`fetchcourseDetails/${id}`);
      console.log(response)
      return response.data.CoursesDetails

    }
  );

  export const Getcourses = createAsyncThunk(
    "courses/Getcourses",
    async () => {
      const response = await axios.get(`getcourses`);
      // console.log(response)
      return response.data;
    }
  );

  export const DeleteCourses = createAsyncThunk(
    "courses/DeleteCourses",
    async (id) => {
      const response = await axios.get(`Delete_course/${id}`);
      console.log(response)
      return response.data;
    }
  );

  export const CreateCourse = createAsyncThunk(
    "courses/CreateCourse",
    async (formDataupdate) => {
      const response = await axios.post(`Create_Course`,formDataupdate);
      console.log(response)
      return response.data;
    }
  );

  export const updateCourse = createAsyncThunk(
    'courses/updateCourse',
     async ({ courseId, updatedData }) => {
    try {
      const response = await axios.post(`Update_Course/${courseId}`, updatedData);
      console.log(response)
      return response.data
    } catch (error) {
      console.log(error.message);
    }
  });



  