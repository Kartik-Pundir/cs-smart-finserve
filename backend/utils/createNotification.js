const Notification = require('../models/Notification');

/**
 * Create in-app notification for user
 * @param {ObjectId} userId - User ID
 * @param {string} title - Notification title
 * @param {string} message - Notification message
 * @param {string} type - Notification type (application, appointment, document, cibil, general)
 * @param {ObjectId} relatedId - Related document ID (optional)
 */
const createNotification = async (userId, title, message, type = 'general', relatedId = null) => {
  try {
    const notification = await Notification.create({
      userId,
      title,
      message,
      type,
      relatedId
    });
    
    console.log(`✅ Notification created for user ${userId}`);
    return notification;
  } catch (error) {
    console.error('❌ Notification creation failed:', error.message);
    return null;
  }
};

module.exports = createNotification;
