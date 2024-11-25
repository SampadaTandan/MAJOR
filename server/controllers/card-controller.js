const Card = require("../models/card-model");

const cards = async (req, res) => {
  try {
    const response = await Card.find();
    if (!response) {
      //Handle the case where no document was found
      res.status(404).json({ msg: "No cards found" });
      return;
    }
    return res.status(200).json({ msg: "Card found", data: response });
  } catch (error) {
    console.log("error from the server ${error}");
  }
};

module.exports = cards;

