const express = require('express')
const app = express();

const cookieParser = require("cookie-parser")
const userRouter = require('./Routers/userRouter')
const authRouter = require('./Routers/authRouter')
app.use(express.json());
app.use(cookieParser());



app.use("/user", userRouter);
app.use("/auth", authRouter);

const planModel = require("./models/planModel")
app.listen(5000);

