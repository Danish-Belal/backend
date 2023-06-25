const reviewModel = require('../models/reviewModel');
const planModel = require('../models/planModel');

module.exports.getAllReviews =async function(req,res){
     try{
          let allreviews =await reviewModel.find();
          if(allreviews){
               return res.json({
                    msg : "review recived",
                    allreviews,
               });
          }else{
               return res.json({
                    msg : "No review available"
               });
          }
     }
     catch(err){
          res.json({
               msg : err.msg
          });
     }
    
}
module.exports.top3Review =async function(req,res){
     try{
          let top3Reviews =await reviewModel.find().sort({rating : -1}).limit(3)
          if(top3Reviews){
               return res.json({
                    msg : "Top3 reviews are",
                    top3Reviews,
               });
          }
          else{
               return res.json({
                    msg : "revies not found",
               })
          }    
     }
     catch(err){
          res.json({
               msg : err.msg
          })
     }
}

module.exports.getPlanReview =async function(req,res){
     try{
         const planId  = req.params.id;
         let reviews = await reviewModel.find()
         reviews = reviews.filter(review => review.plan["_id"] == planId);
         if(reviews){
          return res.json({
               msg : "reviews retrived",
               reviews,
          });
         }
         else{
          return res.json({
               msg : "reviews not found",
          });
         }
     }
     catch(err){
          res.json({
               msg : err.msg
          })
     }
    

}
module.exports.createReview =async function(req,res){
     try{
          const planId = req.params.plan;
          const plan = await planModel.findById(planId);
          const review = req.body;
          const postReview = await reviewModel.create(review);
          // plan.ratingsAverage =
    //   (plan.ratingsAverage * plan.nor + req.body.rating) / (plan.nor + 1);
    // plan.nor += 1;
    // await plan.save();
          await postReview.save();
          return res.json({
               msg : "review posted",
               postReview,
          })
     }
     catch(err){
          res.status(500).json({
               msg : err.msg
          })
     }

}
module.exports.updateReview =async function(req,res){

     try{
          // let planId = req.params.plan; // which plan's review is being updated
          let id = req.body.id;    // which review need to be updated
          let updatedReview = req.body;
          let keys = [];
          for(let key in updatedReview){
               if(key == id) continue;
               keys.push(key)
          }
         
           // key.include("rating")
        //use review's rating to calculate avg rating and update in plan
          let review = await reviewModel.findById(id);
          for(let i = 0 ; i<keys.length ; i++){
               review[keys[i]] = updatedReview[keys[i]];
          }
          await review.save();
          return res.json({
               msg : "plan updated succesfully",
               review
          })
     }
     catch(err){
          res.json({
               msg : err.msg
          })
     }

}
module.exports.deleteReview =async function(req,res){
     try{
          let planId = req.params.plan;
          let id = req.body.id;
          // change avg rating of plan
          let delReview = await reviewModel.findByIdAndDelete(id);
          return res.json({
               msg : "Review Deleted succesfully",
               delReview,
          })

     }
     catch(err){
          res.json({
               msg : err.msg
          })
     }
}
