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
    <!DOCTYPE html>
    <html>
      <head>
        <style>
          body {
            font-family: Arial, sans-serif;
          }
          
          h1 {
            color: #333;
          }
          
          .container {
            max-width: 600px;
            margin: 0 auto;
            padding: 20px;
            border: 1px solid #ccc;
            border-radius: 5px;
            background-color: #f9f9f9;
          }
          
          .details {
            margin-bottom: 20px;
          }
          
          .bold {
            font-weight: bold;
          }
        </style>
      </head>
      <body>
        <div class="container">
          <h1>Welcome to FoodApp.com</h1>
          <p>Hope you have a great experience!</p>
          
          <div class="details">
            <p class="bold">Here are your details:</p>
            <p><span class="bold">Name:</span> ${user.name}</p>
            <p><span class="bold">Email:</span> ${user.email}</p>
          </div>
          
          <p>Thank You!</p>
          
          <p>
            FoodApp Developer<br />
            Danish Belal
          </p>
        </div>
      </body>
    </html>
  `;
    }else if(context == "forgetpassword"){
      eSubj = `Reset Password`;
      eHtml = `
      <!DOCTYPE html>
      <html>
        <head>
          <style>
            body {
              font-family: Arial, sans-serif;
            }
            
            h1 {
              color: #333;
            }
            
            .container {
              max-width: 600px;
              margin: 0 auto;
              padding: 20px;
              border: 1px solid #ccc;
              border-radius: 5px;
              background-color: #f9f9f9;
            }
            
            .reset-link {
              margin-bottom: 20px;
            }
          </style>
        </head>
        <body>
          <div class="container">
            <h1>FoodApp.com</h1>
            <p>Here is your link to reset your password:</p>
            
            <div class="reset-link">
              <a href="${user.resetpasswordLink}">${user.resetpasswordLink}</a>
            </div>
            
            <p>Thank you!</p>
            
            <p>
              FoodApp Developer<br />
              Danish Belal
            </p>
          </div>
        </body>
      </html>
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
