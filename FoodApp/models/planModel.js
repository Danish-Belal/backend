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
