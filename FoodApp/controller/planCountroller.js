const planModel = require('../models/planModel');

module.exports.getAllPlans = async function (req,res){
    
     try{
          let plans = await planModel.find();
          if(plans){
                    res.json({
                    msg:"all plans retrived",
                    data:plans,
               });
          }
          else{
               // return with apt status code
               res.status(404).json({

                    msg : "No plan Availabe"
               })
          }
     }
     catch(err){
          res.json({
               msg:err.msg
          })
     }
}

module.exports.getPlan = async function (req,res){
     try{
          let id = req.params.id;
          let plan =await  planModel.findById(id);
          if(plan){
               return res.json({
                    msg : "plan retrived",
                    data : plan,
               })
          }else{
              return res.status(404).json({
                    msg : "plan not found" 
               });
          }

     }
     catch(err){
          res.json({
               msg:err.msg
          })
     }
}
module.exports.createPlan = async function (req,res){
     try{
          let plan = req.body;
          let createPlan = await planModel.create(plan);
          return res.json({
               msg : "plan created succesfully",
               createPlan
          })

     }
     catch(err){
          res.json({
               msg : err.msg
          });
     }
}
module.exports.updatePlan = async function (req,res){
     try{
          let id = req.params.id;
          console.log("qwerty ->" , id);
          let dataToBeUpdated = req.body;
          let keys = [];
          for(let key in dataToBeUpdated ){
               keys.push(key);
          }
          let plan = await planModel.findById(id);
          for(let i =0 ; i<keys.length ; i++){
               plan[keys[i]] = dataToBeUpdated[keys[i]];
          }
          await plan.save();
          return res.json({
               msg : "plan updated succesfully",
               paln
          });
     }
     catch(err){
          res.json({
               msg : err.msg
          })
     }
}

module.exports.deletePlan = async function (req,res){
     try{
          let id = req.params.id;
          let deletedPlan = await planModel.findByIdAndDelete(id);
          return res.json({
               msg : "paln deleted succesfully",
               deletedPlan,
          });

     }
     catch(err){
          res.json({
               msg : err.msg
          })
     }
     
}

module.exports.top3Plans = async function(req,res){
     try{
          const plans = await planModel.find().sort({ ratingsAverages: -1 }).limit(3);
          return res.json({
              msg: "top3 plans",
              data:plans
          })
     }
     catch(err){
          res.json({
               msg : err.msg
          })
     }
}
