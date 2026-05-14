import React from 'react'

const Particles = ({ count = 50 }) => {
  const particles = Array.from({ length: count }, (_, i) => ({
    id: i,
    duration: Math.random() * 3 + 2,
    delay: Math.random() * 0.5,
    left: Math.random() * 100,
  }))

  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none">
      {particles.map((particle) => (
        <div
          key={particle.id}
          className="absolute w-1 h-1 bg-neon-blue rounded-full opacity-50"
          style={{
            left: `${particle.left}%`,
            top: '-10px',
            animation: `float ${particle.duration}s ease-in-out ${particle.delay}s infinite`,
          }}
        />
      ))}
    </div>
  )
}

export default Particles
