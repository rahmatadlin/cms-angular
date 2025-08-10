const { Content, User } = require('../models');
const { Op } = require('sequelize');

// Get all content (with pagination and filters)
const getAllContent = async (req, res) => {
  try {
    const {
      page = 1,
      limit = 10,
      search,
      type,
      status,
      isPublic
    } = req.query;

    const offset = (page - 1) * limit;
    const where = {};

    // Add search filter
    if (search) {
      where[Op.or] = [
        { title: { [Op.iLike]: `%${search}%` } },
        { content: { [Op.iLike]: `%${search}%` } },
        { slug: { [Op.iLike]: `%${search}%` } }
      ];
    }

    // Add type filter
    if (type) {
      where.type = type;
    }

    // Add status filter
    if (status) {
      where.status = status;
    }

    // Add public filter
    if (isPublic !== undefined) {
      where.isPublic = isPublic === 'true';
    }

    const { count, rows } = await Content.findAndCountAll({
      where,
      include: [
        {
          model: User,
          as: 'creator',
          attributes: ['id', 'name', 'email']
        },
        {
          model: User,
          as: 'updater',
          attributes: ['id', 'name', 'email']
        }
      ],
      order: [['createdAt', 'DESC']],
      limit: parseInt(limit),
      offset: parseInt(offset)
    });

    const totalPages = Math.ceil(count / limit);

    res.json({
      success: true,
      data: {
        content: rows,
        pagination: {
          currentPage: parseInt(page),
          totalPages,
          totalItems: count,
          itemsPerPage: parseInt(limit)
        }
      }
    });
  } catch (error) {
    console.error('Get all content error:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error.'
    });
  }
};

// Get content by ID
const getContentById = async (req, res) => {
  try {
    const { id } = req.params;

    const content = await Content.findByPk(id, {
      include: [
        {
          model: User,
          as: 'creator',
          attributes: ['id', 'name', 'email']
        },
        {
          model: User,
          as: 'updater',
          attributes: ['id', 'name', 'email']
        }
      ]
    });

    if (!content) {
      return res.status(404).json({
        success: false,
        message: 'Content not found.'
      });
    }

    res.json({
      success: true,
      data: { content }
    });
  } catch (error) {
    console.error('Get content by ID error:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error.'
    });
  }
};

// Get content by slug
const getContentBySlug = async (req, res) => {
  try {
    const { slug } = req.params;

    const content = await Content.findOne({
      where: { 
        slug,
        status: 'published',
        isPublic: true
      },
      include: [
        {
          model: User,
          as: 'creator',
          attributes: ['id', 'name']
        }
      ]
    });

    if (!content) {
      return res.status(404).json({
        success: false,
        message: 'Content not found.'
      });
    }

    res.json({
      success: true,
      data: { content }
    });
  } catch (error) {
    console.error('Get content by slug error:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error.'
    });
  }
};

// Create new content
const createContent = async (req, res) => {
  try {
    const {
      title,
      slug,
      content: contentText,
      excerpt,
      type,
      status,
      featuredImage,
      metaTitle,
      metaDescription,
      tags,
      order,
      isPublic
    } = req.body;

    // Validate required fields
    if (!title || !slug || !contentText) {
      return res.status(400).json({
        success: false,
        message: 'Title, slug, and content are required.'
      });
    }

    // Check if slug already exists
    const existingContent = await Content.findOne({ where: { slug } });
    if (existingContent) {
      return res.status(400).json({
        success: false,
        message: 'Slug already exists.'
      });
    }

    const newContent = await Content.create({
      title,
      slug,
      content: contentText,
      excerpt,
      type: type || 'post',
      status: status || 'draft',
      featuredImage,
      metaTitle,
      metaDescription,
      tags: tags || [],
      order: order || 0,
      isPublic: isPublic !== undefined ? isPublic : true,
      publishedAt: status === 'published' ? new Date() : null,
      createdBy: req.user.id
    });

    const createdContent = await Content.findByPk(newContent.id, {
      include: [
        {
          model: User,
          as: 'creator',
          attributes: ['id', 'name', 'email']
        }
      ]
    });

    res.status(201).json({
      success: true,
      message: 'Content created successfully.',
      data: { content: createdContent }
    });
  } catch (error) {
    console.error('Create content error:', error);
    if (error.name === 'SequelizeValidationError') {
      return res.status(400).json({
        success: false,
        message: 'Validation error.',
        errors: error.errors.map(err => err.message)
      });
    }
    res.status(500).json({
      success: false,
      message: 'Internal server error.'
    });
  }
};

