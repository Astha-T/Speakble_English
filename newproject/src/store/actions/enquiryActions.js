import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../../helpers/axiosconfig";


// ACTIONS : api calls
export const fetchAllenquiries = createAsyncThunk(
  "enquiries/getenquiries",
  async () => {
    const response = await axios.get(`getenquiries`);
    return response.data;
  }
);

export const fetchStudentEnquiry = createAsyncThunk(
    "enquiries/fetchStudentEnquiry",
    async (StudentID) => {
    const response = await axios.get(`/Fetch_Enquiry_Student/${StudentID}`);
      console.log(response.data)
      return response.data;
    }
  );


export const Create_Enquiry_Student = createAsyncThunk(
    "enquiries/Create_Enquiry_Student",
    async (StudentID) => {
    const response = await axios.post(`/Create_Enquiry_Student/${StudentID}`);
      console.log(response.data)
      return response.data;
    }
  );

  export const Delete_Enquiry_Student = createAsyncThunk(
    'enquiries/Delete_Enquiry_Student',
     async ({StudentID,EnquiryID}) => {
      try {
        const response = await axios.get(`Delete_Enquiry_Student/${StudentID}/${EnquiryID}`);
        console.log(response);
        return response.data; 
      } catch (error) {
        console.log(error)
      }
  });


  export const Update_Enquiry_Student = createAsyncThunk(
    'enquiries/Update_Enquiry_Student',
     async ({ StudentID,EnquiryID, updatedData }) => {
    console.log(StudentID,EnquiryID)
    try {
      const response = await axios.post(`/Update_Enquiry_Student/${StudentID}/${EnquiryID}`, updatedData );
        console.log(response.data);
        return response.data
        // return { student_ID, updatedData };
    } catch (error) {
      console.log(error.message);
    }
  });






