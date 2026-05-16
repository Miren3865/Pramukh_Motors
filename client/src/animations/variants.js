const luxuryEase = [0.16, 1, 0.3, 1]

export const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.12,
      delayChildren: 0.15,
    },
  },
}

export const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 1.2,
      ease: luxuryEase,
    },
  },
}

export const lineVariant = {
  hidden: { width: 0, opacity: 0 },
  visible: { width: 64, opacity: 1, transition: { duration: 1.5, ease: luxuryEase } }
}

export const textRevealVariant = {
  hidden: { opacity: 0, y: 30, filter: 'blur(8px)' },
  visible: { 
    opacity: 1, 
    y: 0, 
    filter: 'blur(0px)', 
    transition: { duration: 1.5, ease: luxuryEase } 
  }
}

export const subtitleVariant = {
  hidden: { opacity: 0, y: 20 },
  visible: { 
    opacity: 1, 
    y: 0, 
    transition: { duration: 1.5, ease: luxuryEase } 
  }
}

export const fadeInUp = {
  hidden: { opacity: 0, y: 48 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.9,
      ease: luxuryEase,
    },
  },
}

export const scaleIn = {
  hidden: { opacity: 0, scale: 0.94 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      duration: 0.65,
      ease: luxuryEase,
    },
  },
}

export const slideInLeft = {
  hidden: { opacity: 0, x: -56 },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.85,
      ease: luxuryEase,
    },
  },
}

export const slideInRight = {
  hidden: { opacity: 0, x: 56 },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.85,
      ease: luxuryEase,
    },
  },
}

export const rotateIn = {
  hidden: { opacity: 0, rotate: -6 },
  visible: {
    opacity: 1,
    rotate: 0,
    transition: {
      duration: 0.85,
      ease: luxuryEase,
    },
  },
}

export const textReveal = {
  hidden: { y: 80, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      duration: 0.85,
      ease: luxuryEase,
    },
  },
}

export const glowPulse = {
  initial: { boxShadow: '0 0 0px rgba(0, 217, 255, 0)' },
  animate: {
    boxShadow: [
      '0 0 0px rgba(0, 217, 255, 0)',
      '0 0 20px rgba(0, 217, 255, 0.5)',
      '0 0 40px rgba(0, 217, 255, 0.3)',
      '0 0 0px rgba(0, 217, 255, 0)',
    ],
    transition: {
      duration: 2,
      repeat: Infinity,
    },
  },
}

// Character-by-character text reveal animations
export const charRevealContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.05,
      delayChildren: 0.1,
    },
  },
}

export const charReveal = {
  hidden: { opacity: 0, y: 20, rotateY: -90 },
  visible: {
    opacity: 1,
    y: 0,
    rotateY: 0,
    transition: {
      duration: 0.45,
      ease: luxuryEase,
    },
  },
}

// Parallax-style animations
export const parallaxContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.2,
    },
  },
}

export const parallaxItem = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.8,
      ease: luxuryEase,
    },
  },
  whileHover: { y: -8, transition: { duration: 0.4 } },
}

// 3D Card animation with perspective
export const card3D = {
  hidden: { opacity: 0, y: 60, rotateX: -15 },
  visible: {
    opacity: 1,
    y: 0,
    rotateX: 0,
    transition: {
      duration: 0.8,
      ease: luxuryEase,
    },
  },
  whileHover: {
    y: -12,
    rotateX: 5,
    rotateY: -5,
    boxShadow: '0 30px 60px rgba(0, 217, 255, 0.3)',
  },
}

// Magnetic button pull effect
export const magneticButton = {
  initial: { scale: 1 },
  whileHover: {
    scale: 1.08,
    boxShadow: '0 0 30px rgba(0, 217, 255, 0.6), 0 0 50px rgba(192, 0, 255, 0.4)',
  },
  whileTap: { scale: 0.95 },
}

// Light rays / shimmer effect
export const lightRay = {
  initial: { opacity: 0, x: -200 },
  animate: {
    opacity: [0, 0.6, 0],
    x: [0, 400, 0],
    transition: {
      duration: 3,
      repeat: Infinity,
      delay: 2,
    },
  },
}

// Staggered grid animation with complex entrance
export const staggerGrid = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2,
    },
  },
}

export const gridItem = {
  hidden: { opacity: 0, scale: 0.85, rotate: -10 },
  visible: {
    opacity: 1,
    scale: 1,
    rotate: 0,
    transition: {
      duration: 0.75,
      ease: luxuryEase,
    },
  },
}

// Advanced form field animations
export const formFieldContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.15,
    },
  },
}

export const formField = {
  hidden: { opacity: 0, y: 20, scale: 0.95 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.6,
      ease: luxuryEase,
    },
  },
  whileFocus: {
    scale: 1.02,
    boxShadow: '0 0 20px rgba(0, 217, 255, 0.4)',
  },
}

// Floating label animation
export const floatingLabel = {
  initial: { y: 0, fontSize: '1rem' },
  animate: { y: -24, fontSize: '0.75rem' },
  transition: { duration: 0.4, ease: luxuryEase },
}

// Success check animation
export const successCheck = {
  initial: { scale: 0, rotate: -180 },
  animate: {
    scale: 1,
    rotate: 0,
    transition: { duration: 0.6, ease: [0.34, 1.56, 0.64, 1] },
  },
  whileInView: {
    scale: [1, 1.1, 1],
    transition: { duration: 1.5, repeat: Infinity, repeatDelay: 3 },
  },
}

// Confetti particle animation
export const confetti = {
  initial: { y: 0, x: 0, opacity: 1, rotate: 0 },
  animate: {
    y: Math.random() * -400 - 200,
    x: (Math.random() - 0.5) * 400,
    opacity: 0,
    rotate: Math.random() * 720,
    transition: {
      duration: 2.5,
      ease: 'easeOut',
    },
  },
}

// Split text reveal (left to right)
export const splitTextContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.03,
      delayChildren: 0.1,
    },
  },
}

export const splitText = {
  hidden: { opacity: 0, x: -40 },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.5,
      ease: luxuryEase,
    },
  },
}

// Expanding card border animation
export const expandingBorder = {
  initial: { strokeDasharray: 0, opacity: 0 },
  animate: {
    strokeDasharray: 300,
    opacity: 1,
    transition: { duration: 1.2, ease: luxuryEase },
  },
}

// Hover glow enhancement
export const glowHover = {
  whileHover: {
    boxShadow: '0 0 40px rgba(0, 217, 255, 0.5), 0 0 50px rgba(192, 0, 255, 0.3)',
    transition: { duration: 0.6 },
  },
}

// Testimonial card reveal with rotation
export const testimonialReveal = {
  hidden: { opacity: 0, rotateY: 45, y: 40 },
  visible: {
    opacity: 1,
    rotateY: 0,
    y: 0,
    transition: {
      duration: 0.9,
      ease: luxuryEase,
    },
  },
}

// Badge floating animation with bounce
export const badgeFloat = {
  initial: { y: 0, scale: 1 },
  animate: {
    y: [-8, -16, -8],
    scale: [1, 1.05, 1],
    transition: {
      duration: 4,
      repeat: Infinity,
      ease: 'easeInOut',
    },
  },
}

// Icon rotate on hover
export const iconHover = {
  whileHover: {
    rotate: 360,
    scale: 1.15,
    transition: { duration: 0.6, ease: 'easeInOut' },
  },
}
