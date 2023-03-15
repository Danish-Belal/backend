const express = require("express");
const userRouter = express.Router();
const userModel = require('../models/userModel');

userRouter
  .route("/")
  .get(protectRoute , getUser)
  .post(postUser)
  .patch(updateUser)
  .delete(deleteUser);

userRouter.route("/setcookies").get(setCookies);

userRouter.route("/getCookies").get(getCookies);

userRouter.route("/:Name").get(getuserById);

function middleware1(req, res, next) {
  console.log("Middleware 1 called");
  next();
}

function protectRoute(req , res , next){
     if(req.cookie.isLoggedIn){
          next();
     }else{
          return res.json({
               msg : "Operation not Allowed"
          });
     }
}
async function getUser(req, res) {
  console.log(req.query);
//   let { Name, age } = req.query;
  // let filterdData = user.filter(userObj =>{
  //      return (userObj.Name == Name && userObj.age==age)
  // })
  // res.send(filterdData);

  // res.send(user);
  console.log("getUser called");
  // next();

//   let allUser = await userModel.findOne({ name: "Dani" });
     let allUser = await userModel.find();
  res.json({
    msg: "user Retrive",
    allUser,
  });
}

function postUser(req, res) {
  console.log(req.body.Name);
  // then i can put this into db
  user.push(req.body);
  res.json({
    massage: "Data is recived succesfully",
    user: req.body,
  });
}

async function updateUser(req, res) {
  console.log(req.body);
  let userdataToUpdate = req.body;
  // for(key in userdataToUpdate){
  //      user[key] = userdataToUpdate[key];
  // }
  let doc = await userModel.findOneAndUpdate(
    { email: "danishbe@gmail.com" },
    userdataToUpdate
  );
  console.log(doc);
  res.json({
    massage: "User Data is Updated",
  });
}

async function deleteUser(req, res) {
  // user = {};
  //     let doc = await userModel.findOneAndRemove({ email: "danishbelal@gmail.com" });
  // let doc = await userModel.findOneAndDelete({email:"danishbellasl@gmail.com"})

  try {
    const user = await userModel.deleteOne({ email: "Arbazbali@gmail.com" });
    if (!user) {
      return res.status(404).json({ msg: "User not found" });
    }
    //  const del = await user.remove();
    //  console.log(del);
    res.json({ msg: "User has been deleted" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: "Server error" });
  }
}

function getuserById(req, res) {
  console.log(req.params.name);
  // let {id} = req.params;
  // let user = db.findOne(id);
  res.json({
    msg: "user id is",
    obj: req.params,
  });
}

function setCookies(req , res){
     // res.setHeader('Set-Cookie' , 'isLoggedIn  =true');
     res.cookie('isLoggedIn', false , {maxAge:10000 , secure:true});
     res.cookie('password' , 12345 , {secure:true});
     res.send('Cookies has been set')
   }
   
   function getCookies(req , res){
     let cookie = req.cookies.password;
     console.log(cookie);
     res.send("Cookies recived")
   }


   module.exports = userRouter;
