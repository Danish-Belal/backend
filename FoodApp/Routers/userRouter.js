const express = require("express");
const userRouter = express.Router();

const {getUser , postUser , updateUser,deleteUser , getuserById , setCookies,getCookies} = require('../controller/userController')
const {protectRoute} = require('../helper')

userRouter
  .route("/")
  .get(protectRoute , getUser)
  .post(postUser)
  .patch(updateUser)
  .delete(deleteUser);

userRouter.route("/setcookies").get(setCookies);

userRouter.route("/getCookies").get(getCookies);

userRouter.route("/:Name").get(getuserById);

// function middleware1(req, res, next) {
//   console.log("Middleware 1 called");
//   next();
// }




   module.exports = userRouter;
