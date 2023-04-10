const express = require('express')
const app = express();

const cookieParser = require("cookie-parser")
const userRouter = require('./Routers/userRouter')
const planRouter = require('./Routers/planRouter');
const reviewRouter = require('./Routers/reviewRouter');

app.use(express.json());
app.use(cookieParser());



app.use("/user", userRouter);
app.use("/plan" , planRouter);
app.use("/review" , reviewRouter);


app.listen(5000);

