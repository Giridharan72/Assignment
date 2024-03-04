import Express from "express";
import { urlShortenerModel } from "../db/models.js";

export const reDirectRoute = Express.Router();

reDirectRoute.get('/:link', async(req,res)=>{
    const { link } = req.params;
    try {
      const originalUrl = await urlShortenerModel.findOneAndUpdate(
        { shortUrl: link },
        { $push : {
            visited : Date.now()
        } }
      )
      const visitLength = await urlShortenerModel.findOne({ shortUrl : link},{_id : 0, visited : 1})
      if (originalUrl) {
        res.redirect(originalUrl.longUrl);
      } else {
        res.send("Could not get original url");
      }
    } catch (err) {
      console.error(err);
      res.status(400).send("Error while getting url");
    }
})
