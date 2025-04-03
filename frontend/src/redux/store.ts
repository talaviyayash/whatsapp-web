import { configureStore } from "@reduxjs/toolkit";
import loaderReducer, { LoaderState } from "./slice/loaderSlice";
import appReducer, { AppState } from "./slice/appSlice";
import apiReducer, { ApiState } from "./slice/apiSlice";
import formReducer, { FormState } from "./slice/formSlice";
import modalReducer, { ModalState } from "./slice/modalSlice";
import dataReducer, { DataState } from "./slice/dataSlice";

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

export type RootState = {
  api: ApiState;
  loader: LoaderState;
  app: AppState;
  form: FormState;
  modal: ModalState;
  data: DataState;
};

export default store;
