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
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UrlMapperService = void 0;
const shortUrl_1 = require("./models/shortUrl");
const sequelize_1 = require("sequelize");
const pg = __importStar(require("pg"));
class UrlMapperService {
    constructor() {
        this.connectToDatabase();
    }
    connectToDatabase() {
        const URL = "postgresql://admin:yKXx3EIl0eSN@ep-dawn-cake-a4wb02wl.us-east-1.aws.neon.tech/UrlShortener?sslmode=require";
        const sequelize = new sequelize_1.Sequelize(URL || "", {
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
        shortUrl_1.urlMapModel.init({
            id: {
                type: sequelize_1.DataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true,
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
        shortUrl_1.urlMapModel.sync({ alter: false });
    }
    getURL(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield shortUrl_1.urlMapModel.findOne({ where: { id: id } });
        });
    }
    getAllURLs() {
        return __awaiter(this, void 0, void 0, function* () {
            return yield shortUrl_1.urlMapModel.findAll();
        });
    }
    createURL(url) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const newUrl = yield shortUrl_1.urlMapModel.create({ url: url });
                return newUrl.id;
            }
            catch (error) {
                console.error("Error inserting URL:", error);
                return -1;
            }
        });
    }
}
exports.UrlMapperService = UrlMapperService;
