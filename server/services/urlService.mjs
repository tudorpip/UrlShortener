import { UrlModel } from "../models/url.mjs";
import { nanoid } from "nanoid";

export async function getURL(req, res) {
  console.log(req.params.id);
  const id = req.params.id;
  const url = await UrlModel.findOne({ where: { id: id } });
  if (!url) {
    return res.status(404).send("URL not found");
  }
  return res.status(303).redirect(url.url);
}

export async function getAllURLs(req, res) {
  const userId = req.userId;
  const urls = await UrlModel.findAll({ where: { userId: userId } }).catch(
    (error) => {
      return res.status(500).send("Internal Server Error");
    }
  );
  return res.json(urls);
}

export async function createURL(req, res) {
  const urlRegex = /^(https?:\/\/)?([\da-z\.-]+)\.([a-z]{2,6})([\/\w\.-]*)*\/?/;
  const url = req.body.url;
  console.log("URL IS 999" + url);
  const validUrl = urlRegex.test(url);
  if (!validUrl) {
    return res.status(400).send("Invalid URL");
  }
  const uuid = nanoid(7);
  const createdUrl = await UrlModel.create({
    id: uuid,
    userId: req.userId,
    url: url,
  }).catch((error) => {
    return res.status(500).send("Internal Server Error");
  });
  console.log(createdUrl);
  return res.status(200).json({ url: uuid });
}
