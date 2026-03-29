// Vercel serverless function entry point
let app;

try {
  app = require('../server');
} catch (error) {
  console.error('Error loading server:', error);
  // Return a simple error handler if server fails to load
  app = (req, res) => {
    res.status(500).json({
      error: 'Server initialization failed',
      message: error.message
    });
  };
}

module.exports = app;
