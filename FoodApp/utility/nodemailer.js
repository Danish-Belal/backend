// "use strict";
const nodemailer = require("nodemailer");
const {googleAppPassword} = require('../secret')

// async..await is not allowed in global scope, must use a wrapper
module.exports.sendMail = async function (context , user) {
  // Generate test SMTP service account from ethereal.email
  // Only needed if you don't have a real mail account for testing
  console.log("Nodemailer is Called");
  // let testAccount = await nodemailer.createTestAccount();
  try{ 
  // create reusable transporter object using the default SMTP transport
    let transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 587,
      secure: false, // true for 465, false for other ports
      auth: {
        user: 'danishexplore019@gmail.com', // generated ethereal user
        pass: googleAppPassword, // generated ethereal password
      },
    });
    let eSubj="" , eHtml="";
    if(context == 'signup'){
      eSubj = `Thank You 🙌 for signing ${user.name}`;
      eHtml = `
            <h1>Welcome to FoodApp.com
            Hope you have a great experiance!

            Here are your details:
            Name:- ${user.name}
            Email:- ${user.email}

            Thank You!

                                  FoodApp Developer
                                  Danish Belal
            `;
    }else if(context == "forgetpassword"){
      eSubj = `Reset Password`;
      eHtml = `
          <h1>FoodApp.com</h1>
          Here is yout link to reset password : 
            
          ${user.resetpasswordLink}

          Thankyou!

                                    FoodAPp Developer 
                                    Danish Belal

      `;
    }
    // send mail with defined transport object
    let info = await transporter.sendMail({
      from: '"FoodApp 🍴" <danishexplore019@gmail.com>', // sender address
      to: user.email, // list of receivers
      subject: eSubj, // Subject line
      // text: "Hello world?", // plain text body
      html: eHtml, // html body 
    });

    console.log("Message sent: %s", info.messageId);
    // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>

    // Preview only available when sending through an Ethereal account
    // console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
    // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...
  }
  catch(err){
    console.log(err.massage);
  }
}

// main().catch(console.error);
