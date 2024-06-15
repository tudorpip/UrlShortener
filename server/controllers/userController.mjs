import { UserMapperService } from "../services/userService.mjs";
import { ActiveSessionModel } from "../models/activeSession.mjs";
import jwt from "jsonwebtoken";

const userMapperService = new UserMapperService();

export async function getAllUsers(req, res) {
  const users = await userMapperService.getAllUsers();
  res.status(200).json(users);
}
export async function createUser(req, res) {
  const username = req.body.username;
  const password = req.body.password;
  const email = req.body.email;
  const result = await userMapperService.createUser(username, email, password);
  if (result === false) {
    return res.status(400).json({ error: "Invalid email." });
  }
  res.status(200).json({ result: result });
}
export async function attemptAuthentification(req, res) {
  try {
    const username = req.body.username;
    const password = req.body.password;
    const result = await userMapperService.authenticateUser(username, password);
    const nr = await uuidv4();
    if (result) {
      const token = jwt.sign(
        { username: username, uuidv4: nr },
        process.env.ACCESS_TOKEN_SECRET,
        {
          expiresIn: "1d",
        }
      );
      try {
        ActiveSessionModel.create({
          token: token,
          user: username,
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
    } else {
      res.status(400).send("Invalid username/password.");
    }
  } catch (error) {
    console.log(error);
    res.status(500).send("No username/password found in the request.");
  }
}
export async function getAllActiveSessions(req, res) {
  try {
    const activeSessions = await ActiveSessionModel.findAll();
    res.status(200).json(activeSessions);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Unable to get the active sessions" });
  }
}

export async function verifyToken(req, res, next) {
  const token = req.headers.authorization.split(" ")[1];
  if (token == null) return res.sendStatus(401);
  const session = await ActiveSessionModel.findOne({ where: { token: token } });
  if (!session) {
    return res.status(401).send("Token not recognized");
  }

  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
    if (err) return res.sendStatus(403).send("Invalid token");
    req.user = user.username;
    next();
  });
}

async function uuidv4() {
  return "10000000-1000-4000-8000-100000000000".replace(/[018]/g, (c) =>
    (
      +c ^
      (crypto.getRandomValues(new Uint8Array(1))[0] & (15 >> (+c / 4)))
    ).toString(16)
  );
}
