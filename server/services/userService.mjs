import { ActiveSessionModel } from "../models/activeSession.mjs";
import { UserModel } from "../models/user.mjs";
import { nanoid } from "nanoid";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";

async function createUserHelper(username, email, password) {
  const hashedPassword = await hashPassword(password);
  const user = await UserModel.findOne({ where: { email: email } });
  if (user !== null || !isValidEmail(email)) {
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
async function loginUser(email, password) {
  try {
    console.log("rara1");
    const user = await UserModel.findOne({ where: { email: email } });
    if (!user) {
      throw new Error("User not found");
    }
    const isPasswordMatch = await comparePasswords(password, user.password);
    if (!isPasswordMatch) {
      throw new Error("Incorrect password");
    }
    return true;
  } catch (error) {
    throw error;
  }
}

async function hashPassword(password) {
  const saltRounds = 10;
  return await bcrypt.hash(password, saltRounds);
}
async function comparePasswords(password, hashedPassword) {
  return await bcrypt.compare(password, hashedPassword);
}

function isValidEmail(email) {
  return true;

  //TODO: Implement email validation
  // const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  // return regex.test(email);
}
export async function createUser(req, res) {
  const username = req.body.username;
  const password = req.body.password;
  const email = req.body.email;
  console.log(1);
  const result = await createUserHelper(username, email, password);
  console.log(result);
  if (result === false) {
    return res.status(400).json({ error: "Invalid email/username." });
  }
  res.status(200).json({ result: result });
}

export async function attemptAuthentification(req, res) {
  try {
    const email = req.body.email;
    const password = req.body.password;
    var user;
    try {
      user = await UserModel.findOne({ where: { email: email } });
    } catch (error) {
      console.log("rara1");
      return res.status(400).send("Invalid email/password.");
    }
    var result;
    try {
      result = await loginUser(email, password);
    } catch (error) {
      return res.status(400).send("Invalid email/password.");
    }
    const nr = await uuidv4();
    if (result) {
      const token = jwt.sign(
        { id: user.id, uuidv4: nr },
        process.env.ACCESS_TOKEN_SECRET,
        {
          expiresIn: "1d",
        }
      );
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
async function uuidv4() {
  return "10000000-1000-4000-8000-100000000000".replace(/[018]/g, (c) =>
    (
      +c ^
      (crypto.getRandomValues(new Uint8Array(1))[0] & (15 >> (+c / 4)))
    ).toString(16)
  );
}
