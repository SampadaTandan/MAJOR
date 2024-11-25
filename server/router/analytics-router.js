const express = require("express");
const router = express.Router();

// Sample analytics data
// Replace this with actual logic to fetch data from your database
const analyticsData = [
  { Name: "Product A", Profit: 1000 },
  { Name: "Product B", Profit: 2000 },
  { Name: "Product C", Profit: 1500 },
];

// Route to get all analytics data (for visualization, charts, etc.)
router.get("/", (req, res) => {
  res.json(analyticsData);
});

module.exports = router;
