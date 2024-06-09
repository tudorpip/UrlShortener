import "./assets/css/App.css";
import { useState } from "react";
import { Button } from "reactstrap";
import { FC } from "react";
import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { NavBar } from "./components/NavBar.tsx";
export const logo = require("./assets/images/GenURL.png") as string;
const background = require("./assets/images/undraw_schema.png") as string;
export interface NavBarProps {
  children?: React.ReactNode;
}
const App: FC = () => {
  const [nr, setNr] = useState<String>("");
  async function getCurrentNumber(url: string) {
    await fetch("http://localhost:8080/create-url", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ url: url }),
    })
      .then((response) => response.json())
      .then((data) => {
        setNr(data.result);
        console.log(data.result);
      });
  }
  const [url, setUrl] = useState<string>("");
  return (
    <div className="main-app">
      <NavBar />
      <TextDescription />
      <h3 className="enter-url-css">Enter your URL</h3>
      <div>
        <input
          className="my-input"
          value={url}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setUrl(e.target.value)
          }
        ></input>
        <Button color="dark" size="lg" onClick={() => getCurrentNumber(url)}>
          Get Short URL
        </Button>
        {nr !== "" && (
          <div className="link-section ">
            <h1 className="header-link">
              This is your new short URL:
              <span className="styled-part">{` http://localhost:8080/${nr}`}</span>
            </h1>
            <Button
              color="success"
              onClick={() => {
                navigator.clipboard.writeText(`http://localhost:8080/${nr}`);
              }}
            >
              Copy
            </Button>
          </div>
        )}
      </div>
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

export default App;
