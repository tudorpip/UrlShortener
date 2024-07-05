import { ActiveSessionModel } from "../models/activeSession.mjs";
import { UserModel } from "../models/user.mjs";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";

export async function register(req, res) {
  const username = req.body.username;
  const password = req.body.password;
  const email = req.body.email;
  console.log(1);

  var result;
  const hashedPassword = await await bcrypt.hash(password, 10);
  const user = await UserModel.findOne({ where: { email: email } });
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const isValidEmail = regex.test(email);
  if (user !== null || isValidEmail) {
    console.log(2);
    result = null;
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
    result = userObject;
  } catch (error) {
    result = null;
  }
  console.log(result);
  if (result === null) {
    return res.status(400).json({ error: "Unable to create account" });
  }
  res.status(200).json({ result: result });
}
export async function logout(req, res) {
  try {
    const token = req.headers.authorization.split(" ")[1];
    const session = await ActiveSessionModel.findOne({
      where: { token: token },
    });
    if (session) {
      await session.destroy();
      res.sendStatus(200);
    } else {
      res.sendStatus(401);
    }
  } catch (error) {
    console.log(error);
    res.status(500).send("Internal Server Error");
  }
}

export async function login(req, res) {
  try {
    const email = req.body.email;
    const password = req.body.password;
    var user;
    try {
      console.log("rara1");
      user = await UserModel.findOne({ where: { email: email } });
      if (!user) {
        return res.status(400).send("Invalid email/password.");
      }
      const isPasswordMatch = await bcrypt.compare(password, user.password);
      if (!isPasswordMatch) {
        return res.status(400).send("Invalid email/password.");
      }
    } catch (error) {
      return res.status(500).send("Something went wrong");
    }
    if (user) {
      const token = jwt.sign({ id: user.id }, process.env.ACCESS_TOKEN_SECRET, {
        expiresIn: "1d",
      });
      try {
        ActiveSessionModel.create({
          token: token,
          userId: user.id,
        });
      } catch (error) {
        console.log(error);
        return res
          .status(500)
          .json({ error: "Unable to create active session" });
      }
      res.status(200).json({
        message: "User authenticated.",
        token: token,
      });
    }
  } catch (error) {
    console.log(error);
    res.status(500).send("No username/password found in the request.");
  }
}

export async function verifyToken(req, res, next) {
  const token = req.headers.authorization.split(" ")[1];
  console.log(token);
  if (token == null) return res.sendStatus(401);
  const session = await ActiveSessionModel.findOne({ where: { token: token } });
  if (!session) {
    return res.status(401).send("Token not recognized");
  }

  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, async (err, user) => {
    if (err) return res.sendStatus(403).send("Invalid token");
    req.userId = user.id;
    next();
  });
}
export async function checkActiveToken(req, res) {
  return res.status(200).send(req.userId);
}
