"use client";
import useApiHook from "@/hooks/useApiHook";
import { addProfile } from "@/redux/slice/appSlice";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";

const ProtectedLayout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  const { api } = useApiHook();

  const [isLoading, setIsLoading] = useState(true);

  const dispatch = useDispatch();

  useEffect(() => {
    const getSessionData = async () => {
      const result = await api({
        endPoint: "users/session",
        method: "GET",
      });
      setIsLoading(false);
      if (result?.success) {
        dispatch(addProfile(result?.data?.user));
      }
      console.log("result", result);
    };
    getSessionData();
  }, []);
  return <div>{isLoading ? "" : children}</div>;
};

export default ProtectedLayout;
