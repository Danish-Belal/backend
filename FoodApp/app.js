const express = require('express');
const app = express();
app.use(express.json());

// MongoDB
const mongooes = require('mongoose');
const {data_link} = require('./secret')
console.log(data_link);

let user = [
     {
          id :1,
          Name:"Danish",
          age:22

     },
     {
          id :2,
          Name:"Belal",
          age:20

     },
     {
          id :3,
          Name:"Zishan",
          age:23

     },
];

// Mounting.

const userRouter = express.Router();
const authRouter = express.Router();
app.use('/user' , userRouter);
app.use('/auth' , authRouter);

userRouter
     .route("/")
     .get(getUser)
     .post(postUser)
     .patch(updateUser)
     .delete(deleteUser)


userRouter.route("/:Name").get(getuserById);

authRouter.route('/signup').get(getSignup).post(postSignup)

function middleware1(req , res , next){
     console.log("Middleware 1 called");
     next();
}

// function middleware2(req , res){
//      console.log("Middleware2 is called");

//      res.json({msg:"user returned"});
// }

async function getUser(req , res ){   
     console.log(req.query);
     let {Name , age} = req.query;
     // let filterdData = user.filter(userObj =>{
     //      return (userObj.Name == Name && userObj.age==age)
     // })
     // res.send(filterdData);

     // res.send(user);  
     console.log("getUser called");
     // next();

     let allUser = await userModel.findOne({name:"Dani"});
     res.json({
          msg : "user Retrive" , allUser
     });
}

function postUser(req  ,res){
     console.log(req.body.Name);
     // then i can put this into db
     user.push(req.body);
     res.json({
          massage : "Data is recived succesfully",
          user : req.body
     });
}

function updateUser(req , res){
     console.log(req.body);
     let userdataToUpdate = req.body;
     for(key in userdataToUpdate){
          user[key] = userdataToUpdate[key];
     }
     res.json({
          massage : "User Data is Updated"        
     })
}

function deleteUser(req , res){
     user = {};
     res.json({
         msg: "user has been deleted"
     });
}

function getuserById(req, res ){
     console.log(req.params.name);
     // let {id} = req.params;
     // let user = db.findOne(id);
     res.json({
          msg:"user id is", "obj":req.params
     });
     

     
}

function getSignup(req,res){
     res.sendFile("/public/index.html" , {root: __dirname});
}

async function postSignup(req , res){
     // let {email , name , password} = req.body;
     try{
          let data = req.body;
          let user = await userModel.create(data);
          console.log(data);

          res.json({
               msg:"user Signed Up",
               user
          })
     }

     catch(err){
          res.json({
               err:err.massage
          })
     }
}
app.listen(5000);

mongooes.connect(data_link)
     .then(function (db){
          console.log("db connected");
          // console.log(db);
     })
     .catch(function (err){
          console.log(err);
     })

     // Create schema.
     const userSchema = ({
          name:{
               type : String,
               required : true,
          },
          email:{
               type:String,
               required:true,
               unique : true
          },
          password:{
               type:String,
               required:true,
               unique : true,
               minLength:7,
          },
          confirmPassword:{
               type:String,
               required:true,
               unoque : true,
               minLength:7,
          },
         
     });

     // Models
     const userModel = mongooes.model("userModel" , userSchema);

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
