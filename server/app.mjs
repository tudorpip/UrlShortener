import express from "express";
import cors from "cors";
import urlRoutes from "./routes/urlRoutes.mjs";
import { UrlMapperService } from "./services/urlService.mjs";
import { initDatabase, syncDatabase } from "./db/connectDb.mjs";
import serverless from "serverless-http";
import userRoutes from "./routes/userRoutes.mjs";
const app = express();
app.use(express.json());

app.use(cors());

app.use(urlRoutes);
app.use("/user", userRoutes);

app.listen(8080, () => {
  console.log(
    "Server is running on port 8080. Check the app on http://localhost:8080"
  );
});

export const handler = serverless(app);
