import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Chat from "./pages/Chat";
import Index from "./pages/Index";
import Register from "./pages/signup";
import Header from "./components/Header";
import AuthProvider from "./components/AuthProvider";
import ProtectedRoute from "./components/ProtectedRoute";
import NotFound from "./pages/NotFound";
import SignIn from "./pages/login";
import Signup from "./pages/signup";
import Login from "./pages/login";
function Root() {
  return (
    <AuthProvider>
      <div className="h-full min-h-screen bg-gray-800 flex flex-col">
        <Router>
          <Header />
          <Routes>
            <Route index Component={Index} />
            <Route path="*" Component={NotFound} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/login" element={<Login />} />

            <Route
              path="/chat"
              element={
                <ProtectedRoute>
                  <Chat />
                </ProtectedRoute>
              }
            />
          </Routes>
        </Router>
      </div>
    </AuthProvider>
  );
}

export default Root;
