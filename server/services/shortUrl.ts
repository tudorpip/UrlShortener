import { urlMapModel } from "../models/shortUrl.js";
import { DataTypes, Sequelize, UUIDV4 } from "sequelize";
import {
  connectToDatabase,
  initDatabase,
  syncDatabase,
  dropDatabase,
} from "../db/connectDb";
import * as pg from "pg";

export class UrlMapperService {
  constructor() {
    const sequelize = connectToDatabase();
    initDatabase(sequelize);
    syncDatabase(sequelize);
  }
  async getURL(id: any): Promise<any> {
    return await urlMapModel.findOne({ where: { id: id } });
  }
  async getAllURLs(): Promise<urlMapModel[]> {
    return await urlMapModel.findAll();
  }
  async createURL(url: any): Promise<any> {
    try {
      const uuid = uuidv4();
      const newUrl = await urlMapModel.create({ id: uuid, url: url });
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
