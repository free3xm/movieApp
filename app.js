const express = require("express");
const config = require("config");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const fetch = require("node-fetch");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use("/api/movies", require("./routes/list.routes"));
app.use("/api/auth", require("./routes/auth.routes"));

const port = config.get("port") || 5000;
const apiKey = config.get("apiKey");
const apiUrl = config.get("apiUrl");
const mongoUri = config.get("mongoUri");

const updateBd = require("./utilites/updateBd");
const ListModel = require("./models/MoviesLists");
const updateMovieBd = require("./utilites/updateMoviesBd");
const MovieModel = require("./models/Movie");

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
  const resLists = await Promise.all(
    lists.map(async e => await ListModel.findOne({ listName: e }))
  );
  // for (let itemList of resLists) {
  //   for (let list of itemList.list) {
  //     for (let item of list.results) {
  //       if (item) await updateMovieBd(apiUrl, item.id, apiKey, MovieModel);
  //     }
  //   }
  // }
  resLists.forEach(e =>
    e.list.forEach(e => {
      e.results.map(async e => {
        if (e) return await updateMovieBd(apiUrl, e.id, apiKey, MovieModel);
      });
    })
  );
}
// getData();
// lists.forEach(elem => updateBd(apiUrl, elem, apiKey, 1, ListModel, []));
