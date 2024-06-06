import { FC } from "react";
import React from "react";
import { logo } from "./App.tsx";

export const Logo: FC = () => {
  return (
    <img
      className="logo-image"
      onClick={() => console.log(1)}
      src={logo}
      alt="logo"
    />
  );
};
