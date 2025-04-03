"use client";
import { addProfile } from "@/redux/slice/appSlice";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { UserInfo } from "../types/chat";

const ProtectedLayout = ({
  children,
  userInfo,
}: Readonly<{
  children: React.ReactNode;
  userInfo: UserInfo;
}>) => {
  // const { api } = useApiHook();
  const [isLoading, setIsLoading] = useState(true);
  const dispatch = useDispatch();

  useEffect(() => {
    // const getSessionData = async () => {
    //   const result = await api({
    //     endPoint: "users/session",
    //     method: "GET",
    //   });
    //   setIsLoading(false);
    //   console.log("isLoading", isLoading);

    //   if (result?.success) {
    //     dispatch(addProfile(result?.data?.user));
    //   }
    // };
    // getSessionData();
    dispatch(addProfile(userInfo));
    setIsLoading(false);
  }, []);

  if (isLoading) {
    return <></>;
  }

  return <div>{!isLoading && children}</div>;
};

export default ProtectedLayout;
