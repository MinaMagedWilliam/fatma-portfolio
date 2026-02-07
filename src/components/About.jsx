import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import './About.css';

const About = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 50, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.6,
        ease: 'easeOut',
      },
    },
  };

  return (
    <section id="about" className="about section" ref={ref}>
      <div className="container">
        <motion.div
          className="about-content"
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
        >
          <motion.div className="section-header" variants={itemVariants}>
            <h2 className="section-title">About Me</h2>
            <div className="title-underline"></div>
          </motion.div>

          <motion.div className="about-intro" variants={itemVariants}>
            <p className="about-text">
              I'm Dr. Fatma Elzahraa, a passionate dentist dedicated to providing 
              exceptional patient care with precision and expertise.
            </p>
            <p className="about-text">
              My journey combines the precision of science with a commitment to 
              excellence in modern dental practice.
            </p>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default About;
