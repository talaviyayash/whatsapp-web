/* eslint-disable @typescript-eslint/no-unused-vars */
import React from "react";
import AuthLayout from "@/layouts/AuthLayout";

const layout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return (
    <>
      {/* <AuthLayout /> */}
      {children}
    </>
  );
};

export default layout;
