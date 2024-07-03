import React from "react";
import { useNavigate } from "react-router-dom";
import { validateToken } from "../network/ApiAxios.ts";
export default function Admin(props: { element: React.ReactNode }) {
  const navigate = useNavigate();
  React.useEffect(() => {
    if (localStorage.getItem("token") == null) {
      localStorage.clear();
      navigate("/");
      return;
    }

    async function checkTokenAndNavigate() {
      const res = await validateToken().catch((error) => {
        console.log("Error checking user auth", error);
        return null;
      });
      console.log(11);
      if (res?.status !== 200) {
        console.log(res?.status);
        localStorage.clear();
        return navigate("/");
      }
    }

    checkTokenAndNavigate();
  }, [navigate]);

  return <>{props.element}</>;
}
