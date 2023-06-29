import React from "react";
import SignIn from "../components/SignIn";
import { useAuth } from "../components/AuthProvider";
import { Navigate } from "react-router-dom";
export default function Index() {
  const { isAuthenticated } = useAuth();
  return (
    <div className="flex place-content-center mt-10">
      {!isAuthenticated ? <SignIn /> : <Navigate to="/chat" />}
    </div>
  );
}
