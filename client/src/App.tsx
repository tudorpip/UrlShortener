import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import GuestMainPage from "./views/GuestMainPage.tsx";
import SignUpPage from "./views/SignUpPage.tsx";
import LoginPage from "./views/LoginPage.tsx";
import Dashboard from "./views/DashBoard.tsx";
import MainPageAuthentificated from "./views/MainPageAuthentificated.tsx";
import Admin from "./layouts/Admin.tsx";
import Auth from "./layouts/Auth.tsx";

export default function App() {
  return (
    <Router>
      <Routes>
        <Route
          path="/admin/main"
          element={<Admin element={<MainPageAuthentificated />} />}
        />
        <Route path="/auth" element={<Auth element={<GuestMainPage />} />} />
        <Route
          path="/auth/signup"
          element={<Auth element={<SignUpPage />} />}
        />
        <Route path="/auth/login" element={<Auth element={<LoginPage />} />} />
        <Route
          path="/admin/dashboard"
          element={<Admin element={<Dashboard />} />}
        />
        <Route path="*" element={<Auth element={<GuestMainPage />} />} />
      </Routes>
    </Router>
  );
}
