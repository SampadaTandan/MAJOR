const mongoose = require('mongoose');

const AnalyticsSchema = new mongoose.Schema({
  product_id: { type: String, required: true },
  product_name: { type: String, required: true },
  profit: { type: Number, required: true },
});

module.exports = mongoose.model('Analytics', AnalyticsSchema);
