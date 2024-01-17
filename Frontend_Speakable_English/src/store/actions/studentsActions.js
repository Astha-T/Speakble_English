import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../../helpers/axiosconfig";


// ACTIONS : api calls
export const fetchAllstudents = createAsyncThunk(
  "student/fetchAllStudent",
  async () => {
    const response = await axios.get(`FetchAll_students`);
    return response.data.studentslist;
  }
);


export const Signup_Student = createAsyncThunk(
    "student/Signup_Student",
    async (data) => {
      const response = await axios.post(`Signup_Student`,data);
      console.log(response.data)
      return response.data.data;
    }
  );

  export const async_loaduser = createAsyncThunk(
    "student/async_loaduser",
    async () => {
      const response = await axios.post(`me`)
      return response.data;
    }
  );

  export const async_removeuser = createAsyncThunk(
    "student/async_removeuser",
    async () => {
      const response = await axios.get(`signout`);
      console.log(response)
      return response;
    }
  );

  
  export const fetchStudentDetails = createAsyncThunk(
    "student/fetchStudentDetails",
    async (id) => {
      const response = await axios.get(`fetchStudentDetails/${id}`);
      console.log(response)
      return response.data.StudentDetails

    }
  );

  export const DeleteStudent = createAsyncThunk(
    'student/DeleteStudent',
     async (student_ID) => {
      try {
        const response = await axios.get(`Delete_student/${student_ID}`);
        console.log(response);
        return response.data; 
      } catch (error) {
        console.log(error)
      }
   
  });


  export const updateStudent = createAsyncThunk(
    'student/updateStudent',
     async ({ student_ID, updatedData }) => {
    console.log(student_ID)
    try {
      const response = await axios.post(`Update_Student/${student_ID}`, updatedData );
        console.log(response.data);
        return response.data
        // return { student_ID, updatedData };
    } catch (error) {
      console.log(error.message);
    }
  });





// export const postNewProperty = createAsyncThunk(
//   "property/postNewProperty",
//   async (data) => {
//     try {
//       const response = await axios.post(`add-property`, data);
//       return response.data;
//     } catch (err) {
//       console.log(err);
//     }
//   }
// );


// export const imageUpload =  createAsyncThunk(
//   "property/imageUpload",
//   async (image) => {
//     const formData = new FormData(); 
//     formData.append("image", image); 
//     const response = await axios.post(`update-propertyimage`,formData);
//     console.log(response)
//     return response.data.data;
//   }
// );

// export const editProperty =  createAsyncThunk(
//   "property/editProperty",
//   async (updateproperty) => {
//     const response  = await axios.post(`edit-property/${updateproperty._id}`,updateproperty);
//     console.log(response.data)
//     return response.data.updatedproperty;
//   }
// );






