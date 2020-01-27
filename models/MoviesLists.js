const { Schema, model } = require("mongoose");

const schema = new Schema({
  listName: { type: String },
  list: {type : Object}

});

module.exports = model("List", schema);
