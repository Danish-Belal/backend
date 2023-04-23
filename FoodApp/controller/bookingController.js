let SK = "sk_test_51MvSNOSFWRdncai6TrbUlwL04iCd4oMrTyhq0NT2GjrQSfgOUgn45A7r8lEL6Bh2FPMHX9CswDW0fNbSStE58Qi800gQyTV9bW";
const stripe = require('stripe')(SK);
const planModel = require('../models/planModel');
const userModel = require('../models/userModel');

module.exports.createSession = async function(req,res){
     try{
          // let userId = req.id;
          // let planId = req.params.id;

          // const user = await userModel.findById(userId);
          // const plan = await planModel.findById(planId);

          const session = await stripe.checkout.session.create({
               // payment_method_type : ['card'],
               // customer_email : user.email,
               // client_reference_id : plan.id,
               line_items: [
                    {
                      // Provide the exact Price ID (for example, pr_1234) of the product you want to sell
                          name:"HealthyFood101" ,
                         //  description: plan.description,
                         //  ammount: plan.price * 100,
                         amount:"1234",
                         currency: "inr",
                         quantity: 1,
                    
                    },
                  ],
                  mode: "payment",
                  success_url: `${req.protocol}://${req.get("host")}/profile`,
                  cancel_url: `${req.protocol}://${req.get("host")}/profile`,

          });
          // res.json({
          //      msg: "success",
          //      session
          //  });
          res.redirect(303, session.url);
     }
     catch(err){
          res.json({
               msg: err.msg
          })
     }
}