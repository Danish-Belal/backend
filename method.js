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

//with query
app.get('/user' , (req , res) => {
    
     console.log(req.query);
     let {Name , age} = req.query;
     let filterdData = user.filter(userObj =>{
          return (userObj.Name == Name && userObj.age==age)
     })
     res.send(filterdData);
});

app.post('/user' , (req , res) =>{
     console.log(req.body.Name);
     // then i can put this into db
     user = req.body;
     res.json({
          massage : "Data is recived succesfully",
          user : req.body
     });
});

app.patch('/user' , (req , res) =>{
     console.log(req.body);
     let userdataToUpdate = req.body;
     for(key in userdataToUpdate){
          user[key] = userdataToUpdate[key];
     }
     res.json({
          massage : "User Data is Updated"        
     })
})

app.delete('/user' , (req , res) =>{
     user = {};
     res.json({
          massageg :" Data is Deleted"
     })
})


// Parameters.

app.get('/user/:name' , (req , res) =>{
     console.log(req.params.name);
     // let {id} = req.params;
     // let user = db.findOne(id);
     res.json({
          msg:"user id is", "obj":req.params 
     })
});

app.listen(5000);