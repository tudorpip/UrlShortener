import { UrlModel } from "../models/url.mjs";
import { UserModel } from "../models/user.mjs";
import { ActiveSessionModel } from "../models/activeSession.mjs";
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
      userId: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      url: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: "UrlModel",
      tableName: "urls",
    }
  );
  UserModel.init(
    {
      id: {
        type: DataTypes.STRING,
        primaryKey: true,
        defaultValue: DataTypes.UUIDV4,
      },
      username: {
        type: DataTypes.STRING,
      },
      email: {
        type: DataTypes.STRING,
        unique: true,
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: "UserModel",
      tableName: "users",
    }
  );
  ActiveSessionModel.init(
    {
      id: {
        type: DataTypes.STRING,
        primaryKey: true,
        defaultValue: DataTypes.UUIDV4,
      },
      token: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      userId: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      expiresAt: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: () =>
          new Date(new Date().getTime() + 24 * 60 * 60 * 1000), // Adds 24 hours to the current time
      },
    },
    {
      sequelize,
      modelName: "ActiveSessionModel",
      tableName: "active_sessions",
    }
  );
}
export async function syncDatabase(sequelize) {
  await sequelize.sync();
}
