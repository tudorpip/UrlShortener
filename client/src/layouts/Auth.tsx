import React from "react";
import { useNavigate } from "react-router-dom";

export default function Auth(props: { element: React.ReactNode }) {
  const navigate = useNavigate();

  React.useEffect(() => {
    if (localStorage.getItem("token") != null) {
      navigate("/admin/create-url");
    }
  }, [navigate]);

  return <>{props.element}</>;
}
