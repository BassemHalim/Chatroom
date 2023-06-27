import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Chat from "./pages/Chat";
import Index from "./pages/Index";
import Register from "./components/Register";
import Header from "./components/Header";
function Root() {
  return (
    <div className="h-full min-h-screen bg-gray-800 flex flex-col">
      <Header/>
      <Router>
        <Routes>
          <Route index element={<Index />} />
          <Route path="/Register" element={<Register />} />
          <Route path="/chat" element={<Chat />} />
        </Routes>
      </Router>
    </div>
  );
}

export default Root;
