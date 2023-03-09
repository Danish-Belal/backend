// creating server with node.js
// http module.

const http = require("http");
const fs = require('fs');
const _= require('lodash');
const server = http.createServer((req , res) =>{
  console.log("Request form browser to server");
  // console.log(req.url);
  // console.log(req.method);
  res.setHeader('Content-Type' , 'text/html');
  

  let greet = _.once(() =>{
    console.log("Hello How Are you");
  });
  
  greet();   // only once execute.
  greet();
  
  let path = './views';
  switch(req.url){
    case '/':
      path += '/index.html';
      res.statusCode = 200;
      break;
    case '/about':
      path +="/about.html";
      res.statusCode = 200;
      break;
    case '/aboutUs':
      res.statusCode = 301;
      res.setHeader('Location' , '/about');
      res.end();
      break;
    default:
      path += "/404.html"
      res.statusCode = 400;
  }
  fs.readFile(path, (err , file) =>{
    if(err) {
        console.log(err);
    }else{
      res.write(file);
      res.end();
    }
  })
});

// port no , host name , cb
server.listen(3000,'localhost' , ()=>{
  console.log("Server is running on port 3000");
});
