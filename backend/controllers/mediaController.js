const { Media, User } = require('../models');
const fs = require('fs').promises;
const path = require('path');
const { Op } = require('sequelize');

// Upload single file
const uploadFile = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: 'No file uploaded.'
      });
    }

    const { alt, title, description, isPublic = true } = req.body;

    // Get image dimensions if it's an image
    let width = null;
    let height = null;
    
    if (req.file.mimetype.startsWith('image/')) {
      const sharp = require('sharp');
      const metadata = await sharp(req.file.path).metadata();
      width = metadata.width;
      height = metadata.height;
    }

    const media = await Media.create({
      filename: req.file.filename,
      originalName: req.file.originalname,
      mimeType: req.file.mimetype,
      size: req.file.size,
      path: req.file.path,
      alt,
      title,
      description,
      width,
      height,
      isPublic,
      uploadedBy: req.user.id
    });

    const createdMedia = await Media.findByPk(media.id, {
      include: [
        {
          model: User,
          as: 'uploader',
          attributes: ['id', 'name', 'email']
        }
      ]
    });

    res.status(201).json({
      success: true,
      message: 'File uploaded successfully.',
      data: { media: createdMedia }
    });
  } catch (error) {
    console.error('Upload file error:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error.'
    });
  }
};

// Upload multiple files
const uploadMultipleFiles = async (req, res) => {
  try {
    if (!req.files || req.files.length === 0) {
      return res.status(400).json({
        success: false,
        message: 'No files uploaded.'
      });
    }

    const { isPublic = true } = req.body;
    const uploadedMedia = [];

    for (const file of req.files) {
      // Get image dimensions if it's an image
      let width = null;
      let height = null;
      
      if (file.mimetype.startsWith('image/')) {
        const sharp = require('sharp');
        const metadata = await sharp(file.path).metadata();
        width = metadata.width;
        height = metadata.height;
      }

      const media = await Media.create({
        filename: file.filename,
        originalName: file.originalname,
        mimeType: file.mimetype,
        size: file.size,
        path: file.path,
        width,
        height,
        isPublic,
        uploadedBy: req.user.id
      });

      const createdMedia = await Media.findByPk(media.id, {
        include: [
          {
            model: User,
            as: 'uploader',
            attributes: ['id', 'name', 'email']
          }
        ]
      });

      uploadedMedia.push(createdMedia);
    }

    res.status(201).json({
      success: true,
      message: `${uploadedMedia.length} files uploaded successfully.`,
      data: { media: uploadedMedia }
    });
  } catch (error) {
    console.error('Upload multiple files error:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error.'
    });
  }
};

// Get all media (with pagination and filters)
const getAllMedia = async (req, res) => {
  try {
    const {
      page = 1,
      limit = 20,
      search,
      mimeType,
      isPublic
    } = req.query;

    const offset = (page - 1) * limit;
    const where = {};

    // Add search filter
    if (search) {
      where[Op.or] = [
        { originalName: { [Op.iLike]: `%${search}%` } },
        { alt: { [Op.iLike]: `%${search}%` } },
        { title: { [Op.iLike]: `%${search}%` } },
        { description: { [Op.iLike]: `%${search}%` } }
      ];
    }

    // Add mime type filter
    if (mimeType) {
      if (mimeType === 'image') {
        where.mimeType = { [Op.like]: 'image/%' };
      } else {
        where.mimeType = mimeType;
      }
    }

    // Add public filter
    if (isPublic !== undefined) {
      where.isPublic = isPublic === 'true';
    }

    const { count, rows } = await Media.findAndCountAll({
      where,
      include: [
        {
          model: User,
          as: 'uploader',
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
        media: rows,
        pagination: {
          currentPage: parseInt(page),
          totalPages,
          totalItems: count,
          itemsPerPage: parseInt(limit)
        }
      }
    });
  } catch (error) {
    console.error('Get all media error:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error.'
    });
  }
};

// Get media by ID
const getMediaById = async (req, res) => {
  try {
    const { id } = req.params;

    const media = await Media.findByPk(id, {
      include: [
        {
          model: User,
          as: 'uploader',
          attributes: ['id', 'name', 'email']
        }
      ]
    });

    if (!media) {
      return res.status(404).json({
        success: false,
        message: 'Media not found.'
      });
    }

    res.json({
      success: true,
      data: { media }
    });
  } catch (error) {
    console.error('Get media by ID error:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error.'
    });
  }
};

// Update media
const updateMedia = async (req, res) => {
  try {
    const { id } = req.params;
    const { alt, title, description, isPublic } = req.body;

    const media = await Media.findByPk(id);
    if (!media) {
      return res.status(404).json({
        success: false,
        message: 'Media not found.'
      });
    }

    await media.update({
      alt: alt !== undefined ? alt : media.alt,
      title: title !== undefined ? title : media.title,
      description: description !== undefined ? description : media.description,
      isPublic: isPublic !== undefined ? isPublic : media.isPublic
    });

    const updatedMedia = await Media.findByPk(id, {
      include: [
        {
          model: User,
          as: 'uploader',
          attributes: ['id', 'name', 'email']
        }
      ]
    });

    res.json({
      success: true,
      message: 'Media updated successfully.',
      data: { media: updatedMedia }
    });
  } catch (error) {
    console.error('Update media error:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error.'
    });
  }
};

// Delete media
const deleteMedia = async (req, res) => {
  try {
    const { id } = req.params;

    const media = await Media.findByPk(id);
    if (!media) {
      return res.status(404).json({
        success: false,
        message: 'Media not found.'
      });
    }

    // Delete file from filesystem
    try {
      await fs.unlink(media.path);
    } catch (fileError) {
      console.error('Error deleting file:', fileError);
      // Continue with database deletion even if file deletion fails
    }

    await media.destroy();

    res.json({
      success: true,
      message: 'Media deleted successfully.'
    });
  } catch (error) {
    console.error('Delete media error:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error.'
    });
  }
};

// Get public media
const getPublicMedia = async (req, res) => {
  try {
    const { mimeType, limit = 20 } = req.query;
    const where = { isPublic: true };

    if (mimeType) {
      if (mimeType === 'image') {
        where.mimeType = { [Op.like]: 'image/%' };
      } else {
        where.mimeType = mimeType;
      }
    }

    const media = await Media.findAll({
      where,
      include: [
        {
          model: User,
          as: 'uploader',
          attributes: ['id', 'name']
        }
      ],
      order: [['createdAt', 'DESC']],
      limit: parseInt(limit)
    });

    res.json({
      success: true,
      data: { media }
    });
  } catch (error) {
    console.error('Get public media error:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error.'
    });
  }
};

module.exports = {
  uploadFile,
  uploadMultipleFiles,
  getAllMedia,
  getMediaById,
  updateMedia,
  deleteMedia,
  getPublicMedia
}; 