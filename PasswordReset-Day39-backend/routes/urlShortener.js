import Express from "express";
import { urlShortenerModel } from "../db/models.js";
import { v4 } from "uuid";
import { nanoid } from "nanoid";

export const urlShortenerRoute = Express.Router();

urlShortenerRoute.get("/", async (req, res) => {
  try {
    const allUrl = await urlShortenerModel.find({}, { _id: 0, shortUrl: 1, visited : 1 });
    res.send(allUrl);
  } catch (err) {
    console.log(err);
    res.status(401).send("error");
  }
});

urlShortenerRoute.post("/", async (req, res) => {
  const payload = req.body;
  try {
    const shortUrl = nanoid(15);
    const newUrl = await urlShortenerModel.create({
      ...payload,
      urlId: v4(),
      shortUrl: shortUrl,
      visited : []
    });
    if (newUrl) {
      res.send(newUrl);
    } else {
      res.status(500).send("Error while creating url");
    }
  } catch (err) {
    console.log(err);
    res.status(401).send(err);
  }
});

