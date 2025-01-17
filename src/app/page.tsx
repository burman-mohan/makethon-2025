"use client";
import { authContext } from "@/context/authContext";
import LoginPage from "./(auth)/login/page";
import DashboardPage from "./(postLogin)/dashboard/page";
import React from "react";

export default function Home() {
  const auth = React.useContext(authContext);

  return (
    <>
    {auth.auth ? <DashboardPage /> : <LoginPage /> }
    </>
  );
}
