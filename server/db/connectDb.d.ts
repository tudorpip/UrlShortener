import { Sequelize } from "sequelize";
export declare function connectToDatabase(): Sequelize;
export declare function initDatabase(sequelize: Sequelize): void;
export declare function syncDatabase(sequelize: Sequelize): void;
export declare function dropDatabase(sequelize: Sequelize): void;
