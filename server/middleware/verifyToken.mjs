import { ActiveSessionModel } from "../models/activeSession.mjs";
import jwt from "jsonwebtoken";
export async function verifyToken(req, res, next) {
  const token = req.headers.authorization.split(" ")[1];
  if (token == null) return res.sendStatus(401);
  const session = await ActiveSessionModel.findOne({
    where: { token: token },
  }).catch((err) => {
    console.error(err);
    return null;
  });
  if (!session) {
    return res.status(401).send("Token not recognized");
  }

  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, async (err, user) => {
    if (err) return res.sendStatus(401).send("Invalid token");
    req.userId = user.id;
    next();
  });
}
