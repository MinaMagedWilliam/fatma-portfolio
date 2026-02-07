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

  const skills = [
    {
      title: 'Clinical Dentistry',
      description: 'Expert in advanced dental procedures with a focus on patient care and precision',
      icon: '🦷',
      filter: 'clinical',
      link: '#portfolio',
    },
    {
      title: 'Dental Motion Graphics',
      description: 'Creating engaging visual content for dental education and patient communication',
      icon: '🎬',
      filter: 'motion',
      link: '#portfolio',
    },
    {
      title: 'Digital Dentistry',
      description: 'Leveraging cutting-edge technology for diagnosis, treatment planning, and execution',
      icon: '💻',
      filter: 'digital',
      link: '#portfolio',
    },
    {
      title: 'Portfolio Websites',
      description: 'Custom-built React portfolios showcasing professional work with modern web technologies',
      icon: '🌐',
      filter: 'portfolios',
      link: '#portfolio',
    },
  ];

  const handleSkillClick = (filter) => {
    // Store the filter in sessionStorage
    sessionStorage.setItem('portfolioFilter', filter);
    // Navigate to portfolio section
    const portfolioSection = document.getElementById('portfolio');
    if (portfolioSection) {
      portfolioSection.scrollIntoView({ behavior: 'smooth' });
    }
    // Dispatch custom event to update portfolio filter
    window.dispatchEvent(new CustomEvent('filterPortfolio', { detail: filter }));
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
              I'm Dr. Mina Maged, a passionate dentist who bridges the gap between
              clinical excellence and creative innovation. With expertise in both
              chairside dentistry and digital motion design, I bring a unique
              perspective to modern dental practice.
            </p>
            <p className="about-text">
              My journey combines the precision of science with the artistry of
              visual storytelling, allowing me to not only provide exceptional
              patient care but also revolutionize how dental concepts are
              communicated through engaging motion graphics and digital content.
            </p>
          </motion.div>

          <div className="skills-grid">
            {skills.map((skill, index) => (
              <motion.div
                key={index}
                className="skill-card"
                variants={itemVariants}
                whileHover={{
                  y: -10,
                  transition: { duration: 0.3 },
                }}
                onClick={() => handleSkillClick(skill.filter)}
                style={{ cursor: 'pointer' }}
              >
                <div className="skill-icon">{skill.icon}</div>
                <h3 className="skill-title">{skill.title}</h3>
                <p className="skill-description">{skill.description}</p>
                <button className="skill-cta">
                  View Projects →
                </button>
                <div className="skill-glow"></div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default About;
