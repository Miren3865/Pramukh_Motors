import { upload } from '../config/cloudinary.js';

// Middleware for single image upload
export const uploadSingle = upload.single('image');

// Middleware for multiple image uploads (gallery)
export const uploadGallery = upload.array('gallery', 10); // Max 10 images

// Middleware for mixed uploads (thumbnail + gallery)
export const uploadCarImages = upload.fields([
  { name: 'thumbnail', maxCount: 1 },
  { name: 'featured', maxCount: 1 },
  { name: 'gallery', maxCount: 10 },
]);

// Error handling middleware for upload errors
export const handleUploadError = (error, req, res, next) => {
  if (error instanceof multer.MulterError) {
    if (error.code === 'LIMIT_FILE_SIZE') {
      return res.status(400).json({
        success: false,
        message: 'File too large. Maximum size is 5MB.',
      });
    }
    if (error.code === 'LIMIT_FILE_COUNT') {
      return res.status(400).json({
        success: false,
        message: 'Too many files. Maximum 10 images allowed.',
      });
    }
  }

  if (error.message === 'Only image files are allowed!') {
    return res.status(400).json({
      success: false,
      message: error.message,
    });
  }

  next(error);
};