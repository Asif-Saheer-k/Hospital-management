import {createSlice}from "@reduxjs/toolkit";

const doctorDataSlice = createSlice({

    name:"doctor",
    initialState:{
        value:{}
    },
    reducers:{
        logInDoctor:(state,action)=>{
            state.value =action.payload;
        },
    }
})
export const {logInDoctor} =doctorDataSlice.actions
export default doctorDataSlice.reducer;