const express = require("express");
const userRouter = express.Router();

const {getUser , postUser , updateUser,deleteUser , getAlluser} = require('../controller/userController')
const {protectRoute} = require('../helper')

// user's option
userRouter
  .route("/:id")
  .patch(updateUser)
  .delete(deleteUser);


  // profile page
app.use(protectRoute)
userRouter
  .route('/userProfile')
  .get(getUser)


// admin specific function.
app.use(isAuthorised(['admin']));
userRouter.route('')
.get(getAlluser)

   module.exports = userRouter;
