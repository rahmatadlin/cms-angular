require('dotenv').config();
const db = require('./models');
const seedInitialData = require('./seeders/initialData');

const runSeeder = async () => {
  try {
    console.log('🚀 Starting database seeder...');
    
    // Test database connection
    await db.sequelize.authenticate();
    console.log('✅ Database connection established.');

    // Sync database
    await db.sequelize.sync({ force: false });
    console.log('✅ Database synchronized.');

    // Run initial data seeder
    await seedInitialData();

    console.log('🎉 Seeding completed successfully!');
    process.exit(0);
  } catch (error) {
    console.error('❌ Seeding failed:', error);
    process.exit(1);
  }
};

runSeeder(); 