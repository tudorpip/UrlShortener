import "../assets/css/App.css";
import { useState } from "react";
import { Button, Spinner } from "reactstrap";
import { FC } from "react";
import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { NavBar } from "../components/NavBar.tsx";
import { use } from "express/lib/application.js";
export const logo = require("../assets/images/GenURL.png") as string;
const background = require("../assets/images/undraw_schema.png") as string;
export interface NavBarProps {
  children?: React.ReactNode;
}
const exportedUrl = process.env.REACT_APP_DEPLOYED_URL;
const MainPage: FC = () => {
  const [nr, setNr] = useState<String>("");
  const [loading, setLoding] = useState<boolean>(false);
  console.log(exportedUrl);
  async function getCurrentNumber(url: string) {
    setNr("");
    setLoding(true);
    const baseURL = exportedUrl;
    const endpoint = "/create-url";
    const fullURL = baseURL + endpoint;
    const token = localStorage.getItem("token");
    console.log(1);
    await fetch(fullURL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ url: url }),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        setLoding(false);
        setNr(data.result);
        console.log(data.result);
      });
  }
  const [url, setUrl] = useState<string>("");
  const baseURL = exportedUrl;
  const endpoint = "/";
  const fullURL = baseURL + endpoint;
  return (
    <div className="main-app">
      <NavBar isAuthenticated={true} />
      <div className="d-flex flex-column align-items-center ml-4 mr-4 mt-5 mb-5">
        <h3 className="enter-url-css mb-4">Enter your URL</h3>
        <div>
          <input
            className="my-input"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
          ></input>
          <Button
            color="dark"
            style={{ height: "56px" }}
            onClick={() => getCurrentNumber(url)}
          >
            Get Short URL
          </Button>
          {nr !== "" && (
            <div className="flex-row display-flex justify-content-center d-flex mt-4">
              <h3 className="me-3">This is your new short URL:</h3>
              <h3 style={{ color: "white" }}>{`${fullURL}${nr}`}</h3>
              <Button
                color="success"
                style={{ height: "40px", marginLeft: "30px" }}
                onClick={() => {
                  navigator.clipboard.writeText(`${fullURL}${nr}`);
                }}
              >
                Copy
              </Button>
            </div>
          )}
          {loading === true && (
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Spinner
                color="dark"
                style={{
                  height: "10rem",
                  width: "10rem",
                }}
                type="grow"
              >
                Loading...
              </Spinner>
            </div>
          )}
        </div>
      </div>
      )
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
        <br></br>
        <BackgroundImage />
      </div>
    </>
  );
};

export default MainPage;
