import { UrlModel } from "../models/url.mjs";
import { DataTypes, Sequelize, UUIDV4 } from "sequelize";
import { nanoid } from "nanoid";
import express from "express";
import {
  connectToDatabase,
  initDatabase,
  syncDatabase,
} from "../db/connectDb.mjs";
import * as pg from "pg";

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
  try {
    const urls = await UrlModel.findAll({ where: { userId: userId } });
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
    var newUrl;
    try {
      const uuid = nanoid(7);
      const createdUrl = await UrlModel.create({
        id: uuid,
        userId: req.userId,
        url: url,
      });
      newUrl = createdUrl;
    } catch (error) {
      console.error("Error inserting URL:", error);
      url = null;
    }
    res.status(200).json({ url: url });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: error });
  }
}
