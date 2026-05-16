import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { AlertCircle, CheckCircle2 } from 'lucide-react';
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
        <label htmlFor={name} className="block text-sm font-medium text-text-primary mb-2">
          {label}
          {required && <span className="text-error ml-1">*</span>}
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
        <p className="text-sm text-error mt-2 flex items-center gap-1.5 font-medium">
          <AlertCircle size={14} />
          {error}
        </p>
      ) : success ? (
        <p className="text-sm text-success mt-2 flex items-center gap-1.5 font-medium">
          <CheckCircle2 size={14} />
          Looks good
        </p>
      ) : (
        <p className="sr-only">{label} field</p>
      )}
    </motion.div>
  );
};

export default LuxuryFormField;
