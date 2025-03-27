import "dotenv/config";
import express from "express";
import cors from "cors";
import { connectDB } from "./database/db.js";
import UserRoute from "./routes/auth.route.js";
const app = express();

const PORT = process.env.PORT;

app.use(express.json());
app.use(cors({ origin: process.env.BaseUrl, credentials: true }));

app.use("/api/auth", UserRoute);

app.get("/", (req, res) => {
  res.send("<h1>Hello, Airport API!!!</h1>");
});

app.listen(PORT, (req, res) => {
  console.log("Server is running on http://localhost:" + PORT);
  connectDB();
});
