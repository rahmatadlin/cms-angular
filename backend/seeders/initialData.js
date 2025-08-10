const { User, Content } = require('../models');
const bcrypt = require('bcryptjs');

const seedInitialData = async () => {
  try {
    console.log('🌱 Seeding initial data...');

    // Create admin user
    const adminExists = await User.findOne({ where: { email: 'admin@cms.com' } });
    if (!adminExists) {
      const hashedPassword = await bcrypt.hash('admin123', 12);
      await User.create({
        name: 'Administrator',
        email: 'admin@cms.com',
        password: hashedPassword,
        role: 'admin',
        isActive: true
      });
      console.log('✅ Admin user created');
    }

    // Create editor user
    const editorExists = await User.findOne({ where: { email: 'editor@cms.com' } });
    if (!editorExists) {
      const hashedPassword = await bcrypt.hash('editor123', 12);
      await User.create({
        name: 'Content Editor',
        email: 'editor@cms.com',
        password: hashedPassword,
        role: 'editor',
        isActive: true
      });
      console.log('✅ Editor user created');
    }

    // Create sample content
    const contentCount = await Content.count();
    if (contentCount === 0) {
      const adminUser = await User.findOne({ where: { email: 'admin@cms.com' } });
      
      // Sample pages
      await Content.create({
        title: 'Welcome to Our Website',
        slug: 'welcome',
        content: `
          <h1>Welcome to Our Website</h1>
          <p>This is a sample welcome page created by the CMS. You can edit this content through the admin panel.</p>
          <p>Features of this CMS:</p>
          <ul>
            <li>Easy content management</li>
            <li>Image upload and management</li>
            <li>User authentication and authorization</li>
            <li>Responsive design</li>
          </ul>
        `,
        excerpt: 'Welcome to our website built with Angular and Express CMS.',
        type: 'page',
        status: 'published',
        isPublic: true,
        publishedAt: new Date(),
        createdBy: adminUser.id
      });

      await Content.create({
        title: 'About Us',
        slug: 'about-us',
        content: `
          <h1>About Us</h1>
          <p>We are a company dedicated to providing excellent content management solutions.</p>
          <p>Our mission is to make content management simple and efficient for everyone.</p>
          <h2>Our Values</h2>
          <ul>
            <li>Innovation</li>
            <li>Quality</li>
            <li>Customer Focus</li>
            <li>Integrity</li>
          </ul>
        `,
        excerpt: 'Learn more about our company and mission.',
        type: 'page',
        status: 'published',
        isPublic: true,
        publishedAt: new Date(),
        createdBy: adminUser.id
      });

      // Sample blog posts
      await Content.create({
        title: 'Getting Started with CMS',
        slug: 'getting-started-with-cms',
        content: `
          <h1>Getting Started with CMS</h1>
          <p>This is your first blog post about getting started with our CMS system.</p>
          <h2>Key Features</h2>
          <p>Our CMS provides the following key features:</p>
          <ul>
            <li>User-friendly interface</li>
            <li>Rich text editor</li>
            <li>Media management</li>
            <li>SEO optimization</li>
          </ul>
          <p>Start creating amazing content today!</p>
        `,
        excerpt: 'Learn how to get started with our powerful CMS system.',
        type: 'post',
        status: 'published',
        tags: ['cms', 'tutorial', 'getting-started'],
        isPublic: true,
        publishedAt: new Date(),
        createdBy: adminUser.id
      });

      await Content.create({
        title: 'Best Practices for Content Management',
        slug: 'best-practices-content-management',
        content: `
          <h1>Best Practices for Content Management</h1>
          <p>Managing content effectively is crucial for any website. Here are some best practices:</p>
          <h2>1. Plan Your Content</h2>
          <p>Before creating content, plan your strategy and target audience.</p>
          <h2>2. Use Clear Titles</h2>
          <p>Make sure your titles are descriptive and SEO-friendly.</p>
          <h2>3. Optimize Images</h2>
          <p>Use appropriate image sizes and alt text for better accessibility.</p>
          <h2>4. Regular Updates</h2>
          <p>Keep your content fresh and up-to-date.</p>
        `,
        excerpt: 'Discover the best practices for effective content management.',
        type: 'post',
        status: 'published',
        tags: ['content-management', 'best-practices', 'seo'],
        isPublic: true,
        publishedAt: new Date(),
        createdBy: adminUser.id
      });

      console.log('✅ Sample content created');
    }

    console.log('✅ Initial data seeding completed');
  } catch (error) {
    console.error('❌ Error seeding initial data:', error);
    throw error;
  }
};

module.exports = seedInitialData; 