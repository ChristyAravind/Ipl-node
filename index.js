import express from "express";
import { MongoClient } from "mongodb";
import { playerRouter } from "./routers/players.js";
import { usersRouter } from "./routers/users.js";
import cors from "cors";
import dotenv from "dotenv";
dotenv.config();
const app = express();

app.use(express.json());

app.use(cors());

app.use("/animelist", playerRouter);

app.use("/users", usersRouter);

const PORT = process.env.PORT;

const MONGO_URL = process.env.MONGO_URL;

async function createConnection() {
  const client = new MongoClient(MONGO_URL);
  await client.connect();
  console.log("Mongodb is connected✌️");
  return client;
}

export const client = await createConnection();

app.get("/", function (req, res) {
  res.send("Hello World!⭐⭐⭐");
});

app.listen(PORT, () => {
  console.log(`Server Started ${PORT}`);
});
