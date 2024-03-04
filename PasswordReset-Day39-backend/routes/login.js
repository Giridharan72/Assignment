import Express from "express";
import { loginModel, registerModel } from "../db/models.js";
import { v4 } from "uuid";
import bcrypt from "bcrypt";

export const loginRoute = Express.Router();

loginRoute.get("/", (req, res) => {
  res.send("login page");
});

loginRoute.post("/", async (req, res) => {
  let data = req.body;
  try {
    const checkUser = await registerModel.findOne(
      { email: data.email },
      { _id: 0, userName: 1, password: 1, email: 1 }
    );
    if (checkUser) {
      bcrypt.compare(data.password, checkUser.password, async (err, result) => {
        if (!result) {
          res.status(401).send("Invalid Data");
        } else {
          const user = await new loginModel({ ...data, loginId: v4() });
          const newUser = await user.save();
          if (newUser) {
            res.send("");
          }
        }
      });
    }
    else{
        res.status(403).send('Not yet registered')
    }
  } catch (err) {
    console.error(err);
    res.status(401).send("error while user login");
  }
});
