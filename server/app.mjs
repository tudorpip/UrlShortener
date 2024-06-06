import express from "express";
import { UrlMapperService } from "./shortUrl.js";

const app = express();
const urlMapperService = new UrlMapperService();
app.use(express.json());
import cors from "cors";

app.use(cors());
app.get("/", async (req, res) => {
  try {
    const urls = await urlMapperService.getAllURLs();
    res.send(urls);
  } catch (error) {
    console.error("Error getting all URLs:", error);
    res.status(500).send("An error occurred while getting all URLs.");
  }
});

app.get("/:id", async (req, res) => {
  const id = req.params.id;
  const url = await urlMapperService.getURL(id);
  res.status(303).redirect(url.url);
});

app.post("/create-url", async (req, res) => {
  try {
    const url = req.body.url;
    console.log(url);
    const result = await urlMapperService.createURL(url);
    res
      .status(200)
      .json({ message: "URL created successfully", result: result });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "An error occurred while URL." });
  }
});

app.listen(8080, () => {
  console.log(
    "Server is running on port 8080. Check the app on http://localhost:8080"
  );
});
