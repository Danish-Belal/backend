// creating server with node.js
// http module.

const http = require("http");
const server = http.createServer((req, res) => {
  console.log("Request from browser to server");
  // console.log('123' , req);
  // console.log(req.method);
  // console.log(req.url);
  res.setHeader("Content-Type", "text/html");
  res.write("<h1>Hello World</h1>");
  res.end("Done");
});

// port number , host
server.listen(3000, "localhost", () => {
  console.log("Server is listinig on port 3000");
});
