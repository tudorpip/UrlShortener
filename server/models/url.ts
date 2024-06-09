import { Model } from "sequelize";

export class UrlModel extends Model {
  public id!: string;
  public url!: string;
}
