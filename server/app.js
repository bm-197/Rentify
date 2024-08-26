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
app.use(cors({
  origin: "*",
  credentials: true,
  allowedHeaders: ['Authorization', 'Content-Type'],
}));
app.use(express.json({ limit: '10mb' }));
app.use("/user", userRouter);


app.listen(port, host, (err) => {
  if (err) {
    console.log("server disconnected", err);
  } else {
    console.log(`server connected on port http://${host}:${port}`);
  }
});

export default app;
