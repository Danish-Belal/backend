const express = require("express");
const userRouter = express.Router();

const {getUser , postUser , updateUser,deleteUser , allUsers} = require('../controller/userController')
const {isAuthorised    ,protectRoute} = require('../helper')
const {signup , login} = require('../controller/authController');
// user's option
userRouter
  .route("/:id")
  .patch(updateUser)
  .delete(deleteUser);

userRouter
  .route('/login')
  .post(login);

userRouter
  .route('/signup')
  .post(signup);



  // profile page
userRouter.use(protectRoute)
userRouter
  .route('/profile')
  .get(getUser)


  // sir code with is not working .
// admin specific function.
// userRouter.use(isAuthorised(['admin']));
// userRouter.route('')
//   .get(getAlluser)


// admin specific function.
userRouter.use(isAuthorised(['admin']));
userRouter
  .route('/')
  .get(allUsers)
  
   

   module.exports = userRouter;
