import { ActiveSessionModel } from "../models/activeSession.mjs";
import { UserModel } from "../models/user.mjs";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";

export async function register(req, res) {
  const username = req.body.username;
  const password = req.body.password;
  const email = req.body.email;
  console.log(1);

  const hashedPassword = await bcrypt.hash(password, 10);
  const user = await UserModel.findOne({ where: { email: email } });

  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const passwordRegex = /^(?=.*[A-Z])(?=.*\d).{8,}$/;
  const isValidEmail = regex.test(email);
  const isValidPassword = passwordRegex.test(password);

  if (user !== null) {
    console.log(2);
    return res.status(400).json({ error: "Unable to create account" });
  }
  if (username === "") {
    return res.status(400).json({ error: "Unable to create account" });
  }
  if (!isValidEmail) {
    return res.status(400).json({ error: "Invalid email format" });
  }
  if (!isValidPassword) {
    console.log(2);
    return res.status(400).json({ error: "Invalid password format" });
  }
  console.log(3);
  console.log(username, hashedPassword);
  const registeredUser = await UserModel.create({
    username: username,
    email: email,
    password: hashedPassword,
  }).catch((error) => {
    return res.status(500);
  });
  const userObject = registeredUser.toJSON();
  delete userObject.password;
  const result = userObject;
  console.log(result);
  if (result === null) {
    return res.status(500).json({ error: "Unable to create account" });
  }
  return res.status(200).json({ result: result });
}
export async function logout(req, res) {
  const token = req.headers.authorization.split(" ")[1];
  const session = await ActiveSessionModel.findOne({
    where: { token: token },
  });
  if (session) {
    await session.destroy();
    return res.sendStatus(200);
  } else {
    return res.sendStatus(401);
  }
}

export async function login(req, res) {
  const email = req.body.email;
  const password = req.body.password;
  if (email === "" || password === "") {
    return res.status(400).send("Invalid email/password.");
  }
  console.log("rara1");
  const user = await UserModel.findOne({ where: { email: email } }).catch(
    (err) => {
      return res.status(500).send("Something went wrong");
    }
  );
  if (!user) {
    return res.status(400).send("Invalid email/password.");
  }
  const isPasswordMatch = await bcrypt.compare(password, user.password);
  if (!isPasswordMatch) {
    return res.status(400).send("Invalid email/password.");
  }
  if (user) {
    const token = jwt.sign({ id: user.id }, process.env.ACCESS_TOKEN_SECRET, {
      expiresIn: "1d",
    });
    ActiveSessionModel.create({
      token: token,
      userId: user.id,
    }).catch((err) => {
      return res.status(500).json({ error: "Unable to create active session" });
    });
    return res.status(200).json({
      message: "User authenticated.",
      token: token,
    });
  }
}

export async function checkActiveToken(req, res) {
  return res.status(200).send(req.userId);
}
