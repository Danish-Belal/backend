const express = require('express')
const app = express()

console.log(__dirname);   // its give directory name from root
app.get('/', function (req, res) {
  res.send('Hello World')
})

app.get('/about' , function(req,res){
// res.send("Hello form about");
// suppose we want to give a file so we need to give its full path.

     res.sendFile('./views/about.html' , {root:__dirname});
});


app.get('/aboutus' , (req, res) =>{
     res.redirect('/about')  // redirect to about page
})

//404 page , app.use run always so use it in last , if upper req match it return res and further code do not exectue.
app.use((req , res) =>{
     // let ans = res.status(404);
     // console.log(ans);
     // res.sendFile('./views/404.html' ,{root:__dirname} );

     //chaning.
     res.status(404).sendFile('./views/404.html' , {root:__dirname})
});


app.listen(3000)