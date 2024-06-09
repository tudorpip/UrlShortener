import { FC } from "react";
import React from "react";
import { NavBarProps } from "../App";
import { Logo } from "../components/Logo.tsx";

export const NavBar: FC<NavBarProps> = ({ children }) => {
  return (
    <div className="nav-bar">
      <div className="left">
        <Logo />
      </div>
      <div className="right">{children}</div>
    </div>
  );
};
