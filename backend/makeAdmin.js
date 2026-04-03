require('dotenv').config();
const mongoose = require('mongoose');
const User = require('./models/User');

const makeAdmin = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('✅ MongoDB Connected');

    const adminEmail = process.env.ADMIN_EMAIL || 'kartikpundir231@gmail.com';
    
    const user = await User.findOne({ email: adminEmail });
    
    if (!user) {
      console.log(`❌ User with email ${adminEmail} not found`);
      process.exit(1);
    }

    user.role = 'admin';
    await user.save();

    console.log(`✅ User ${user.name} (${user.email}) is now an admin!`);
    console.log(`   Role: ${user.role}`);
    
    process.exit(0);
  } catch (error) {
    console.error('❌ Error:', error);
    process.exit(1);
  }
};

makeAdmin();
