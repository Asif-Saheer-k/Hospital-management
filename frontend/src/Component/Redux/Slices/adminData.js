import {createSlice}from "@reduxjs/toolkit";

const adminDataSlice = createSlice({

    name:"admin",
    initialState:{
        value:{}
    },
    reducers:{
        logInAdmin:(state,action)=>{
            state.value =action.payload;
        },
    }
})
export const {logInAdmin} =adminDataSlice.actions
export default adminDataSlice.reducer;