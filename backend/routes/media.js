const express = require('express');
const { auth, authorize } = require('../middleware/auth');
const { upload, handleUploadError } = require('../middleware/upload');
const {
  uploadFile,
  uploadMultipleFiles,
  getAllMedia,
  getMediaById,
  updateMedia,
  deleteMedia,
  getPublicMedia
} = require('../controllers/mediaController');

const router = express.Router();

// Public routes (for website)
router.get('/public', getPublicMedia);

// Protected routes (for CMS)
router.get('/', auth, authorize('admin', 'editor', 'viewer'), getAllMedia);
router.get('/:id', auth, authorize('admin', 'editor', 'viewer'), getMediaById);
router.post('/upload', auth, authorize('admin', 'editor'), upload.single('file'), uploadFile);
router.post('/upload-multiple', auth, authorize('admin', 'editor'), upload.array('files', 10), uploadMultipleFiles);
router.put('/:id', auth, authorize('admin', 'editor'), updateMedia);
router.delete('/:id', auth, authorize('admin'), deleteMedia);

// Error handling for upload routes
router.use('/upload', handleUploadError);
router.use('/upload-multiple', handleUploadError);

module.exports = router; 