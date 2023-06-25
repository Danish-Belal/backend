const userModel = require("../models/userModel");
var jwt = require("jsonwebtoken");
const { JWT_KEY } = require('../secret');
const {use} = require('../Routers/userRouter');
const { sendMail } = require("../utility/nodemailer");
console.log("123" , JWT_KEY);

module.exports.signup = async function (req, res) {
  try {
    let data = req.body;

    let user = await userModel.create(data);
    
    if (user) {
     await sendMail('signup' , user);
      res.json({
        msg: "user signed up",
        user,
      });
     
    } else {
      res.json({
        msg: "user could not be signed up",
      });
    }
  } catch (err) {
    res.json({
      err: err.message,
    });
  }
};

module.exports.login = async function (req, res) {
  try {
    let { email, password } = req.body;
    let user = await userModel.findOne({ email: email });
    if (user) {
      // check if password match.
      // bcrypt
      if (password == user.password) {
        let uid = user["_id"];
        var token = jwt.sign({ payload: uid }, JWT_KEY);
        res.cookie("login", token);
        res.json({
          msg: "user logged in",
        });
      } else {
        res.json({
          msg: "wrong Credentials",
        });
      }
    } else {
      res.json({
        msg: "user not found",
      });
    }
  } catch (err) {
    res.json({
      msg: err.message,
    });
  }
};

module.exports.forgetpassword = async function(req,res){
  try{
    let {email} = req.body;
    const user = await userModel.findOne({email:email});
    if(user){
      // reset token 
    
      const resetToken = await user.createResetToken();
      //creating link
      // https://xyz.com/resetpassword/resetToken
      let resetpasswordLink = `${req.protocol}://${req.get('host')}/user/resetpassword/${resetToken}`;
      // send this to user
      // nodemailer
      await sendMail('forgetpassword' , {email,resetpasswordLink});
     res.json({
      mag : "email send succesfully"
     })
    }else{
      res.json({
        msg : "user not found"
      })
    }

  }
  catch(err){
    res.status(500).json({
      msg:err.message
    });    
  }
}

module.exports.resetpassword = async function(req,res){
  try{
      const token = req.params.token;
      console.log("05833", token);
      let {password , confirmpassword} = req.body;
      const user = await userModel.findOne({resetToken : token});
      if(user){
        //resetPasswordHandler will update user in DB
        user.resetPasswordHandler(password , confirmpassword);
        await user.save();
        res.json({
          msg:"Password changed succesfully",
        });
      }
      else{
        res.json({
          msg:"User not found",
        })
      }
  }catch(err){
    res.json({
      msg:err.message
    });
  }
}

module.exports.logout = function(req,res){
  res.cookie('login', ' ' , {maxAge:1});
  res.json({
    msg:"user logged out succesfully"
  })
}