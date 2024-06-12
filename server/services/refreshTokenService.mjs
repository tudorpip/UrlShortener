import { RefreshTokenModel } from "../models/refreshToken.mjs";
export class RefreshTokenMapperService {
  constructor() {}
  async getRefreshToken(token) {
    const refreshToken = await RefreshTokenModel.findOne({
      where: { token: token },
    });
    return refreshToken !== null;
  }
  async createRefreshToken(token) {
    return await RefreshTokenModel.create({ token: token });
  }
  async deleteRefreshToken(token) {
    return await RefreshTokenModel.destroy({ where: { token: token } });
  }
}
