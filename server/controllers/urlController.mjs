import { v4 as uuidv4 } from "uuid";
import { UrlService } from "../services/urlService.mjs";

const urlService = new UrlService();
export async function getURL(req, res) {
  console.log(req.params.id);
  const id = req.params.id;
  const url = await urlService.getURL(id);
  res.status(303).redirect(url.url);
}

export async function getAllURLs(req, res) {
  const userId = req.userId;
  try {
    const urls = await urlService.getAllURLs(userId);
    res.json(urls);
  } catch (error) {
    console.error("Error fetching URLs:", error);
    res.status(500).send("Internal Server Error");
  }
}

export async function createURL(req, res) {
  console.log(req.userId);
  console.log("caca");
  try {
    const url = req.body.url;
    console.log("URL IS 999" + url);
    const result = await urlService.createURL(url, req.userId);
    res.status(200).json({ result: result });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "An error occurred while URL." });
  }
}
async function testNanoId(req, res) {
  return res.status(200).send(nanoid());
}
