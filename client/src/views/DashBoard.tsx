import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Table, Spinner } from "reactstrap";
import { getAllUrls } from "../network/ApiAxios.ts";
import "bootstrap/dist/css/bootstrap.min.css";

export function Dashboard() {
  const exportedUrl = process.env.REACT_APP_DEPLOYED_URL;
  const baseURL = exportedUrl;
  const endpoint = "/";
  const fullURL = baseURL + endpoint;
  const navigator = useNavigate();
  interface UrlData {
    originalUrl: string;
    shortenedUrl: string;
  }
  const [tableData, setTableData] = useState<UrlData[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      const token = localStorage.getItem("token");
      if (!token) {
        navigator("/auth/login");
      }
      const resp = await getAllUrls();
      const data = await resp.data;
      const newEntries = data.map((element) => {
        const shortUrl = baseURL + "/url/" + element.id;
        return {
          originalUrl: element.url,
          shortenedUrl: shortUrl,
        };
      });
      setTableData(newEntries);
      console.log(newEntries);
    };
    fetchData().finally(() => setIsLoading(false));
  }, [fullURL, baseURL, navigator]);
  return isLoading ? (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
        width: "100vw",
      }}
    >
      <Spinner
        color="primary"
        style={{
          height: "10rem",
          width: "10rem",
        }}
        type="grow"
      >
        Loading...
      </Spinner>
    </div>
  ) : (
    <div>
      <button
        className="close btn btn-primary m-2 lg"
        type="button"
        onClick={() => navigator("/admin/main")}
      >
        &times;
      </button>
      <h1 className="header-link display-4 font-weight-bold text-center mt-3">
        Dashboard
      </h1>
      <Table>
        <thead>
          <tr>
            <th>#</th>
            <th>Original Url</th>
            <th>Short Url</th>
          </tr>
        </thead>
        <tbody>
          {tableData.map((url, index) => (
            <tr key={index}>
              <th scope="row">{index + 1}</th>
              <td>{url.originalUrl}</td>
              <td>{url.shortenedUrl}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
}
export default Dashboard;
