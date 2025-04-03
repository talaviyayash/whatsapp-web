import ProtectedLayout from "@/layouts/ProtectedLayout";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import React from "react";

const apiBaseUrl =
  process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api/";

const layout = async ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  const cookieStore = await cookies();
  const allCookies = cookieStore.getAll();
  let userInfo = null;

  const accessToken = cookieStore.get("accessToken")?.value;
  if (!accessToken) {
    redirect("/signin");
  }
  const cookieHeader = allCookies
    .map((cookie) => `${cookie.name}=${cookie.value}`)
    .join("; ");

  try {
    const res = await fetch(`${apiBaseUrl}users/session`, {
      credentials: "include",
      headers: {
        Cookie: cookieHeader,
      },
    });
    if (!res.ok) {
      redirect("/signin");
    }
    const data = await res.json();
    userInfo = data?.data?.user;
  } catch {
    redirect("/signin");
  }

  return (
    <>
      <ProtectedLayout {...{ userInfo }}>{children}</ProtectedLayout>
    </>
  );
};

export default layout;
