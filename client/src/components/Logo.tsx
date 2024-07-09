import { FC } from "react";
import { useNavigate } from "react-router-dom";
import logo from "../assets/images/GenURL.png";

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