// Update content
const updateContent = async (req, res) => {
  try {
    const { id } = req.params;
    const {
      title,
      slug,
      content: contentText,
      excerpt,
      type,
      status,
      featuredImage,
      metaTitle,
      metaDescription,
      tags,
      order,
      isPublic
    } = req.body;

    const content = await Content.findByPk(id);
    if (!content) {
      return res.status(404).json({
        success: false,
        message: 'Content not found.'
      });
    }

    // Check if slug already exists (excluding current content)
    if (slug && slug !== content.slug) {
      const existingContent = await Content.findOne({ where: { slug } });
      if (existingContent) {
        return res.status(400).json({
          success: false,
          message: 'Slug already exists.'
        });
      }
    }

    // Update content
    const updateData = {
      title: title || content.title,
      slug: slug || content.slug,
      content: contentText || content.content,
      excerpt,
      type: type || content.type,
      status: status || content.status,
      featuredImage,
      metaTitle,
      metaDescription,
      tags: tags || content.tags,
      order: order !== undefined ? order : content.order,
      isPublic: isPublic !== undefined ? isPublic : content.isPublic,
      updatedBy: req.user.id
    };

    // Set publishedAt if status is being changed to published
    if (status === 'published' && content.status !== 'published') {
      updateData.publishedAt = new Date();
    }

    await content.update(updateData);

    const updatedContent = await Content.findByPk(id, {
      include: [
        {
          model: User,
          as: 'creator',
          attributes: ['id', 'name', 'email']
        },
        {
          model: User,
          as: 'updater',
          attributes: ['id', 'name', 'email']
        }
      ]
    });

    res.json({
      success: true,
      message: 'Content updated successfully.',
      data: { content: updatedContent }
    });
  } catch (error) {
    console.error('Update content error:', error);
    if (error.name === 'SequelizeValidationError') {
      return res.status(400).json({
        success: false,
        message: 'Validation error.',
        errors: error.errors.map(err => err.message)
      });
    }
    res.status(500).json({
      success: false,
      message: 'Internal server error.'
    });
  }
};

// Delete content
const deleteContent = async (req, res) => {
  try {
    const { id } = req.params;

    const content = await Content.findByPk(id);
    if (!content) {
      return res.status(404).json({
        success: false,
        message: 'Content not found.'
      });
    }

    await content.destroy();

    res.json({
      success: true,
      message: 'Content deleted successfully.'
    });
  } catch (error) {
    console.error('Delete content error:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error.'
    });
  }
};

// Get public website content
const getPublicContent = async (req, res) => {
  try {
    const { type, limit = 10 } = req.query;
    const where = {
      status: 'published',
      isPublic: true
    };

    if (type) {
      where.type = type;
    }

    const content = await Content.findAll({
      where,
      include: [
        {
          model: User,
          as: 'creator',
          attributes: ['id', 'name']
        }
      ],
      order: [['order', 'ASC'], ['publishedAt', 'DESC']],
      limit: parseInt(limit)
    });

    res.json({
      success: true,
      data: { content }
    });
  } catch (error) {
    console.error('Get public content error:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error.'
    });
  }
};

module.exports = {
  getAllContent,
  getContentById,
  getContentBySlug,
  createContent,
  updateContent,
  deleteContent,
  getPublicContent
}; 