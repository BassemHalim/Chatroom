import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Chat from "./pages/Chat";
import Index from "./pages/Index";
import Register from "./components/Register";
import Header from "./components/Header";
import AuthProvider from "./components/AuthProvider";
import ProtectedRoute from "./components/ProtectedRoute";
import NotFound from "./components/NotFound";
function Root() {
  return (
    <AuthProvider>
      <div className="h-full min-h-screen bg-gray-800 flex flex-col">
        <Header />
        <Router>
          <Routes>
            <Route index Component={Index} />
            <Route path="*" Component={NotFound} />
            <Route path="/Register" element={<Register />} />
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
