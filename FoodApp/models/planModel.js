const mongooes = require('mongoose');
const {data_link} = require('../secret');


mongooes
  .connect(data_link)
  .then(function (db) {
    console.log("db connected");
    // console.log(db);
  })
  .catch(function (err) {
    console.log(err);
  });

  const planSchem = mongooes.Schema({
    name : {
      type:String,
      require:true,
      unique : true,
      maxLength: [20, `Plan name should not exceed 20 characters`]
    },
    duration :{
      type:Number,
      required : true
    },
    price:{
      type:Number,
      required:[true , 'price not entered']
    },
    discount:{
      type:Number,
      validate:[function(){
        return this.discount < 100
      }, `discount cannot be 100%`]
    },
    ratingsAverages :{
      type:Number
    }
  });

  const planModel = mongooes.model("planModel" , planSchem);
  module.exports = planModel;

  (async function createPlan(){
    let plan = {
      name: "Strict diet",
      duration :30,
      price:9000,
      ratingsAverages : 4.8,
      discount:15
    }

  
    let data = await planModel.create(plan);
    console.log(data);
    // const doc = new planModel(plan);
    // await doc.save();
  })();
