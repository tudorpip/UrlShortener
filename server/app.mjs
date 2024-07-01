import express from "express";
import urlRoutes from "./routes/urlRoutes.mjs";
import cors from "cors";
import {
  initDatabase,
  syncDatabase,
  connectToDatabase,
  dropDatabase,
} from "./db/connectDb.mjs";
import serverless from "serverless-http";
import userRoutes from "./routes/userRoutes.mjs";
const app = express();
app.use(cors());
app.use(express.json());
const sequelize = connectToDatabase();
initDatabase(sequelize);
syncDatabase(sequelize);

app.use(urlRoutes);
app.use("/user", userRoutes);
app.listen(8080, () => {
  console.log(
    "Server is running on port 8080. Check the app on http://localhost:8080"
  );
});

export const handler = serverless(app);
