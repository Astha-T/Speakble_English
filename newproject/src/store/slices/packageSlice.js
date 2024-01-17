import { createSlice } from "@reduxjs/toolkit";
import { fetchAllpackages, Add_package, Updatepackage, Deletepackage } from "../actions/packagesAction";

let intialState = {
  loading: false,
  packagelist:[],
  Allpackagelist : [],
};

const packagesSlice = createSlice({
  name: "packages",
  initialState: intialState,
  reducers: {
 
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchAllpackages.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchAllpackages.fulfilled, (state, action) => {
        state.packagelist = action.payload;
        state.Allpackagelist = action.payload
        state.loading = false;
      })
      .addCase(fetchAllpackages.rejected, (state) => {
        state.loading = false;
      })
      .addCase(Add_package.fulfilled, (state, action) => {
        state.Allpackagelist = action.payload;
        state.Allpackagelist.push(action.payload)
        state.loading = false;
      })
      .addCase(Add_package.rejected, (state) => {
        state.loading = false;
      })
      .addCase(Deletepackage.fulfilled, (state, action) => {
        state.loading = false;
        state.Allpackagelist = state.Allpackagelist.filter((Package) =>Package.id !== action.payload);
      })
      .addCase(Deletepackage.rejected, (state, action) => {
        state.loading = true;
      })
      .addCase(Updatepackage.fulfilled, (state, action) => {
        const {PackageID, updatedData } = action.payload;
        console.log(PackageID,updatedData);
        console.log(action.payload)
        const updatedPackageIndex = state.Allpackagelist.findIndex((Booking) => Booking.id === PackageID);
      
        if (updatedPackageIndex !== -1) {
          const updatedBooking = { ...state.Allpackagelist[updatedPackageIndex], ...updatedData };
          state.Allpackagelist = [
            ...state.Allpackagelist.slice(0, updatedPackageIndex),
            updatedBooking,
            ...state.Allpackagelist.slice(updatedPackageIndex + 1),
          ];
        }
      })
      .addCase(Updatepackage.rejected, (state, action) => {
        state.error = action.error.message;
      })
    // Add other cases if needed
  },
});

export const { } = packagesSlice.actions;
export default packagesSlice.reducer;

