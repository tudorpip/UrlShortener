import { urlMapModel } from "./models/shortUrl";
import { DataTypes, Sequelize } from "sequelize";
import * as pg from "pg";

export class UrlMapperService {
  constructor() {
    this.connectToDatabase();
  }
  private connectToDatabase() {
    const URL =
      "postgresql://admin:yKXx3EIl0eSN@ep-dawn-cake-a4wb02wl.us-east-1.aws.neon.tech/UrlShortener?sslmode=require";
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
    urlMapModel.init(
      {
        id: {
          type: DataTypes.INTEGER,
          primaryKey: true,
          autoIncrement: true,
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
    urlMapModel.sync({ alter: false });
  }
  async getURL(id: number): Promise<any> {
    return await urlMapModel.findOne({ where: { id: id } });
  }
  async getAllURLs(): Promise<urlMapModel[]> {
    return await urlMapModel.findAll();
  }
  async createURL(url: string): Promise<number> {
    try {
      const newUrl = await urlMapModel.create({ url: url });
      return newUrl.id;
    } catch (error) {
      console.error("Error inserting URL:", error);
      return -1;
    }
  }
}
