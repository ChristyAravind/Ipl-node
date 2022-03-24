import express from "express";
import {
  createPlayers,
  getAllplayers,
  getPlayersbyid,
  deletePlayersbyid,
  updatePlayersbyid,
} from "../helper.js";
import { auth } from "../middleware/auth.js";

const router = express.Router();

router.post("/players", async function (req, res) {
  const data = req.body;
  const post = await createPlayers(data);
  res.send(post);
});

router.get("/players", auth, async function (req, res) {
  const get = await getAllplayers();
  res.send(get);
});

router.get("/players/:id", async function (request, response) {
  const { id } = request.params;
  console.log(id);
  const player = await getPlayersbyid(id);

  player
    ? response.send(player)
    : response.status(404).send({ message: "No such player found" });
});

router.delete("/players/:id", async function (req, res) {
  const { id } = req.params;
  const deleteid = await deletePlayersbyid(id);
  res.send(deleteid);
});

router.put("/players/:id", async function (req, res) {
  const { id } = req.params;
  const updateplayer = req.body;
  const putid = await updatePlayersbyid(id, updateplayer);
  res.send(putid);
});

export const playerRouter = router;
