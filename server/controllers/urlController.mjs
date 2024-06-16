import { v4 as uuidv4 } from "uuid";
import { UrlMapperService } from "../services/urlService.mjs";

const urlMapperService = new UrlMapperService();
export async function getURL(req, res) {
  const id = req.params.id;
  const url = await urlMapperService.getURL(id);
  res.status(303).redirect(url.url);
}

export async function getAllURLs(req, res) {
  try {
    const urls = await UrlMapperService.getAllURLs();
    res.json(urls);
  } catch (error) {
    console.error("Error fetching URLs:", error);
    res.status(500).send("Internal Server Error");
  }
}

export async function createURL(req, res) {
  console.log("caca");
  try {
    const url = req.body.url;
    console.log("URL IS 999" + url);
    const result = await urlMapperService.createURL(url);
    res.status(200).json({ result: result });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "An error occurred while URL." });
  }
}
