import React from 'react'
import { motion } from 'framer-motion'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Autoplay, Navigation, Pagination } from 'swiper/modules'
import { Star, Quote } from 'lucide-react'
import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'
import { itemVariants } from '../animations/variants'

const TestimonialSection = () => {
  const testimonials = [
    {
      id: 1,
      name: 'James Mitchell',
      role: 'CEO, Tech Innovations',
      image: '👨‍💼',
      rating: 5,
      text: 'Revora Motors exceeded all my expectations. The quality of service, the vehicle selection, and the professionalism of the team made my luxury car purchase an unforgettable experience.',
    },
    {
      id: 2,
      name: 'Sarah Johnson',
      role: 'Entrepreneur',
      image: '👩‍💼',
      rating: 5,
      text: 'I was skeptical at first, but Revora Motors proved to be the real deal. Premium quality cars, transparent pricing, and exceptional customer support. Highly recommended!',
    },
    {
      id: 3,
      name: 'Michael Chen',
      role: 'Business Owner',
      image: '👨‍💻',
      rating: 5,
      text: 'The entire process was seamless and professional. From the initial consultation to the final handover, every detail was handled with care. My new BMW is absolutely stunning!',
    },
    {
      id: 4,
      name: 'Emma Williams',
      role: 'Fashion Designer',
      image: '👩‍🎨',
      rating: 5,
      text: 'Revora Motors understands luxury and style. They helped me find the perfect car that matches my personality. The attention to detail is unparalleled.',
    },
  ]

  return (
    <section id="testimonials" className="section-padding bg-gradient-to-b from-dark-card to-dark-bg">
      <div className="container-custom">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-5xl md:text-6xl font-bold mb-4">
            <span className="text-white">What Our </span>
            <span className="gradient-text neon-glow">Clients Say</span>
          </h2>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            Real stories from satisfied customers who've found their dream luxury car with us
          </p>
        </motion.div>

        {/* Testimonials Carousel */}
        <Swiper
          modules={[Autoplay, Navigation, Pagination]}
          autoplay={{ delay: 5000, disableOnInteraction: false }}
          navigation={false}
          pagination={{ clickable: true, dynamicBullets: true }}
          spaceBetween={30}
          slidesPerView={1}
          breakpoints={{
            768: { slidesPerView: 2 },
            1024: { slidesPerView: 3 },
          }}
          className="pb-12"
        >
          {testimonials.map((testimonial) => (
            <SwiperSlide key={testimonial.id}>
              <motion.div
                variants={itemVariants}
                whileHover={{ y: -10 }}
                className="glass-dark p-8 rounded-xl border border-neon-blue/20 hover:border-neon-blue/60 transition-all h-full flex flex-col"
              >
                {/* Quote Icon */}
                <div className="mb-4">
                  <Quote className="text-neon-blue/50" size={32} />
                </div>

                {/* Testimonial Text */}
                <p className="text-gray-300 mb-6 flex-grow leading-relaxed">
                  "{testimonial.text}"
                </p>

                {/* Rating */}
                <div className="flex gap-1 mb-4">
                  {Array.from({ length: testimonial.rating }).map((_, i) => (
                    <Star
                      key={i}
                      className="text-neon-blue fill-neon-blue"
                      size={18}
                    />
                  ))}
                </div>

                {/* Author */}
                <div className="flex items-center gap-4">
                  <div className="text-3xl">{testimonial.image}</div>
                  <div>
                    <p className="text-white font-bold">{testimonial.name}</p>
                    <p className="text-gray-400 text-sm">{testimonial.role}</p>
                  </div>
                </div>
              </motion.div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  )
}

export default TestimonialSection
