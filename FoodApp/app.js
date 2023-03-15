const express = require("express");
const app = express();
const userModel = require('./models/userModel')
const cookieParser = require("cookie-parser")

app.use(express.json());
app.use(cookieParser());
let user = [
  {
    id: 1,
    Name: "Danish",
    age: 22,
  },
  {
    id: 2,
    Name: "Belal",
    age: 20,
  },
  {
    id: 3,
    Name: "Zishan",
    age: 23,
  },
];

// Mounting.

const userRouter = express.Router();
const authRouter = express.Router();
app.use("/user", userRouter);
app.use("/auth", authRouter);

userRouter
  .route("/")
  .get(getUser)
  .post(postUser)
  .patch(updateUser)
  .delete(deleteUser);

userRouter.route('/setCookies').get(setCookies);
userRouter.route('/getCookies').get(getCookies);
userRouter.route("/:Name").get(getuserById);

authRouter.route("/signup").get(getSignup).post(postSignup);

function middleware1(req, res, next) {
  console.log("Middleware 1 called");
  next();
}

// function middleware2(req , res){
//      console.log("Middleware2 is called");

//      res.json({msg:"user returned"});
// }

async function getUser(req, res) {
  console.log(req.query);
  let { Name, age } = req.query;
  // let filterdData = user.filter(userObj =>{
  //      return (userObj.Name == Name && userObj.age==age)
  // })
  // res.send(filterdData);

  // res.send(user);
  console.log("getUser called");
  // next();

  let allUser = await userModel.findOne({ name: "Dani" });
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
     const user = await userModel.deleteOne({ email:"Arbazbali@gmail.com" });
     if (!user) {
       return res.status(404).json({ msg: 'User not found' });
     }
    //  const del = await user.remove();
    //  console.log(del);
     res.json({ msg: 'User has been deleted' });
   } catch (err) {
     console.error(err);
     res.status(500).json({ msg: 'Server error' });
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

function getSignup(req, res) {
  res.sendFile("/public/index.html", { root: __dirname });
}

async function postSignup(req, res) {
  try {
    let data = req.body;
    console.log('in postsignup')
      let user = await userModel.create(data);
      console.log(data);
      res.json({
          msg: "user signed up",
          user
      })
  }
  catch (err) {
      res.json({
          err:err.message
      })
  }
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
app.listen(5000);


// for checking purpose
// (async function createuser(req , res){
//      let user = {
//           name : "Belal",
//           email: "danishbelal@gmail.com",
//           password:"1234445678",
//           confirmPassword:"1234445678"
//      }
//      let data = await userModel.create(user);
//      console.log(data);
// })();