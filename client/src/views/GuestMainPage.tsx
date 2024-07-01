import "../assets/css/App.css";
import { FC } from "react";
import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { NavBar } from "../components/NavBar.tsx";
export const logo = require("../assets/images/GenURL.png") as string;
const background = require("../assets/images/undraw_schema.png") as string;
export interface NavBarProps {
  children?: React.ReactNode;
}
const exportedUrl = process.env.REACT_APP_DEPLOYED_URL;
const MainPage: FC = () => {
  console.log(exportedUrl);
  return (
    <div className="main-app">
      <NavBar isAuthenticated={false} />
      <TextDescription />
      <h1 className="header-link display-4 font-weight-bold text-center mt-3">
        Please authetificate
      </h1>
    </div>
  );
};
const BackgroundImage: FC = () => {
  return <img className="background-image" src={background} alt="background" />;
};
const TextDescription: FC = () => {
  return (
    <>
      <div className="description-section">
        <div>
          <h1 className="motto-header">Link smart, Share fast</h1>
          <p className="text-details">
            Our website is designed to transform long URLs into short,
            manageable links. This makes sharing easier and more efficient while
            providing you with the ability to track engagement and clicks.
            Simplify your online sharing experience with our streamlined,
            user-friendly service.
          </p>
        </div>
        <BackgroundImage />
      </div>
    </>
  );
};

export default MainPage;
