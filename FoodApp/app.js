const express = require('express');
const app = express();
app.use(express.json());

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


function getUser(req , res){   
     console.log(req.query);
     let {Name , age} = req.query;
     // let filterdData = user.filter(userObj =>{
     //      return (userObj.Name == Name && userObj.age==age)
     // })
     // res.send(filterdData);

     res.send(user);

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

function getuserById(req, res){
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

function postSignup(req , res){
     let {email , name , password} = req.body;
     console.log(req.body);
     res.json({
          msg:"user Signed up",
          email,
          name , 
          password
     })
}
app.listen(5000);