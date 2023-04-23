const express = require('express');
const bookingRouter = express.Router();
const {protectRoute} = require('../helper');
const {createSession} = require('../controller/bookingController');

bookingRouter.route('/createSession').get(function (req, res) {
     res.sendFile("C:\Users\Danish Belal\Desktop\Danish Belal\Backend\backend\FoodApp\public\booking.html");
 });
 bookingRouter.use(protectRoute);
 bookingRouter.route('/createSession').post(createSession);
 
 module.exports = bookingRouter;