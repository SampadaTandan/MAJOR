exports.validateAnalyticsData = (req, res, next) => {
    const { product_id, product_name, profit } = req.body;
  
    if (!product_id || !product_name || !profit) {
      return res.status(400).json({ message: 'Missing required fields: product_id, product_name, or profit' });
    }
  
    if (typeof profit !== 'number') {
      return res.status(400).json({ message: 'Profit must be a number' });
    }
  
    next();
  };
  