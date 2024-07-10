import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Table, Spinner } from "reactstrap";
import { getAllUrls } from "../network/ApiAxios";
import { TableEntry } from "../models/tableEntry";
import { Url } from "../models/url";
import "bootstrap/dist/css/bootstrap.min.css";

export function Overview() {
  const ApiURL = import.meta.env.VITE_DEPLOYED_URL + "/";
  const navigator = useNavigate();

  const [tableData, setTableData] = useState<TableEntry[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      const resp = await getAllUrls();
      const data = await resp.data;
      const newEntries = data.map((element: Url) => {
        const shortUrl = ApiURL + "url/" + element.id;
        return {
          originalUrl: element.url,
          shortenedUrl: shortUrl,
        };
      });
      setTableData(newEntries);
    };
    fetchData().finally(() => setIsLoading(false));
  }, [ApiURL, navigator]);
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
        onClick={() => navigator("/admin/create-url")}
      >
        &times;
      </button>
      <h1 className="header-link display-4 font-weight-bold text-center mt-3">
        Overview
      </h1>
      <Table
        className="table-hover ml-2 mr-5"
        style={{
          maxWidth: "100%",
          width: "auto",
          margin: "0 20px",
          boxSizing: "border-box",
        }}
      >
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
              <td className="text-break">{url.originalUrl}</td>
              <td>{url.shortenedUrl}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
}
export default Overview;
