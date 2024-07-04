import "../assets/css/App.css";
import { FC } from "react";
import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Button } from "reactstrap";
import { useNavigate } from "react-router-dom";
import { NavBar } from "../components/NavBar.tsx";
export const logo = require("../assets/images/GenURL.png") as string;
// import myLogo from "../assets/images/GenURL.png";
export interface NavBarProps {
  children?: React.ReactNode;
}
const Guest: FC = () => {
  const navigate = useNavigate();
  return (
    <div className="main-app">
      <NavBar isAuthenticated={false} />
      <>
        <div className="d-flex flex-column align-items-center ml-4 mr-4 mt-5 mb-5">
          <h1 className="mt-4 mb-5" style={{ fontSize: "60px" }}>
            Link smart,<span style={{ color: "#1217A2" }}> Share fast</span>
          </h1>
          <footer
            className="fs-5"
            style={{
              color: "white",
              marginLeft: "150px",
              marginRight: "150px",
            }}
          >
            Our website is designed to transform long URLs into short,
            manageable links. This makes sharing easier and more efficient while
            providing you with the ability to track engagement and clicks.
            Simplify your online sharing experience with our streamlined,
            user-friendly service.
          </footer>
          <Button
            color="dark"
            size="lg"
            className="mt-5 mb-5"
            onClick={() => navigate("/auth/register")}
            style={{
              width: "270px",
              height: "80px",
              fontSize: "30px",
              borderRadius: "30px",
            }}
          >
            Start now!
          </Button>
        </div>
      </>
    </div>
  );
};

export default Guest;
