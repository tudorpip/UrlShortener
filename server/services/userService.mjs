import { UserModel } from "../models/user.mjs";
import bcrypt from "bcryptjs";

export class UserService {
  constructor() {
    // Constructor is intentionally empty
  }

  async getUser(username) {
    return UserModel.findOne({ where: { username: username } });
  }

  async createUser(username, email, password) {
    const hashedPassword = await this.hashPassword(password);
    if (!this.isValidEmail(email)) {
      return false;
    }
    console.log(username, hashedPassword);
    try {
      const user = await UserModel.create({
        username: username,
        email: email,
        password: hashedPassword,
      });
      const userObject = user.toJSON();
      delete userObject.password;
      return userObject;
    } catch (error) {
      throw new Error(error.message);
    }
  }
  async authenticateUser(username, password) {
    try {
      const user = await this.getUser(username);
      if (!user) {
        throw new Error("User not found");
      }
      const isPasswordMatch = await this.comparePasswords(
        password,
        user.password
      );
      if (!isPasswordMatch) {
        throw new Error("Incorrect password");
      }
      return true;
    } catch (error) {
      throw error;
    }
  }
  async getAllUsers() {
    return await UserModel.findAll();
  }

  async hashPassword(password) {
    const saltRounds = 10;
    return await bcrypt.hash(password, saltRounds);
  }
  async comparePasswords(password, hashedPassword) {
    return await bcrypt.compare(password, hashedPassword);
  }

  isValidEmail(email) {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  }
}
