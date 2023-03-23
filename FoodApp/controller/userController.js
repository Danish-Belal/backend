
const userModel = require('../models/userModel');

module.exports.getUser = async function (req, res) {
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

module.exports.postUser = function (req, res) {
  console.log(req.body.Name);
  // then i can put this into db
  user.push(req.body);
  res.json({
    massage: "Data is recived succesfully",
    user: req.body,
  });
};

module.exports.updateUser = async function (req, res) {
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
};

module.exports.deleteUser = async function (req, res) {
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

module.exports.setCookies = function (req, res) {
  // res.setHeader('Set-Cookie' , 'isLoggedIn  =true');
  res.cookie("isLoggedIn", false, { maxAge: 10000, secure: true });
  res.cookie("password", 12345, { secure: true });
  res.send("Cookies has been set");
};

module.exports.getCookies = function (req, res) {
  let cookie = req.cookies.password;
  console.log(cookie);
  res.send("Cookies recived");
};
