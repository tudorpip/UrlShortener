import { UrlModel } from "../models/url.mjs";
import { DataTypes, Sequelize, UUIDV4 } from "sequelize";
import express from "express";
import {
  connectToDatabase,
  initDatabase,
  syncDatabase,
  dropDatabase,
} from "../db/connectDb.mjs";
import * as pg from "pg";

export class UrlMapperService {
  constructor() {}
  async getURL(id) {
    return await UrlModel.findOne({ where: { id: id } });
  }
  async getAllURLs() {
    return await UrlModel.findAll();
  }
  async createURL(url) {
    try {
      const uuid = uuidv4();
      const newUrl = await UrlModel.create({ id: uuid, url: url });
      return newUrl.id;
    } catch (error) {
      console.error("Error inserting URL:", error);
      return -1;
    }
  }
}
function uuidv4() {
  return "10000000-1000-4000-8000-100000000000".replace(/[018]/g, (c) =>
    (
      +c ^
      (crypto.getRandomValues(new Uint8Array(1))[0] & (15 >> (+c / 4)))
    ).toString(16)
  );
}
