import Express from "express";
import { registerModel } from "../db/models.js";
import { mailOptions, transporter } from "./mail.js";
import  jwt from "jsonwebtoken";

export const forgotRouter = Express.Router();

forgotRouter.get("/", (req, res) => {
  res.send("forgot password");
});
export let userEmail = []
forgotRouter.post("/", async (req, res) => {
  const payload = req.body.email;
  userEmail = []
  userEmail.push(payload)
  try {
    const checkUser = await registerModel.findOne({ email: payload });
    if (checkUser) {
        const verifyToken = jwt.sign({email : payload}, process.env.JWT_SECRET, {expiresIn : '5m'})
        const link = `${process.env.FE_URL}/resetPassword?verify=${verifyToken}`
      await transporter.sendMail({...mailOptions,to: payload ,text : `Hi please conform your email and click the link to verify you : ${link}`});
      res.send("valid user");
    } else {
      res.status(401).send("invalid user");
    }
  } catch (err) {
    res.status(500).send("Error while checking user");
  }
});
