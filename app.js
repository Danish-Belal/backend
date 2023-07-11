const express = require('express')
const cookieParser = require("cookie-parser")
const app = express();
var cors = require('cors')
app.use(cors())
app.use(express.static('public/build'));
app.use(express.json());
app.use(cookieParser());

// app.options('*', cors()) // To allow preflight

const userRouter = require('./Routers/userRouter')
const planRouter = require('./Routers/planRouter');
const reviewRouter = require('./Routers/reviewRouter');
const bookingRouter = require('./Routers/bookingRouter');





app.use("/user", userRouter);
app.use("/plans" , planRouter);
app.use("/review" , reviewRouter);
app.use('/booking', bookingRouter);


const PORT = process.env.PORT || 5000
app.listen(PORT);

