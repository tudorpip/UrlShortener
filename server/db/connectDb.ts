import { urlMapModel } from "../models/shortUrl";
import { DataTypes, Sequelize } from "sequelize";
import * as pg from "pg";
require("dotenv").config();

export function connectToDatabase(): Sequelize {
  const URL = process.env.POSTGRES_URL;
  const sequelize = new Sequelize(URL || "", {
    dialect: "postgres",
    dialectModule: pg,
    define: {
      timestamps: false, // This disables the created_at and updated_at columns
    },
    dialectOptions: {
      ssl: {
        require: true, // Use SSL with the 'require' option
      },
    },
  });
  return sequelize;
}
export function initDatabase(sequelize: Sequelize) {
  urlMapModel.init(
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
export function syncDatabase(sequelize: Sequelize) {
  urlMapModel.sync();
}
export function dropDatabase(sequelize: Sequelize) {
  console.log(1);
  urlMapModel.drop();
}
