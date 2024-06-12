import { UserMapperService } from "../services/userService.mjs";
import { RefreshTokenMapperService } from "../services/refreshTokenService.mjs";
import jwt from "jsonwebtoken";

const userMapperService = new UserMapperService();
const refreshTokenMapperService = new RefreshTokenMapperService();

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
    const nr = await uuidv4();
    if (result) {
      const token = jwt.sign(
        { username: username, uuidv4: nr },
        process.env.ACCESS_TOKEN_SECRET,
        {
          expiresIn: "1h",
        }
      );
      const refreshToken = jwt.sign(
        { username: username, uuidv4: nr },
        process.env.REFRESH_TOKEN_SECRET
      );
      await refreshTokenMapperService.createRefreshToken(refreshToken);
      res.status(200).json({
        message: "User authenticated.",
        token: token,
        refreshToken: refreshToken,
      });
    } else {
      res.status(400).send("Invalid username/password.");
    }
  } catch (error) {
    console.log(error);
    res.status(500).send("No username/password found in the request.");
  }
}
export async function createNewToken(req, res) {
  const refreshToken = req.body.token;
  if (refreshToken == null) return res.sendStatus(401);
  if (!(await refreshTokenMapperService.getRefreshToken(refreshToken))) {
    res.status(400).send("Invalid refresh token.");
    return;
  }
  jwt.verify(
    refreshToken,
    process.env.REFRESH_TOKEN_SECRET,
    async (err, user) => {
      if (err) return res.sendStatus(403);
      const uuid = await uuidv4();
      const token = jwt.sign(
        { username: user.username, uuidv4: uuid },
        process.env.ACCESS_TOKEN_SECRET,
        {
          expiresIn: "1h",
        }
      );
      res.json({ token: token });
    }
  );
}
export async function verifyToken(req, res, next) {
  const token = req.headers.authorization.split(" ")[1];
  if (token == null) return res.sendStatus(401);

  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
    if (err) return res.sendStatus(403).send("Invalid token");
    req.user = user.username;
    next();
  });
}
export async function deleteToken(req, res) {
  const token = req.params.token;
  if (token == null) return res.sendStatus(401);
  if (!(await refreshTokenMapperService.getRefreshToken(token)))
    return res.sendStatus(404);
  try {
    await refreshTokenMapperService.deleteRefreshToken(token);
    res.status(200).send("Token deleted");
  } catch (error) {
    console.log(error);
    res.status(500).send("Error deleting token");
  }
}

async function uuidv4() {
  return "10000000-1000-4000-8000-100000000000".replace(/[018]/g, (c) =>
    (
      +c ^
      (crypto.getRandomValues(new Uint8Array(1))[0] & (15 >> (+c / 4)))
    ).toString(16)
  );
}
