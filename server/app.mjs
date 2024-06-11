import express from "express";
import cors from "cors";
import urlRoutes from "./routes/urlRoutes.mjs";
import { UrlMapperService } from "./services/urlService.mjs"; // Adjust the import path as necessary
import { initDatabase, syncDatabase } from "./db/connectDb.mjs";
import serverless from "serverless-http"; // Assuming you're using serverless-http for AWS Lambda or similar

const app = express(); // Assuming UrlMapperService is defined elsewhere and used here
app.use(express.json());

app.use(cors());

app.use(urlRoutes);

app.listen(8080, () => {
  console.log(
    "Server is running on port 8080. Check the app on http://localhost:8080"
  );
});

export const handler = serverless(app);
