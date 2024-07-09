import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Guest from "./views/Guest";
import Register from "./views/Register";
import Login from "./views/Login";
import Overview from "./views/Overview";
import CreateUrl from "./views/CreateUrl";
import Admin from "./layouts/Admin";
import Auth from "./layouts/Auth";

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
          path="/admin/overview"
          element={<Admin element={<Overview />} />}
        />
        <Route path="*" element={<Auth element={<Guest />} />} />
      </Routes>
    </Router>
  );
}
