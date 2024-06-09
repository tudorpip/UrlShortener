"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.dropDatabase = exports.syncDatabase = exports.initDatabase = exports.connectToDatabase = void 0;
const url_1 = require("../models/url");
const sequelize_1 = require("sequelize");
const pg = __importStar(require("pg"));
require("dotenv").config();
function connectToDatabase() {
    const URL = process.env.POSTGRES_URL;
    const sequelize = new sequelize_1.Sequelize(URL || "", {
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
exports.connectToDatabase = connectToDatabase;
function initDatabase(sequelize) {
    url_1.UrlModel.init({
        id: {
            type: sequelize_1.DataTypes.STRING,
            primaryKey: true,
            defaultValue: sequelize_1.DataTypes.UUIDV4,
        },
        url: {
            type: sequelize_1.DataTypes.STRING,
            allowNull: false,
        },
    }, {
        sequelize,
        modelName: "URLMapModel",
        tableName: "URLs",
    });
}
exports.initDatabase = initDatabase;
function syncDatabase(sequelize) {
    url_1.UrlModel.sync();
}
exports.syncDatabase = syncDatabase;
//Used for testing purposes only, should be removed before production
function dropDatabase(sequelize) {
    url_1.UrlModel.drop();
}
exports.dropDatabase = dropDatabase;
