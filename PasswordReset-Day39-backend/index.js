import Express  from "express";
import cors from "cors";
import { loginRoute } from "./routes/login.js";
import { registerRoute } from "./routes/register.js";
import { forgotRouter } from "./routes/forgotPassword.js";
import { resetPasswordRoute } from "./routes/resetPass.js";
import { connectToDb } from "./db/dbConection.js";
import { urlShortenerRoute } from "./routes/urlShortener.js";
import { reDirectRoute } from "./routes/reDirect.js";
import { urlShortenerModel } from "./db/models.js";

const app = Express();

const port = process.env.PORT || 5012

await connectToDb()



// middleWare

app.use(Express.json())

app.use(cors())

app.use('/login', loginRoute)

app.use('/register', registerRoute)

app.use('/forgotPassword', forgotRouter)

app.use('/resetPassword', resetPasswordRoute)

app.use('/urlShortener', urlShortenerRoute)

app.use('/', reDirectRoute)




app.get('/', (req,res)=>{
    res.send('Url application')
})

app.listen(port, ()=> console.log('Server is running on : ', port))