import ProtectedLayout from "@/layouts/ProtectedLayout";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import React from "react";

const layout = async ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  const cookieStore = await cookies();
  const accessToken = cookieStore.get("accessToken")?.value;
  if (!accessToken) {
    redirect("/signin");
  }

  return (
    <>
      <ProtectedLayout>{children}</ProtectedLayout>
    </>
  );
};

export default layout;
