const express = require("express");
const router = express.Router();

// Sample analytics data
const analyticsController = require('../controllers/analytics-controller');
const { validateAnalyticsData } = require('../middlewares/analytics-middleware');

// Route to get all analytics data
router.get('/', analyticsController.getAllAnalytics);

// Route to add new analytics data
router.post('/', validateAnalyticsData, analyticsController.addAnalytics);

// Route to get all analytics data (for visualization, charts, etc.)
router.get("/visualize", (req, res) => {
  // You can fetch the analytics data from the DB or static for testing
  res.json({ message: 'Analytics data for visualization' });
});
module.exports = router;
