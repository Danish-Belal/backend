const express = require('express');
const app = express();
app.use(express.json());

let user = {};

app.get('/user' , (req , res) => {
     res.send(user);
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

app.listen(5000);