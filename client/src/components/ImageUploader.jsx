import React, { useState, useRef, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { FiUpload, FiX, FiImage, FiTrash2, FiStar, FiCamera } from 'react-icons/fi'

const ImageUploader = ({
  images = [],
  onImagesChange,
  maxImages = 10,
  maxSize = 5 * 1024 * 1024, // 5MB
  acceptedTypes = ['image/jpeg', 'image/png', 'image/webp'],
  className = '',
  label = 'Upload Images',
  description = 'Drag and drop images here, or click to select',
  thumbnailMode = false,
  featuredMode = false,
  galleryMode = true
}) => {
  const [dragActive, setDragActive] = useState(false)
  const [uploading, setUploading] = useState(false)
  const [previewImages, setPreviewImages] = useState(images)
  const fileInputRef = useRef(null)

  const handleDrag = useCallback((e) => {
    e.preventDefault()
    e.stopPropagation()
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true)
    } else if (e.type === 'dragleave') {
      setDragActive(false)
    }
  }, [])

  const handleDrop = useCallback((e) => {
    e.preventDefault()
    e.stopPropagation()
    setDragActive(false)

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFiles(Array.from(e.dataTransfer.files))
    }
  }, [])

  const handleFiles = async (files) => {
    const validFiles = files.filter(file => {
      if (!acceptedTypes.includes(file.type)) {
        alert(`File type ${file.type} is not supported. Please use JPEG, PNG, or WebP.`)
        return false
      }
      if (file.size > maxSize) {
        alert(`File ${file.name} is too large. Maximum size is ${maxSize / 1024 / 1024}MB.`)
        return false
      }
      return true
    })

    if (thumbnailMode || featuredMode) {
      // Single image mode
      if (validFiles.length > 0) {
        const file = validFiles[0]
        const previewUrl = URL.createObjectURL(file)
        setPreviewImages([previewUrl])
        onImagesChange([file])
      }
    } else if (galleryMode) {
      // Gallery mode
      const remainingSlots = maxImages - previewImages.length
      const filesToAdd = validFiles.slice(0, remainingSlots)

      if (filesToAdd.length > 0) {
        const newPreviews = filesToAdd.map(file => URL.createObjectURL(file))
        setPreviewImages(prev => [...prev, ...newPreviews])
        onImagesChange(prev => [...prev, ...filesToAdd])
      }
    }
  }

  const handleFileInput = (e) => {
    if (e.target.files && e.target.files[0]) {
      handleFiles(Array.from(e.target.files))
    }
  }

  const removeImage = (index) => {
    setPreviewImages(prev => prev.filter((_, i) => i !== index))
    onImagesChange(prev => prev.filter((_, i) => i !== index))
  }

  const setAsThumbnail = (index) => {
    if (galleryMode) {
      const newImages = [...previewImages]
      const [thumbnail] = newImages.splice(index, 1)
      newImages.unshift(thumbnail)
      setPreviewImages(newImages)
      onImagesChange(prev => {
        const newFiles = [...prev]
        const [thumbFile] = newFiles.splice(index, 1)
        newFiles.unshift(thumbFile)
        return newFiles
      })
    }
  }

  const openFileDialog = () => {
    fileInputRef.current?.click()
  }

  return (
    <div className={`space-y-4 ${className}`}>
      <div className="flex items-center justify-between">
        <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
          {label}
        </label>
        {galleryMode && (
          <span className="text-xs text-gray-500">
            {previewImages.length}/{maxImages} images
          </span>
        )}
      </div>

      {/* Upload Area */}
      <motion.div
        className={`relative border-2 border-dashed rounded-xl p-8 text-center transition-all duration-200 ${
          dragActive
            ? 'border-blue-400 bg-blue-50 dark:bg-blue-900/20'
            : 'border-gray-300 dark:border-gray-600 hover:border-gray-400 dark:hover:border-gray-500'
        }`}
        onDragEnter={handleDrag}
        onDragLeave={handleDrag}
        onDragOver={handleDrag}
        onDrop={handleDrop}
        onClick={openFileDialog}
        whileHover={{ scale: 1.01 }}
        whileTap={{ scale: 0.99 }}
      >
        <input
          ref={fileInputRef}
          type="file"
          multiple={!thumbnailMode && !featuredMode}
          accept={acceptedTypes.join(',')}
          onChange={handleFileInput}
          className="hidden"
        />

        <div className="flex flex-col items-center space-y-4">
          <motion.div
            className={`p-4 rounded-full ${
              dragActive
                ? 'bg-blue-100 dark:bg-blue-800 text-blue-600'
                : 'bg-gray-100 dark:bg-gray-700 text-gray-500'
            }`}
            animate={{ scale: dragActive ? 1.1 : 1 }}
          >
            {thumbnailMode ? (
              <FiCamera className="w-8 h-8" />
            ) : featuredMode ? (
              <FiStar className="w-8 h-8" />
            ) : (
              <FiUpload className="w-8 h-8" />
            )}
          </motion.div>

          <div>
            <p className="text-lg font-medium text-gray-700 dark:text-gray-300">
              {dragActive ? 'Drop images here' : description}
            </p>
            <p className="text-sm text-gray-500 mt-1">
              {acceptedTypes.map(type => type.split('/')[1].toUpperCase()).join(', ')} • Max {maxSize / 1024 / 1024}MB each
            </p>
          </div>
        </div>
      </motion.div>

      {/* Image Preview Grid */}
      {previewImages.length > 0 && (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          <AnimatePresence>
            {previewImages.map((image, index) => (
              <motion.div
                key={index}
                className="relative group"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                transition={{ duration: 0.2 }}
              >
                <div className="aspect-square rounded-lg overflow-hidden bg-gray-100 dark:bg-gray-700">
                  <img
                    src={image}
                    alt={`Preview ${index + 1}`}
                    className="w-full h-full object-cover"
                  />
                </div>

                {/* Overlay Controls */}
                <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-50 transition-all duration-200 rounded-lg flex items-center justify-center">
                  <div className="flex space-x-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                    {galleryMode && index > 0 && (
                      <motion.button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation()
                          setAsThumbnail(index)
                        }}
                        className="p-2 bg-blue-600 text-white rounded-full hover:bg-blue-700 transition-colors"
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        title="Set as thumbnail"
                      >
                        <FiStar className="w-4 h-4" />
                      </motion.button>
                    )}

                    <motion.button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation()
                        removeImage(index)
                      }}
                      className="p-2 bg-red-600 text-white rounded-full hover:bg-red-700 transition-colors"
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      title="Remove image"
                    >
                      <FiTrash2 className="w-4 h-4" />
                    </motion.button>
                  </div>
                </div>

                {/* Thumbnail Indicator */}
                {galleryMode && index === 0 && (
                  <div className="absolute top-2 left-2 bg-blue-600 text-white px-2 py-1 rounded-full text-xs flex items-center space-x-1">
                    <FiStar className="w-3 h-3" />
                    <span>Thumbnail</span>
                  </div>
                )}
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      )}
    </div>
  )
}

export default ImageUploader