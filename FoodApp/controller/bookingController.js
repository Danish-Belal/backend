let SK = "sk_test_51MvSNOSFWRdncai6TrbUlwL04iCd4oMrTyhq0NT2GjrQSfgOUgn45A7r8lEL6Bh2FPMHX9CswDW0fNbSStE58Qi800gQyTV9bW";
// let SK = "sk_test_pL1X84CZrOSOYRkyyvKuCwR000a36t5jwK"
const stripe = require('stripe')(SK);
const planModel = require('../models/planModel');
const userModel = require('../models/userModel');

module.exports.createSession = async function (req, res) {
     try {
         // let userId = req.id;
         // let planId = req.params.id;
 
         // const user = await userModel.findById(userId);
         // const plan = await planModel.findById(planId);
 
         const session = await stripe.checkout.sessions.create({
          // Need to mention few keys explicitly  
          payment_method_types: ["card"],
         //   customer_email: user.email,
         //   client_reference_id: plan.id,
         line_items: [
          {
              quantity: 1,
              price_data: {
                  currency: "inr",
                  unit_amount: 20 * 100,
                  product_data: {
                      description: "My Testing PLan Desc.",
                      name: "My Testing PLan"
                  },
              }
          },
      ],
           mode: "payment",
           success_url: `${req.protocol}://${req.get("host")}/profile`,
           cancel_url: `${req.protocol}://${req.get("host")}/profile`,
         });
         res.json({
             msg: "success",
             session
         });
         res.redirect(303, session.url);
     }
     catch (err) {
         res.json({
             err:err.message
         })
     }
 }