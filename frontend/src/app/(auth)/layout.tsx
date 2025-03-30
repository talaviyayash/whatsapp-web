import React from "react";
import AuthLayout from "@/layouts/AuthLayout";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

const layout = async ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  const cookieStore = await cookies();
  const accessToken = cookieStore.get("accessToken")?.value;
  if (accessToken) {
    redirect("/chat");
  }

  return (
    <>
      <AuthLayout>{children}</AuthLayout>
    </>
  );
};

export default layout;
