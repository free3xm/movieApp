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
const ListModel = require("./models/Films");

const lists = ["now_playing", "popular", "top_rated", "upcoming"];

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
async function getData() {
  const res = await ListModel.findOne({listName: "now_playing"});
  console.log(res.list[0].results);
}
getData();
// lists.forEach(elem => updateBd(request, apiUrl, elem, apiKey, 1, ListModel, []))
//  updateBd(request, apiUrl, "top_rated", apiKey, 1, upComing, []);
