import { UserModel } from "../models/user.mjs";
import bcrypt from "bcryptjs";

export class UserService {
  constructor() {
    // Constructor is intentionally empty
  }

  async getUser(username) {
    return UserModel.findOne({ where: { username: username } });
  }

  async isValidEmailCheck(email) {
    const user = await UserModel.findOne({ where: { email: email } });
    console.log("user = " + user);
    return user == null;
  }
  async isValidUsername(username) {
    const user = await UserModel.findOne({ where: { username: username } });
    console.log("user = " + user);
    return user == null;
  }

  async createUser(username, email, password) {
    const hashedPassword = await this.hashPassword(password);
    if (!(await this.isValidEmail(email))) {
      console.log(1);
      return false;
    }
    if (
      !(await this.isValidUsername(username)) ||
      !(await this.isValidEmailCheck(email))
    ) {
      console.log(2);
      return false;
    }
    console.log(3);
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
  async getIdFromUser(username) {
    const user = await UserModel.findOne({ where: { username: username } });
    console.log(user.id);
    return user.id;
  }

  isValidEmail(email) {
    return true;

    //TODO: Implement email validation
    // const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    // return regex.test(email);
  }
}
