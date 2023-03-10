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
app.use('/user' , userRouter);

userRouter
     .route("/")
     .get(getUser)
     .post(postUser)
     .patch(updateUser)
     .delete(deleteUser)

userRouter
     .route("/:Name")
     .get(getuserById)

//with query
// app.get('/user' , );

// app.post('/user' , (req , res) =>{
   
// });

// app.patch('/user' , (req , res) =>{
   
// })

// app.delete('/user' , (req , res) =>{
//      user = {};
//      res.json({
//           massageg :" Data is Deleted"
//      })
// })


// Parameters.

// app.get('/user/:name' , (req , res) =>{
     
// });

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
     })
}
app.listen(5000);