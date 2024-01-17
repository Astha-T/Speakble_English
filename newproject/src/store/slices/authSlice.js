import { createSlice } from '@reduxjs/toolkit'
import { async_loaduser,
         async_removeuser,
         async_signin,
         async_signup       } from '../actions/authActions';

const initialState = {
    adminuser: null,
    isAuthenticated: false,
  }
  
export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    loaduser: (state, action) => {
        state.adminuser = action.payload;
        state.isAuthenticated = true;
    },
    removeuser: (state, action) => {
        state.adminuser = null;
        state.isAuthenticated = false;
    },
  },
  extraReducers: {
    [async_loaduser.pending]: (state, action) => {},
    [async_loaduser.fulfilled]: (state, action) => {
      state.adminuser = action.payload;
      state.isAuthenticated = true;
    },
    [async_loaduser.rejected]: (state, action) => {},
    [async_removeuser.pending]: (state, action) => {},
    [async_removeuser.fulfilled]: (state, action) => {
      state.adminuser = null;
      state.isAuthenticated = false;
    },
    [async_removeuser.rejected]: (state, action) => {},
    [async_signin.pending]: (state, action) => {},
    [async_signin.fulfilled]: (state, action) => {
      state.adminuser = action.payload;
      state.isAuthenticated = true
    },
    [async_signin.rejected]: (state, action) => {},
    [async_signup.pending]: (state, action) => {},
    [async_signup.fulfilled]: (state, action) => {
      state.adminuser = action.payload;
      state.isAuthenticated = true
    },
    [async_signup.rejected]: (state, action) => {},
}
})

// Action creators are generated for each case reducer function
export const { loaduser,removeuser} = authSlice.actions
export default authSlice.reducer