import "../assets/css/App.css";
import { useState, useEffect } from "react";
import { Button } from "reactstrap";
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
  const [nr, setNr] = useState<String>("");
  console.log(exportedUrl);
  async function getCurrentNumber(url: string) {
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
      <TextDescription />
      <>
        <h3 className="enter-url-css">Enter your URL</h3>
        <div>
          <input
            className="my-input"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
          ></input>
          <Button color="dark" size="lg" onClick={() => getCurrentNumber(url)}>
            Get Short URL
          </Button>
          {nr !== "" && (
            <div className="link-section ">
              <h1 className="header-link">
                This is your new short URL:<br></br>
                <span className="styled-part">{`${fullURL}${nr}`}</span>
              </h1>
              <Button
                color="primary"
                onClick={() => {
                  navigator.clipboard.writeText(`${fullURL}${nr}`);
                }}
              >
                Copy
              </Button>
            </div>
          )}
        </div>
      </>
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
        <BackgroundImage />
      </div>
    </>
  );
};

export default MainPage;
