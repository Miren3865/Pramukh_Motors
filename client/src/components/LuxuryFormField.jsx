import React, { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { formField, floatingLabel } from '../animations/variants';

const LuxuryFormField = ({
  label,
  type = 'text',
  name,
  value,
  onChange,
  onBlur,
  placeholder,
  className = '',
  error = null,
  success = false,
  required = false,
  rows = null,
}) => {
  const [isFocused, setIsFocused] = useState(false);
  const inputRef = useRef(null);
  const fieldType = type || 'text';
  const isTextarea = fieldType === 'textarea';

  const handleFocus = () => {
    setIsFocused(true);
  };

  const handleBlur = (e) => {
    setIsFocused(false);
    if (onBlur) onBlur(e);
  };

  const fieldClasses = [
    'form-field',
    error && 'error',
    success && 'success',
    className,
  ].filter(Boolean).join(' ');

  const Component = isTextarea ? 'textarea' : 'input';

  return (
    <motion.div
      className="form-field-wrapper"
      variants={formField}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-100px' }}
    >
      <div className="relative">
        <Component
          ref={inputRef}
          type={!isTextarea ? fieldType : undefined}
          name={name}
          value={value}
          onChange={onChange}
          onFocus={handleFocus}
          onBlur={handleBlur}
          placeholder={placeholder || ' '}
          className={fieldClasses}
          rows={isTextarea ? rows : undefined}
          required={required}
        />
        
        {label && (
          <motion.label
            htmlFor={name}
            className="floating-label"
            animate={isFocused || value ? 'animate' : 'initial'}
            variants={floatingLabel}
          >
            {label}
            {required && <span className="text-red-500 ml-1">*</span>}
          </motion.label>
        )}

        {/* Light ray effect on focus */}
        {isFocused && (
          <motion.div
            className="light-ray animate"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          />
        )}
      </div>

      {/* Error message with animation */}
      {error && (
        <motion.p
          className="text-red-400 text-sm mt-2 ml-2"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          {error}
        </motion.p>
      )}

      {/* Success message with animation */}
      {success && !error && (
        <motion.div
          className="flex items-center gap-2 mt-2 ml-2 text-green-400"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          <svg
            className="w-4 h-4"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M5 13l4 4L19 7"
            />
          </svg>
          <span className="text-sm">Field validated</span>
        </motion.div>
      )}
    </motion.div>
  );
};

export default LuxuryFormField;
