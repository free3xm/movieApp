const express = require("express");
const config = require("config");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const request = require("request");

const app = express();
const port = config.get("port") || 5000;
const apiKey = config.get("apiKey");
const apiUrl = config.get("apiUrl");
const mongoUri = config.get("mongoUri");

const updateBd = require("./utilites/updateBd");
const upComing = require("./models/Films");

const lists = []

async function connectMongo() {
  try {
    await mongoose.connect(mongoUri, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });
    app.listen(port, () =>
      console.log(`Server has been started on port ${port}`)
    );
  } catch (error) {
    console.log(error);
  }
}
connectMongo();

//  updateBd(request, apiUrl, "top_rated", apiKey, 1, upComing, []);

// sendRequest()
// const res = updateBd(request, apiUrl, "top_rated", apiKey, 1);


// request.get(`https://api.themoviedb.org/3/movie/157336?api_key=${apiKey}`, (err, res, body) => {
//     console.log(body)
// });
