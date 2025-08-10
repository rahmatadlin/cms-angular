const express = require('express');
const { auth, authorize } = require('../middleware/auth');
const {
  getAllContent,
  getContentById,
  getContentBySlug,
  createContent,
  updateContent,
  deleteContent,
  getPublicContent
} = require('../controllers/contentController');

const router = express.Router();

// Public routes (for website)
router.get('/public', getPublicContent);
router.get('/public/:slug', getContentBySlug);

// Protected routes (for CMS)
router.get('/', auth, authorize('admin', 'editor', 'viewer'), getAllContent);
router.get('/:id', auth, authorize('admin', 'editor', 'viewer'), getContentById);
router.post('/', auth, authorize('admin', 'editor'), createContent);
router.put('/:id', auth, authorize('admin', 'editor'), updateContent);
router.delete('/:id', auth, authorize('admin'), deleteContent);

module.exports = router; 