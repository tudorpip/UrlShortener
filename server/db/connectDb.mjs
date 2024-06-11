import { UrlModel } from "../models/url.mjs";
import { DataTypes, Sequelize } from "sequelize";
import pg from "pg";
import dotenv from "dotenv";
dotenv.config();

export function connectToDatabase() {
  const URL = process.env.POSTGRES_URL;
  const sequelize = new Sequelize(URL || "", {
    dialect: "postgres",
    dialectModule: pg,
    define: {
      timestamps: false,
    },
    dialectOptions: {
      ssl: {
        require: true,
      },
    },
  });
  return sequelize;
}
export function initDatabase(sequelize) {
  UrlModel.init(
    {
      id: {
        type: DataTypes.STRING,
        primaryKey: true,
        defaultValue: DataTypes.UUIDV4,
      },
      url: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: "URLMapModel",
      tableName: "URLs",
    }
  );
}
export async function syncDatabase(sequelize) {
  await UrlModel.sync();
}

//Used for testing purposes only, should be removed before production
export async function dropDatabase(sequelize) {
  await UrlModel.drop();
}
