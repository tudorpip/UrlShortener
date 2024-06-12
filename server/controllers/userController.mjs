import { UserMapperService } from "../services/userService.mjs";
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
    if (result) res.status(200).send("User authenticated.");
    else {
      res.status(400).send("Invalid username/password.");
    }
  } catch (error) {
    console.log(error);
    res.status(500).send("No username/password found in the request.");
  }
}
