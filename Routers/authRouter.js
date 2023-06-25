const express = require("express");
const { model } = require("mongoose");
const authRouter = express.Router();
const userModel = require("../models/userModel");

var jwt = require('jsonwebtoken');
const {JWT_KEY} = require('../helper')
//'zdsfxcg234w5e6cg' 
// authRouter
//      .route("/signup")
//      .get(getSignup)
//      .post(postSignup);

// authRouter
//      .route('/login')
//      .post(loginUser);

 

module.exports = authRouter;