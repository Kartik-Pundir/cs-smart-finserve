// Simple health check endpoint
module.exports = (req, res) => {
  res.status(200).json({ 
    status: 'OK', 
    message: 'CS Smart Finserve API is running',
    timestamp: new Date().toISOString()
  });
};
