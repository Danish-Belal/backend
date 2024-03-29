const mongooes = require('mongoose');
const {data_link} = require('../secret');
const emailValidator = require('email-validator')
const bcrypt = require('bcrypt')
const { v4: uuidv4 } = require("uuid");

mongooes
  .connect(data_link)
  .then(function (db) {
    console.log("User DB connected");
    // console.log(db);
  })
  .catch(function (err) {
    console.log(err);
  });

// Create schema.
const userSchema = mongooes.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    validate: function(){
      return emailValidator.validate(this.email);
    },
  },
  password: {
    type: String,
    required: true,
    unique: true,
    minLength: 7,
  },
  confirmPassword: {
    type: String,
    // required: true,
    unoque: true,
    minLength: 7,
    validate: function(){
      return this.confirmPassword == this.password;
    },
  },
  role:{
    type : String,
    enum:['admin' , 'user' , 'restaurentowner' , 'deliveryboy'],
    defaul : 'user'
  },
  profileImage :{
    type : String,
    default:'../Images/User.jpg'
  },
  resetToken:String
});

// Hooks .

//For Data posting , work on post data
// userSchema.pre('save' , function(){
//      console.log('Before Saving in db',this);
// });

// userSchema.post('save' , function(doc){
//      console.log('After Saving in db' , doc);
// })

// //for remving data
// userSchema.pre('deleteOne', function() {
//   console.log('Before removing:');
 
// });

// userSchema.post('deleteOne', function(doc) {
//   console.log('After removing:', doc);
  
// });

userSchema.pre('save' , function(){
     this.confirmPassword = undefined;
});

userSchema.pre('save' , async function(){
     let salt = await bcrypt.genSalt();
     console.log(salt);
     let hasedString =await bcrypt.hash(this.password , salt);
     this.password = hasedString;
     console.log(hasedString);
})


userSchema.methods.createResetToken =async  function(){
  const resetToken = uuidv4();
  this.resetToken = resetToken;
  await this.save();
  return resetToken;
};

userSchema.methods.resetPasswordHandler = function (password , confirmPassword){
  this.password = password;
  this.confirmPassword = confirmPassword;
  this.resetToken = undefined;
}
// Models
const userModel = mongooes.model("userModel", userSchema);
module.exports = userModel