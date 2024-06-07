import { Model } from "sequelize";

export class urlMapModel extends Model {
  public id!: string;
  public url!: string;
}
