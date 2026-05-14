import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { formField } from '../animations/variants';

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
  const fieldType = type || 'text';
  const isTextarea = fieldType === 'textarea';

  const handleFocus = () => setIsFocused(true);
  const handleBlur = (e) => {
    setIsFocused(false);
    if (onBlur) onBlur(e);
  };

  const fieldClasses = [
    'form-field',
    isTextarea ? 'min-h-[140px] resize-none py-3' : 'h-12',
    error && 'error',
    success && !error && 'success',
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
      {label && (
        <label htmlFor={name} className="block text-sm font-medium text-slate-200 mb-2">
          {label}
          {required && <span className="text-red-500 ml-1">*</span>}
        </label>
      )}

      <Component
        type={!isTextarea ? fieldType : undefined}
        name={name}
        value={value}
        onChange={onChange}
        onFocus={handleFocus}
        onBlur={handleBlur}
        placeholder={placeholder || ''}
        className={fieldClasses}
        rows={isTextarea ? rows : undefined}
        required={required}
      />

      {error ? (
        <p className="text-sm text-red-400 mt-2">{error}</p>
      ) : success ? (
        <p className="text-sm text-emerald-400 mt-2">Looks good</p>
      ) : (
        <p className="sr-only">{label} field</p>
      )}
    </motion.div>
  );
};

export default LuxuryFormField;
