import React, { useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { magneticButton } from '../animations/variants';

const MagneticButton = ({ 
  children, 
  onClick, 
  className = '', 
  variant = 'primary',
  disabled = false 
}) => {
  const buttonRef = useRef(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);

  const handleMouseMove = (e) => {
    if (!isHovering) return;

    const rect = buttonRef.current?.getBoundingClientRect();
    if (!rect) return;

    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    
    const distance = 100; // Distance range for magnetic effect
    const dx = e.clientX - centerX;
    const dy = e.clientY - centerY;
    const distance2d = Math.sqrt(dx * dx + dy * dy);

    if (distance2d < distance) {
      const pullStrength = (distance - distance2d) / distance;
      setPosition({
        x: dx * pullStrength * 0.15,
        y: dy * pullStrength * 0.15,
      });
    } else {
      setPosition({ x: 0, y: 0 });
    }
  };

  const handleMouseEnter = () => {
    setIsHovering(true);
  };

  const handleMouseLeave = () => {
    setIsHovering(false);
    setPosition({ x: 0, y: 0 });
  };

  const buttonClasses = {
    primary: 'btn-magnetic',
    secondary: 'btn-gradient-border',
  };

  return (
    <motion.button
      ref={buttonRef}
      variants={magneticButton}
      initial="initial"
      whileHover="whileHover"
      whileTap="whileTap"
      className={`${buttonClasses[variant] || buttonClasses.primary} ${className}`}
      onClick={onClick}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      animate={{
        x: position.x,
        y: position.y,
      }}
      transition={{
        type: 'spring',
        stiffness: 200,
        damping: 20,
      }}
      disabled={disabled}
    >
      {children}
    </motion.button>
  );
};

export default MagneticButton;
