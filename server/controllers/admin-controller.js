const User = require("../models/user-model");
const Contact = require("../models/contact-model");
const Card = require("../models/card-model"); // Import your Card model
const mongoose = require("mongoose");
const Analytics = require('../models/analytics-model');
//*------------------------------------------
//*User logic
//*------------------------------------------
const getAllUsers = async (req, res) => {
  try {
    const users = await User.find();
    console.log(users);
    if (!users || users.length === 0) {
      return res.status(404).json({ message: "No Users Found" });
    }
    return res.status(200).json(users);
  } catch (error) {
    next(error);
  }
};

//*------------------------------------------
//*User Delete logic
//*------------------------------------------
const deleteUserById = async (req, res) => {
  try {
    const id = req.params.id;
    await User.deleteOne({ _id: id });
    return res.status(200).json({ message: "User deleted Successfully" });
  } catch (error) {
    next(error);
  }
};

//*------------------------------------------
//*Single User logic
//*------------------------------------------
const getUserById = async (req, res) => {
  try {
    const id = req.params.id;
    const data = await User.findOne({ _id: id }, { password: 0 });
    return res.status(200).json(data);
  } catch (error) {
    next(error);
  }
};

//*------------------------------------------
//*User Update logic
//*------------------------------------------
const updateUserById = async (req, res) => {
  try {
    const id = req.params.id;
    const updatedUserData = req.body;

    const updatedData = await User.updateOne(
      { _id: id },
      {
        $set: updatedUserData,
      }
    );
    return res.status(200).json(updatedData);
  } catch (error) {
    next(error);
  }
};

//*------------------------------------------
//*Contacts logic
//*------------------------------------------
const getAllContacts = async (req, res) => {
  try {
    const contacts = await Contact.find();
    console.log(contacts);
    if (!contacts || contacts.length === 0) {
      return res.status(404).json({ message: "No Contacts Found" });
    }
    return res.status(200).json(contacts);
  } catch (error) {
    next(error);
  }
};

//*------------------------------------------
//*Contact Delete logic
//*------------------------------------------
const deleteContactById = async (req, res) => {
  try {
    const id = req.params.id;
    await Contact.deleteOne({ _id: id });
    return res.status(200).json({ message: "Contact deleted Successfully" });
  } catch (error) {
    next(error);
  }
};

//*------------------------------------------
//*Update Card logic
//*------------------------------------------

const updateFeature = async (req, res, next) => {
  try {
    const cards = await Card.find(); // Fetch all cards
    if (!cards || cards.length === 0) {
      return res.status(404).json({ message: "No cards found" });
    }

    const updatedCards = await Promise.all(
      cards.map(async (card) => {
        try {
          const newStock = Math.floor(Math.random() * 500) + 1;
          console.log(`Updating stock for card ID ${card._id}: ${newStock}`);
          const result = await Card.findByIdAndUpdate(
            card._id, // Directly use _id if it works as a string
            { $set: { Stock: newStock } },
            { new: true } // Return the updated document
          );
          return result;
        } catch (updateError) {
          console.error("Error updating card:", updateError);
          return null;
        }
      })
    );

    console.log("Updated Cards:", updatedCards);
    return res
      .status(200)
      .json({ message: "Stock levels updated successfully", updatedCards });
  } catch (error) {
    console.error("Error in updateStockLevels:", error);
    next(error);
  }
};

//*------------------------------------------
//*Analytics logic
//*----------------------------------------
const getAnalyticsData = async (req, res) => {
  try {
    const analyticsData = await Analytics.find();
    if (!analyticsData || analyticsData.length === 0) {
      return res.status(404).json({ message: 'No analytics data found' });
    }

    const summary = analyticsData.map(data => ({
      product_name: data.product_name,
      profit: data.profit,
    }));

    res.status(200).json(summary);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching admin analytics', error });
  }
};

module.exports = {
  getAllUsers,
  getAllContacts,
  deleteUserById,
  getUserById,
  updateUserById,
  deleteContactById,
  updateFeature,
  getAnalyticsData,
};
