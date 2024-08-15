import express from "express";
import "express-async-catch";
import dotenv from "dotenv";
import path from "path";
import cors from "cors";
import userRouter from "./routes/userRoute.js";
import { fileURLToPath } from 'url';
import { dirname } from 'path';

dotenv.config();

const port = process.env.PORT;
const host = process.env.HOST;
const app = express();

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

app.use("/uploads", express.static(path.join(__dirname, "uploads")));
app.use(cors({ origin: "http://localhost:4000" }));
app.use(express.json());
app.use("/user", userRouter);
app.get("/", (req, res) => {
  res.status(200).json({"running": "on port 5000"})
})
app.listen(port, host, (err) => {
  if (err) {
    console.log("server disconnected", err);
  } else {
    console.log(`server connected on port http://${host}:${port}`);
  }
});

export default app;
