import "../assets/css/App.css";
import { useState } from "react";
import { Button, Spinner } from "reactstrap";
import { FC } from "react";
import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { NavBar } from "../components/NavBar";
import { createUrl } from "../network/ApiAxios";
export interface NavBarProps {
  children?: React.ReactNode;
}
const ApiURL = import.meta.env.VITE_DEPLOYED_URL;
const CreateUrl: FC = () => {
  const [sufixUrl, setSufixUrl] = useState<String>("");
  const [loading, setLoding] = useState<boolean>(false);
  console.log(ApiURL);
  async function getCurrentNumber(url: string) {
    setSufixUrl("");
    setLoding(true);
    console.log(1);
    const resp = await createUrl(url);
    console.log(resp);
    setLoding(false);
    setSufixUrl(resp.data.url);
    console.log(resp.data);
  }
  const [url, setUrl] = useState<string>("");
  const baseURL = ApiURL;
  const endpoint = "/url/";
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
          {sufixUrl !== "" && (
            <div className="flex-row display-flex justify-content-center d-flex mt-4">
              <h3 className="me-3">This is your new short URL:</h3>
              <h3 style={{ color: "white" }}>{`${fullURL}${sufixUrl}`}</h3>
              <Button
                color="success"
                style={{ height: "40px", marginLeft: "30px" }}
                onClick={() => {
                  navigator.clipboard.writeText(`${fullURL}${sufixUrl}`);
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

export default CreateUrl;
