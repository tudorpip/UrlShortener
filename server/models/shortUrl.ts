import { Model } from "sequelize";

export class urlMapModel extends Model {
  public id!: number;
  public url!: string;
}
