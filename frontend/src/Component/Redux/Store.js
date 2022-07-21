import { configureStore } from "@reduxjs/toolkit";
import { persistReducer } from "redux-persist";
import { combineReducers } from "redux";
import storage from "redux-persist/lib/storage";

import userReducer from "./Slices/userData";
import adminReducer from "./Slices/adminData";
import doctorReducer from "./Slices/doctorData";

const persistconfig = { key: "root", storage };

const reducer = combineReducers({
  user: userReducer,
  admin: adminReducer,
  doctor: doctorReducer,
});

const persistReduce = persistReducer(persistconfig, reducer);
const store = configureStore({
  reducer: persistReduce,
});

export default store;
