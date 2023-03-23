var jwt = require("jsonwebtoken");
const {JWT_KEY} = require('./secret')

module.exports.protectRoute = function (req , res , next){
     if(req.cookies.login){
          let token = req.cookies.login;
          let isVerfied = jwt.verify(token , JWT_KEY);
          if(isVerfied) next();
          else{
               req.json({
                    msg:'user not verified'
               })
          }
     }else{
          return res.json({
               msg : "Operation not Allowed"
          });
     }
}

