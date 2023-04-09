const mongooes = require('mongoose');
const {data_link} = require('../secret');


mongooes
  .connect(data_link)
  .then(function (db) {
    console.log("review DB connected");
    // console.log(db);
  })
  .catch(function (err) {
    console.log(err);
  });

const revieSchema =new mongooes.Schema({
     review : {
          type : String ,
          required : [true , 'review is required'],
     },
     rating :{
          type : Number,
          min : 1,
          max : 5,
          required : [true , 'rating is required'],
     },

     createdAt :{
          type : Date,
          default : Date.now(),
     },

     user :{
          type : mongooes.Schema.ObjectId,
          ref : "userModel",
          required :[true , "review must belong to a user"],
     },

     plan :{
          type : mongooes.Schema.ObjectId,
          ref : "planModel",
          required : [true  , "plan must belong to a user"],
     },    
});


// find , findbyid , findone , findoneandupdate
revieSchema.pre(/^find/ , function(next){
     this.populate({
          path : 'user',
          select : "name profileImage"
     }).populate("plan");
     next();
})



const reviewModel  = mongooes.model('Review' , revieSchema);
module.exports = reviewModel;