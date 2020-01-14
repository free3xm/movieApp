const { Schema, model } = require("mongoose");

const schema = new Schema({
  upComing: {type: Array}
});

module.exports = model("upComing", schema);
