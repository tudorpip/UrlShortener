import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Guest from "./views/Guest.tsx";
import Register from "./views/Register.tsx";
import Login from "./views/Login.tsx";
import Dashboard from "./views/Dashboard.tsx";
import CreateUrl from "./views/CreateUrl.tsx";
import Admin from "./layouts/Admin.tsx";
import Auth from "./layouts/Auth.tsx";

export default function App() {
  return (
    <Router>
      <Routes>
        <Route
          path="/admin/create-url"
          element={<Admin element={<CreateUrl />} />}
        />
        <Route path="/auth" element={<Auth element={<Guest />} />} />
        <Route
          path="/auth/register"
          element={<Auth element={<Register />} />}
        />
        <Route path="/auth/login" element={<Auth element={<Login />} />} />
        <Route
          path="/admin/dashboard"
          element={<Admin element={<Dashboard />} />}
        />
        <Route path="*" element={<Auth element={<Guest />} />} />
      </Routes>
    </Router>
  );
}
