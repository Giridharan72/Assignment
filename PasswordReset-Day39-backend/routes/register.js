import Express from "express";
import { registerModel } from "../db/models.js";
import { v4 } from "uuid";
import bcrypt from "bcrypt";


export const registerRoute = Express.Router();

registerRoute.get("/", (req, res) => {
  res.send("register page");
});

registerRoute.post("/", async (req, res) => {
  let data = req.body;
  try {
    const allUser = await registerModel.findOne(
      { email: data.email },
      { _id: 0, userName: 1, email: 1, password: 1 }
    );
    if (allUser) {
      res.status(409).send("user already registered");
      return;
    }
    bcrypt.hash(data.password, 10, async (err, hash) => {
      if (err) {
        res.status(500).send("error in registering");
        return;
      }
      const user = await new registerModel({
        ...data,
        registerId: v4(),
        password: hash,
      });
      const newUser = await user.save();
      if (newUser) {
        res.send("User register successfully");
      }
    });
    
  } catch (err) {
    console.error(err);
    res.send("error while user login");
  }
});


registerRoute.get('/:email', async(req,res)=>{
    const {email} = req.params
    try{
        const user = await registerModel.findOne({email}, {_id : 0, userName : 1, email : 1})
        if(user){
            res.send(user)
        }
    }catch(err){
        res.status(500).send('Error while getting user')
    }
    
})
