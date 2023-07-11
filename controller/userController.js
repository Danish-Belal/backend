
const { use } = require("../Routers/userRouter");
const userModel = require("../models/userModel");

module.exports.getUser = async function (req, res) {

  try{
    let id  =req.id;
    let user = await userModel.findById(id);
    res.json({msg:"user Retrived" , user});

  }
  catch(err){
    res.json({
      msg:err.msg
    });
  }
};

// module.exports.postUser = function (req, res) {
//   console.log(req.body.Name);
//   // then i can put this into db
//   user.push(req.body);
//   res.json({
//     massage: "Data is recived succesfully",
//     user: req.body,
//   });
// };

module.exports.updateUser = async function (req, res) {
  console.log(req.body);
  let id = req.params.id;
  let user = await userModel.findById(id);
  let dataToBeUpdated = req.body;

  try{
    if(user){
      const keys = [];  // ['name' , 'email']
      for(let key in dataToBeUpdated){
        key.push(key)
      }
      for(let i =0; i<keys.length ; i++){
        user[keys[i]] = dataToBeUpdated[keys[i]]
        //name=Danish
      }
      console.log("abcd" , user);
      const updatedData = await user.save();
      res.json({
        msg: "Data updated succesfully",
        updatedData,
      });  
    }
    else{
      res.json({
        msg : "User Not Found",
      });
    }
  }
  catch(err){
    res.json({
      massage:err.massage
    })
  } 
};

module.exports.deleteUser = async function (req, res) {
 
  try {
    let id = req.params.id;
    let user = await userModel.findOneAndDelete(id);
    res.json({ msg: "User has been deleted" , user,});
  } 
  catch (err) {
    console.error(err);
    res.status(500).json({ msg: "Server error" });
  }
};

module.exports.getuserById = function (req, res) {
  console.log(req.params.name);
  // let {id} = req.params;
  // let user = db.findOne(id);
  res.json({
    msg: "user id is",
    obj: req.params,
  });
};

module.exports.allUsers = async function(req , res){
  try{
    let allUser = await userModel.find();
    res.json({
      msg:"user id is",
      allUser,
    });
  }
  catch(err){
    res.json({
      msg:err.massage,
    });
  }
};
