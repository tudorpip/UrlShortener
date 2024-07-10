import React from "react";
import { useNavigate } from "react-router-dom";
import { validateToken } from "../network/ApiAxios";
export default function Admin(props: { element: React.ReactNode }) {
  const navigate = useNavigate();
  React.useEffect(() => {
    if (localStorage.getItem("token") == null) {
      localStorage.clear();
      navigate("/auth/login");
      return;
    }

    async function checkTokenAndNavigate() {
      try {
        const res = await validateToken();
        if (res?.status !== 200) {
          localStorage.clear();
          navigate("/auth/login");
        }
      } catch (error) {
        localStorage.clear();
        navigate("/auth/login");
      }
    }
    checkTokenAndNavigate();
  }, [navigate]);

  return <>{props.element}</>;
}
