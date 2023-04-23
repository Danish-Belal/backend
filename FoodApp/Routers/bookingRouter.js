const express = require('express');
const bookingRouter = express.Router();
const {protectRoute} = require('../helper');
const {createSession} = require('../controller/bookingController');
const path = require('path');
const absolutePath = path.join(__dirname, 'public', 'booking.html');


bookingRouter.use(express.static("public"));
bookingRouter.route('/createSession').get(function (req, res) {
  
     res.sendFile(path.join(__dirname, '..', 'public', 'booking.html'));

    
 });
//  bookingRouter.use(protectRoute);
 bookingRouter.route('/createSession').post(createSession);
 
 module.exports = bookingRouter;