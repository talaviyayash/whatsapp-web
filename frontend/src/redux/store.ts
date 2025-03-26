import { configureStore } from "@reduxjs/toolkit";
import loaderReducer from "./slice/loaderSlice";
import appReducer from "./slice/appSlice";
import apiReducer from "./slice/apiSlice";
import formReducer from "./slice/formSlice";
import modalReducer from "./slice/modalSlice";
import dataReducer from "./slice/dataSlice";

export const store = configureStore({
  reducer: {
    loader: loaderReducer,
    app: appReducer,
    api: apiReducer,
    form: formReducer,
    modal: modalReducer,
    data: dataReducer,
  },
});

export default store;
