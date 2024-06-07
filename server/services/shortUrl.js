"use strict";
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
const shortUrl_js_1 = require("../models/shortUrl.js");
const connectDb_1 = require("../db/connectDb");
class UrlMapperService {
    constructor() {
        const sequelize = (0, connectDb_1.connectToDatabase)();
        (0, connectDb_1.initDatabase)(sequelize);
        (0, connectDb_1.syncDatabase)(sequelize);
    }
    getURL(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield shortUrl_js_1.urlMapModel.findOne({ where: { id: id } });
        });
    }
    getAllURLs() {
        return __awaiter(this, void 0, void 0, function* () {
            return yield shortUrl_js_1.urlMapModel.findAll();
        });
    }
    createURL(url) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const uuid = uuidv4();
                const newUrl = yield shortUrl_js_1.urlMapModel.create({ id: uuid, url: url });
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
function uuidv4() {
    return "10000000-1000-4000-8000-100000000000".replace(/[018]/g, (c) => (+c ^
        (crypto.getRandomValues(new Uint8Array(1))[0] & (15 >> (+c / 4)))).toString(16));
}
