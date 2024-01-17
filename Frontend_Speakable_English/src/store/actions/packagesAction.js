import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../../helpers/axiosconfig";


// ACTIONS : api calls
export const fetchAllpackages = createAsyncThunk(
  "packages/getpackages",
  async () => {
    const response = await axios.get(`getpackages`);
    return response.data;
  }
);


export const Add_package = createAsyncThunk(
    "packages/Add_package",
    async (formData) => {
    const response = await axios.post(`/Add_Package`, formData);
      console.log(response.data)
      return response.data;
    }
  );

  export const Deletepackage = createAsyncThunk(
    'packages/Deletepackage',
     async (PackageID) => {
      try {
        const response = await axios.get(`Delete_Package/${PackageID}`);
        console.log(response);
        return response.data; 
      } catch (error) {
        console.log(error)
      }
  });


  export const Updatepackage = createAsyncThunk(
    'packages/Updatepackage',
     async ({ PackageID, updatedData }) => {
    console.log(PackageID)
    try {
      const response = await axios.post(`Update_Package/${PackageID}`, updatedData );
        console.log(response.data);
        return response.data
        // return { student_ID, updatedData };
    } catch (error) {
      console.log(error.message);
    }
  });






