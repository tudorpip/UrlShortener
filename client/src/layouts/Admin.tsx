import React from "react";
import { useNavigate } from "react-router-dom";
export default function Admin(props: { element: React.ReactNode }) {
  const exportedUrl = process.env.REACT_APP_DEPLOYED_URL;
  const navigate = useNavigate();
  React.useEffect(() => {
    if (localStorage.getItem("token") == null) {
      localStorage.clear();
      navigate("/");
    }
    async function checkToken() {
      const baseURL = exportedUrl;
      const endpoint = "/user/validateToken";
      const fullURL = baseURL + endpoint;
      const token = localStorage.getItem("token");
      console.log(2);
      await fetch(fullURL, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }).then((response) => {
        if (response.status !== 200) {
          localStorage.clear();
          navigate("/");
        }
      });
    }
    checkToken();
  }, [navigate, exportedUrl]);

  return <>{props.element}</>;
}
