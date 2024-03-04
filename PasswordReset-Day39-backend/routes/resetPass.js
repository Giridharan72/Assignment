import Express from "express";
import { registerModel } from "../db/models.js";
import { userEmail } from "./forgotPassword.js";
import bcrypt from "bcrypt";

export const resetPasswordRoute = Express.Router();

resetPasswordRoute.get("/", (req, res) => {
  console.log(userEmail);
  res.send(userEmail[0]);
});

resetPasswordRoute.post("/", async (req, res) => {
  const payload = req.body.password;
  try {
    const data = await registerModel.find(
      { email: userEmail[0] },
      { _id: 0, email: 1, userName: 1, registerId: 1 }
    );
    bcrypt.hash(payload, 10, async (err, hash) => {
      if (err) {
        res.status(500).send("error while updating password");
      }
      await registerModel.findOneAndUpdate(
        { email: userEmail[0] },
        { ...data, password: hash }
      );
      res.send("password updated");
    });
  } catch (err) {
    res.status(401).send("error occurred");
  }
});
