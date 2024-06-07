import { urlMapModel } from "../models/shortUrl.js";
export declare class UrlMapperService {
    constructor();
    getURL(id: any): Promise<any>;
    getAllURLs(): Promise<urlMapModel[]>;
    createURL(url: any): Promise<any>;
}
