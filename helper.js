import client from "./index.js";

export async function getAllplayers() {
  return await client.db("cricket").collection("players").find({}).toArray();
}

export async function updatePlayersbyid(id, updateplayer) {
  return await client
    .db("cricket")
    .collection("players")
    .updateOne({ _id: id }, { $set: updateplayer });
}

export async function deletePlayersbyid(id) {
  return await client
    .db("cricket")
    .collection("players")
    .deleteOne({ _id: id });
}

export async function getPlayersbyid(id) {
  return await client.db("cricket").collection("players").findOne({ _id: id });
}

export async function createPlayers(data) {
  return await client.db("cricket").collection("players").insertMany(data);
}

export async function createUser(data) {
  return await client.db("cricket").collection("players").insertOne(data);
}

export async function getUserByName(username) {
  return await client
    .db("cricket")
    .collection("players")
    .findOne({ username: username });
}
