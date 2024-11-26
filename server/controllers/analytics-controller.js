const Analytics = require('../models/analytics-model');

// Get all analytics data
exports.getAllAnalytics = async (req, res) => {
  try {
    const analyticsData = await Analytics.find();
    if (analyticsData.length === 0) {
      return res.status(404).json({ message: 'No analytics data found' });
    }
    res.status(200).json(analyticsData);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching analytics data', error });
  }
};

// Add new analytics data
exports.addAnalytics = async (req, res) => {
  try {
    const { product_id, product_name, profit } = req.body;
    if (!product_id || !product_name || !profit) {
      return res.status(400).json({ message: 'Missing required fields' });
    }

    const newAnalytics = new Analytics({
      product_id,
      product_name,
      profit,
    });

    await newAnalytics.save();
    res.status(201).json({ message: 'Analytics data added successfully.' });
  } catch (error) {
    res.status(500).json({ message: 'Error adding analytics data', error });
  }
};
