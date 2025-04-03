"use client";

import { loaderChange } from "@/redux/slice/loaderSlice";
import axios, { AxiosRequestConfig } from "axios";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";
// import toast from "react-hot-toast";
// import { useDispatch } from "react-redux";

export const apiCall = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api/",
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
});

type AxiosHeaders = AxiosRequestConfig["headers"];

interface ApiProps {
  method?: "POST" | "PATCH" | "GET";
  header?: AxiosHeaders;
  endPoint?: string;
  data?: unknown;
  showToastMessage?: boolean;
  needLoader?: boolean;
  loaderName?: string;
  params?: {
    [key: string]: string;
  };
}

const useApiHook = () => {
  const dispatch = useDispatch();

  const api = async ({
    header = {},
    endPoint,
    method,
    data,
    showToastMessage = false,
    needLoader = false,
    loaderName = "",
    params,
  }: ApiProps) => {
    try {
      const accessToken = localStorage.getItem("token");
      const headers: AxiosHeaders = {
        "Content-Type": "application/json",
        ...(accessToken && { Authorization: `Bearer ${accessToken}` }),
        ...header,
      };
      if (needLoader) dispatch(loaderChange({ name: loaderName, value: true }));
      const response = await apiCall({
        method,
        url: endPoint,
        data,
        headers,
        withCredentials: true,
        params,
      });
      if (showToastMessage) toast.success(response?.data?.message);
      if (needLoader)
        dispatch(loaderChange({ name: loaderName, value: false }));
      return response?.data;
    } catch (e: unknown) {
      if (needLoader)
        dispatch(loaderChange({ name: loaderName, value: false }));
      if (axios.isAxiosError(e)) {
        if (showToastMessage) toast.error(e.response?.data?.message);
        return e.response?.data;
      } else {
        console.error("Unexpected Error:", e);
        return { message: "An unexpected error occurred" };
      }
    }
  };

  return { api };
};

export default useApiHook;
