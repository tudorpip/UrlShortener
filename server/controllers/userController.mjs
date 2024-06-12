import { UserMapperService } from "../services/userService.mjs";
import jwt from "jsonwebtoken";

const userMapperService = new UserMapperService();

export async function getAllUsers(req, res) {
  const users = await userMapperService.getAllUsers();
  res.status(200).json(users);
}
export async function createUser(req, res) {
  const username = req.body.username;
  const password = req.body.password;
  const result = await userMapperService.createUser(username, password);
  res.status(200).json({ result: result });
}
export async function attemptAuthentification(req, res) {
  try {
    const username = req.body.username;
    const password = req.body.password;
    const result = await userMapperService.authenticateUser(username, password);
    if (result) {
      const token = jwt.sign(
        { username: username },
        process.env.ACCESS_TOKEN_SECRET,
        {
          expiresIn: "1h",
        }
      );
      res.status(200).json({ message: "User authenticated.", token: token });
    } else {
      res.status(400).send("Invalid username/password.");
    }
  } catch (error) {
    console.log(error);
    res.status(500).send("No username/password found in the request.");
  }
}
export async function verifyToken(req, res, next) {
  const token = req.headers.authorization.split(" ")[1];
  if (token == null) return res.sendStatus(401);

  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
    if (err) return res.sendStatus(403).send("Invalid token");
    req.user = user;
    next();
  });
}
