const { Schema, model } = require("mongoose");

const cardSchema = new Schema({
  Name: { type: String, required: true },
  Market_Price: { type: Number, required: true },
  Stock: { type: Number, required: true },
  No_of_Reviewers: { type: Number, required: true },
  Pieces_sold: { type: Number, required: true },
  Gender: { type: Number, required: true },
  Feature: { type: String, required: true },
  Material: { type: String, required: true },
  Color: { type: String, required: true },
});

const Card = new model("Card", cardSchema);

module.exports = Card;
