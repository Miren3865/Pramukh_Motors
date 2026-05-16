import React from 'react'
import { motion } from 'framer-motion'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Autoplay, Navigation, Pagination } from 'swiper/modules'
import { Star, Quote } from 'lucide-react'
import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'
import { itemVariants, lineVariant, textRevealVariant, subtitleVariant } from '../animations/variants'

const TestimonialSection = () => {
  const testimonials = [
    {
      id: 1,
      name: 'James Mitchell',
      role: 'CEO, Tech Innovations',
      image: '👨‍💼',
      rating: 5,
      text: 'Pramukh Motors exceeded all my expectations. The quality of service, the vehicle selection, and the professionalism of the team made my luxury car purchase an unforgettable experience.',
    },
    {
      id: 2,
      name: 'Sarah Johnson',
      role: 'Entrepreneur',
      image: '👩‍💼',
      rating: 5,
      text: 'I was skeptical at first, but Pramukh Motors proved to be the real deal. Premium quality cars, transparent pricing, and exceptional customer support. Highly recommended!',
    },
    {
      id: 3,
      name: 'Michael Chen',
      role: 'Business Owner',
      image: '👨‍💻',
      rating: 5,
      text: 'The entire process was seamless and professional. From the initial consultation to the final handover, every detail was handled with care. My new vehicle is absolutely stunning!',
    },
    {
      id: 4,
      name: 'Emma Williams',
      role: 'Fashion Designer',
      image: '👩‍🎨',
      rating: 5,
      text: 'Pramukh Motors understands luxury and style. They helped me find the perfect car that matches my personality. The attention to detail is unparalleled.',
    },
    {
      id: 5,
      name: 'Rajesh Patel',
      role: 'Investment Banker',
      image: '👨‍💼',
      rating: 5,
      text: 'Exceptional service from start to finish! The team at Pramukh Motors made the entire buying experience smooth and enjoyable. My purchase was absolutely perfect. Highly satisfied!',
    },
    {
      id: 6,
      name: 'David Sterling',
      role: 'Real Estate Developer',
      image: '👨‍💼',
      rating: 5,
      text: 'Pramukh Motors provides an elite purchasing experience. Their deep knowledge of high-end vehicles and commitment to client confidentiality is exactly what I look for in a luxury dealership.',
    },
    {
      id: 7,
      name: 'Sophia Laurent',
      role: 'Art Director',
      image: '👩‍💼',
      rating: 5,
      text: 'The collection at Pramukh Motors is simply curated to perfection. Not only did I find the exact specification I wanted, but the white-glove delivery service was a brilliant touch.',
    },
  ]

  return (
    <section id="testimonials" className="section-padding bg-primary-bg">
      <div className="container-custom">
        {/* Header */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          variants={{
            hidden: { opacity: 1 },
            visible: {
              opacity: 1,
              transition: { staggerChildren: 0.3, delayChildren: 0.1 }
            }
          }}
          className="text-center mb-16"
        >
          <motion.div
            variants={lineVariant}
            className="h-[2px] bg-gold-accent mx-auto mb-6"
          />
          <motion.h2
            variants={textRevealVariant}
            className="text-4xl md:text-5xl font-bold mb-4 tracking-tight text-text-primary"
          >
            Client <span className="text-gold-accent font-serif italic font-medium">Experiences</span>
          </motion.h2>
          <motion.p
            variants={subtitleVariant}
            className="text-text-secondary text-base max-w-2xl mx-auto font-light leading-relaxed"
          >
            Discover what our distinguished clientele has to say about their journey with us.
          </motion.p>
        </motion.div>

        {/* Testimonials Carousel */}
        <div className="pb-16 pt-6">
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
            style={{ overflow: 'visible' }}
          >
            {testimonials.map((testimonial) => (
              <SwiperSlide key={testimonial.id}>
                <motion.div
                  variants={itemVariants}
                  whileHover={{ y: -4, transition: { duration: 0.4, ease: [0.16, 1, 0.3, 1] } }}
                  className="bg-secondary-bg p-8 rounded-sm border border-border-light hover:border-gold-accent/50 transition-all duration-500 hover:shadow-[0_8px_30px_rgb(0,0,0,0.06)] h-full flex flex-col group"
                >
                  {/* Quote Icon */}
                  <div className="mb-6">
                    <Quote className="text-gold-accent/20 group-hover:text-gold-accent/40 transition-colors" size={40} />
                  </div>

                  {/* Testimonial Text */}
                  <p className="text-text-secondary mb-8 flex-grow leading-relaxed font-light italic">
                    "{testimonial.text}"
                  </p>

                  {/* Rating */}
                  <div className="flex gap-1 mb-6">
                    {Array.from({ length: testimonial.rating }).map((_, i) => (
                      <Star
                        key={i}
                        className="text-gold-accent fill-gold-accent"
                        size={14}
                      />
                    ))}
                  </div>

                  {/* Author */}
                  <div className="flex items-center gap-4 border-t border-border-light pt-6">
                    <div className="w-12 h-12 bg-primary-bg border border-border-light rounded-sm flex items-center justify-center text-2xl">
                      {testimonial.image}
                    </div>
                    <div>
                      <p className="text-text-primary font-semibold text-sm tracking-wide">{testimonial.name}</p>
                      <p className="text-gold-accent text-xs uppercase tracking-widest mt-1">{testimonial.role}</p>
                    </div>
                  </div>
                </motion.div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>
    </section>
  )
}

export default TestimonialSection
