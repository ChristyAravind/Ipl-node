import express from "express";
import { MongoClient } from "mongodb";
import dotenv from "dotenv";
dotenv.config();
const app = express();

app.use(express.json());

const PORT = process.env.PORT;

const MONGO_URL = process.env.MONGO_URL;

async function createConnection() {
  const client = new MongoClient(MONGO_URL);
  await client.connect();
  console.log("Mongodb is connected✌️");
  return client;
}

const client = await createConnection();

app.get("/", function (req, res) {
  res.send("Hello World!⭐⭐⭐");
});

app.post("/players", async function (req, res) {
  const data = req.body;
  const post = await client
    .db("cricket")
    .collection("players")
    .insertMany(data);
  res.send(post);
});

app.get("/players", async function (req, res) {
  const get = await client
    .db("cricket")
    .collection("players")
    .find({})
    .toArray();
  res.send(get);
});

app.get("/players/:id", async function (req, res) {
  const { id } = req.params;
  const getid = await client
    .db("cricket")
    .collection("players")
    .findOne({ id: id });
  res.send(getid);
});

app.delete("/players/:id", async function (req, res) {
  const { id } = req.params;
  const deleteid = await client
    .db("cricket")
    .collection("players")
    .deleteOne({ id: id });
  res.send(deleteid);
});

app.put("/players/:id", async function (req, res) {
  const { id } = req.params;
  const updateplayer = req.body;
  const putid = await client
    .db("cricket")
    .collection("players")
    .updateOne({ id: id }, { $set: updateplayer });
  res.send(putid);
});

app.listen(PORT, () => {
  console.log(`Server Started ${PORT}`);
});

// const players = [
//   {
//     id: "7",
//     name: "Mahendra Singh Dhoni",
//     team: "Chennai Super Kings",
//     img: "https://images.indianexpress.com/2020/10/148841-clraytzonv-1602133322.jpg",
//   },
//   {
//     id: "45",
//     name: "Rohit Sharma",
//     team: "Mumbai Indians",
//     img: "https://images.indianexpress.com/2021/12/rohit-sharma-mi.jpg",
//   },
//   {
//     id: "18",
//     name: "Virat Kohli",
//     team: "Royal Challengers Bangalore",
//     img: "https://img1.hscicdn.com/image/upload/f_auto/lsci/db/PICTURES/CMS/309400/309456.7.jpg",
//   },
//   {
//     id: "1",
//     name: "KL Rahul",
//     team: "Lucknow Supergiants",
//     img: "https://c.ndtvimg.com/2022-03/gv66jrb4_kl-rahul_625x300_21_March_22.jpg?im=FeatureCrop,algorithm=dnn,width=806,height=605",
//   },
// ];
