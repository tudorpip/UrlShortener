import { FC } from "react";
import React from "react";
import { useNavigate } from "react-router-dom";
import { logo } from "../views/Guest.tsx";

export const Logo: FC = () => {
  const navigate = useNavigate();
  return (
    <img
      className="logo-image"
      onClick={() => navigate("/admin/create-url")}
      src={logo}
      alt="logo"
    />
  );
};
