require('dotenv').config();
const mongoose = require('mongoose');
const User = require('./models/User');

const seedUsers = [
  {
    name: 'Admin User',
    email: 'admin@education.com',
    password: 'admin123',
    role: 'admin'
  },
  {
    name: 'John Teacher',
    email: 'teacher@education.com',
    password: 'teacher123',
    role: 'teacher'
  },
  {
    name: 'Jane Student',
    email: 'student@education.com',
    password: 'student123',
    role: 'student'
  }
];

const seedDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('MongoDB Connected');

    // Clear existing users
    await User.deleteMany({});
    console.log('Cleared existing users');

    // Create seed users
    for (const userData of seedUsers) {
      const user = await User.create(userData);
      console.log(`Created ${user.role}: ${user.email}`);
    }

    console.log('\n=== Seed completed successfully! ===');
    console.log('\nDummy Credentials:');
    console.log('-------------------');
    console.log('Admin:   admin@education.com / admin123');
    console.log('Teacher: teacher@education.com / teacher123');
    console.log('Student: student@education.com / student123');
    console.log('-------------------\n');

    process.exit(0);
  } catch (error) {
    console.error('Seed error:', error);
    process.exit(1);
  }
};

seedDB();
