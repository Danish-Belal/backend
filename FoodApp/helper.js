var jwt = require("jsonwebtoken");
const useModel = require('./models/userModel')
const {JWT_KEY} = require('./secret')

module.exports.protectRoute = async function (req , res , next){
     if(req.cookies.login){
          let token;
          token = req.cookies.login;
         let payloadObj  = jwt.verify(token , JWT_KEY);
         const user = await userModel.findById(payloadObj.payload);
         req.id = user.id;
         req.role = user.role;
          if(isVerfied) next();
          else{
               req.json({
                    msg:'use not verified'
               })
          }
     }else{
          return res.json({
               msg : "Operation not Allowed"
          });
     }
}

module.exports.isAuthorised = function(roles){
     return function(req , res , next){
          let role = req.role;
          if(roles.include(role)){
               next();
          }
          res.status(401).json({
               msg : "operation not allowed",
          });
     };
};
