import React, { useRef, useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { motion, useInView } from 'framer-motion';
import appwriteService from '../services/appwrite';
import './Portfolio.css';

const Portfolio = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });
  const [filter, setFilter] = useState('all');
  const [selectedProject, setSelectedProject] = useState(null);
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  // Fetch projects from Appwrite
  useEffect(() => {
    fetchProjects();
  }, []);

  const fetchProjects = async () => {
    try {
      setLoading(true);
      const fetchedProjects = await appwriteService.getProjects();
      
      // If no projects from Appwrite, use placeholders
      if (!fetchedProjects || fetchedProjects.length === 0) {
        setProjects(getPlaceholderProjects());
        setLoading(false);
        return;
      }
      
      // Transform Appwrite data to match our component structure
      const transformedProjects = fetchedProjects.map(project => ({
        id: project.$id,
        title: project.title,
        categories: project.categories || [], // Array of categories
        description: project.description,
        details: project.details,
        technologies: project.technologies,
        image: project.imageId 
          ? appwriteService.getFileView(project.imageId)
          : 'https://via.placeholder.com/400x300/1a1a1a/00d9ff?text=No+Image',
        galleryImages: project.galleryImages 
          ? project.galleryImages.map(id => appwriteService.getFileView(id))
          : [],
        videoUrl: project.videoUrl || '',
        videoId: project.videoId || '', // Uploaded video file ID
        videoFileUrl: project.videoId 
          ? appwriteService.getFileView(project.videoId)
          : null,
        liveDemo: project.liveDemo || '', // Live demo URL for portfolio projects
      }));
      
      setProjects(transformedProjects);
    } catch (error) {
      console.error('Error fetching projects:', error);
      // Fallback to placeholder data if Appwrite is not set up yet
      setProjects(getPlaceholderProjects());
    } finally {
      setLoading(false);
    }
  };

  // Placeholder data for when Appwrite is not configured
  const getPlaceholderProjects = () => [
    {
      id: 1,
      title: 'Dental Case Study',
      categories: ['clinical'], // Changed to array
      description: 'Complex restorative procedure with digital workflow',
      image: 'https://via.placeholder.com/400x300/1a1a1a/00d9ff?text=Clinical+Case',
      details: 'Comprehensive treatment including crown and bridge work using CAD/CAM technology. Patient presented with multiple missing teeth and required full mouth rehabilitation.',
      technologies: ['CAD/CAM', 'Digital Impressions', 'Ceramic Restorations'],
    },
    {
      id: 2,
      title: 'Motion Graphics Reel',
      categories: ['motion'], // Changed to array
      description: 'Educational animation for dental procedures',
      image: 'https://via.placeholder.com/400x300/1a1a1a/c0c0c0?text=Motion+Design',
      details: 'Animated video series explaining complex dental procedures to patients. Created using industry-standard motion graphics software to simplify technical concepts.',
      technologies: ['After Effects', '3D Animation', 'Medical Illustration'],
    },
    {
      id: 3,
      title: 'Digital Smile Design',
      categories: ['digital'], // Changed to array
      description: 'CAD/CAM workflow for smile makeover',
      image: 'https://via.placeholder.com/400x300/1a1a1a/00d9ff?text=Digital+Design',
      details: 'Complete digital workflow from initial scan to final restoration. Used advanced software to design and fabricate custom veneers for optimal aesthetics.',
      technologies: ['Digital Smile Design', 'Intraoral Scanner', '3D Printing'],
    },
    {
      id: 4,
      title: 'Implant Planning',
      categories: ['digital'], // Changed to array
      description: '3D guided implant surgery planning',
      image: 'https://via.placeholder.com/400x300/1a1a1a/c0c0c0?text=Implant+Case',
      details: 'Comprehensive implant treatment planning using CBCT scans and surgical guide design. Ensured precise implant placement with digital workflow.',
      technologies: ['CBCT Imaging', 'Surgical Guides', 'Digital Planning'],
    },
    {
      id: 5,
      title: 'Patient Education Video',
      categories: ['motion'], // Changed to array
      description: 'Animated guide for oral hygiene',
      image: 'https://via.placeholder.com/400x300/1a1a1a/00d9ff?text=Education+Video',
      details: 'Series of educational videos demonstrating proper brushing, flossing, and oral care techniques. Designed to be engaging and easy to understand for all ages.',
      technologies: ['2D Animation', 'Motion Graphics', 'Voice Over'],
    },
    {
      id: 6,
      title: 'Orthodontic Treatment',
      categories: ['clinical'], // Changed to array
      description: 'Comprehensive orthodontic case',
      image: 'https://via.placeholder.com/400x300/1a1a1a/c0c0c0?text=Ortho+Case',
      details: 'Full orthodontic treatment including clear aligner therapy. Digital treatment planning from start to finish with predictable results.',
      technologies: ['Clear Aligners', 'Digital Treatment Planning', '3D Scanning'],
    },
    {
      id: 7,
      title: 'Dr. Mina Maged Portfolio',
      categories: ['portfolios'], // Portfolio category
      description: 'Modern React portfolio with admin CMS, galleries, and real-time features',
      image: 'https://via.placeholder.com/400x300/1a1a1a/00d9ff?text=Portfolio+Website',
      details: 'A fully-featured portfolio website built with React 18 and Vite, showcasing professional work with an integrated admin dashboard. Features include multi-image galleries with keyboard navigation, video support (YouTube/Vimeo + direct uploads), multi-category filtering, real-time contact form via EmailJS, and complete CMS powered by Appwrite. Built without a traditional backend using modern JAMstack architecture.',
      technologies: ['React', 'Vite', 'Appwrite', 'EmailJS', 'Framer Motion', 'React Router', 'CSS3', 'Netlify'],
      liveDemo: window.location.origin, // Link to current site
    },
  ];

  // Listen for filter events from About section
  useEffect(() => {
    const handleFilterEvent = (event) => {
      setFilter(event.detail);
    };

    window.addEventListener('filterPortfolio', handleFilterEvent);

    // Check if there's a stored filter on mount
    const storedFilter = sessionStorage.getItem('portfolioFilter');
    if (storedFilter) {
      setFilter(storedFilter);
      sessionStorage.removeItem('portfolioFilter');
    }

    return () => {
      window.removeEventListener('filterPortfolio', handleFilterEvent);
    };
  }, []);

  // Close modal on ESC key
  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape') setSelectedProject(null);
    };
    window.addEventListener('keydown', handleEscape);
    return () => window.removeEventListener('keydown', handleEscape);
  }, []);

  // Prevent body scroll when modal is open
  useEffect(() => {
    if (selectedProject) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [selectedProject]);

  const handleViewDetails = (project) => {
    setSelectedProject(project);
    setCurrentImageIndex(0); // Reset to first image
  };

  const closeModal = () => {
    setSelectedProject(null);
    setCurrentImageIndex(0); // Reset index when closing
  };

  // Gallery navigation functions
  const nextImage = () => {
    if (selectedProject && selectedProject.galleryImages && selectedProject.galleryImages.length > 0) {
      const totalImages = selectedProject.galleryImages.length;
      setCurrentImageIndex((prev) => (prev + 1) % totalImages);
    }
  };

  const prevImage = () => {
    if (selectedProject && selectedProject.galleryImages && selectedProject.galleryImages.length > 0) {
      const totalImages = selectedProject.galleryImages.length;
      setCurrentImageIndex((prev) => (prev - 1 + totalImages) % totalImages);
    }
  };

  // Helper function to get embed URL for videos
  const getVideoEmbed = (url) => {
    if (!url) return null;

    console.log('Processing video URL:', url); // Debug log

    // YouTube - Regular videos and Shorts
    const youtubeMatch = url.match(/(?:youtube\.com\/(?:watch\?v=|shorts\/)|youtu\.be\/)([a-zA-Z0-9_-]+)/);
    if (youtubeMatch) {
      const embedUrl = `https://www.youtube.com/embed/${youtubeMatch[1]}`;
      console.log('YouTube video detected, embed URL:', embedUrl); // Debug log
      return embedUrl;
    }

    // Vimeo
    const vimeoMatch = url.match(/vimeo\.com\/(\d+)/);
    if (vimeoMatch) {
      const embedUrl = `https://player.vimeo.com/video/${vimeoMatch[1]}`;
      console.log('Vimeo video detected, embed URL:', embedUrl); // Debug log
      return embedUrl;
    }

    // Direct video URL (.mp4, .webm, .ogg)
    if (url.match(/\.(mp4|webm|ogg)$/i)) {
      console.log('Direct video URL detected:', url); // Debug log
      return url; // Return as is for direct video
    }

    console.log('No valid video format detected'); // Debug log
    return null;
  };

  // Keyboard navigation
  useEffect(() => {
    const handleKeyPress = (e) => {
      if (selectedProject && selectedProject.galleryImages && selectedProject.galleryImages.length > 0) {
        if (e.key === 'ArrowRight') nextImage();
        if (e.key === 'ArrowLeft') prevImage();
        if (e.key === 'Escape') closeModal();
      }
    };

    if (selectedProject) {
      window.addEventListener('keydown', handleKeyPress);
      return () => window.removeEventListener('keydown', handleKeyPress);
    }
  }, [selectedProject, currentImageIndex]);

  const filters = [
    { id: 'all', label: 'All Cases' },
    { id: 'fixed', label: 'Fixed' },
    { id: 'removable', label: 'Removable' },
    { id: 'surgery', label: 'Surgery' },
    { id: 'endo', label: 'Endo' },
    { id: 'operative', label: 'Operative' },
    { id: 'pedo', label: 'Pedo' },
    { id: 'perio', label: 'Perio' },
  ];

  const filteredProjects =
    filter === 'all'
      ? projects
      : projects.filter((project) => 
          project.categories && project.categories.includes(filter)
        );

  // Listen for filter events from About section
  useEffect(() => {
    const handleFilterEvent = (event) => {
      setFilter(event.detail);
    };

    window.addEventListener('filterPortfolio', handleFilterEvent);

    // Check if there's a stored filter on mount
    const storedFilter = sessionStorage.getItem('portfolioFilter');
    if (storedFilter) {
      setFilter(storedFilter);
      sessionStorage.removeItem('portfolioFilter');
    }

    return () => {
      window.removeEventListener('filterPortfolio', handleFilterEvent);
    };
  }, []);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 50, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.5,
        ease: 'easeOut',
      },
    },
  };

  return (
    <section id="portfolio" className="portfolio section" ref={ref}>
      <div className="container">
        <motion.div
          className="portfolio-content"
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
        >
          <motion.div className="section-header" variants={itemVariants}>
            <h2 className="section-title">Portfolio</h2>
            <div className="title-underline"></div>
            <p className="section-subtitle">
              A showcase of my work in clinical dentistry, motion design, and
              digital innovation
            </p>
          </motion.div>

          <motion.div className="portfolio-filters" variants={itemVariants}>
            {filters.map((filterItem) => (
              <button
                key={filterItem.id}
                className={`filter-btn ${
                  filter === filterItem.id ? 'active' : ''
                }`}
                onClick={() => setFilter(filterItem.id)}
              >
                {filterItem.label}
              </button>
            ))}
          </motion.div>

          <motion.div
            className="portfolio-grid"
            layout
            variants={containerVariants}
          >
            {filteredProjects.map((project) => (
              <motion.div
                key={project.id}
                className="portfolio-item"
                variants={itemVariants}
                layout
                whileHover={{ y: -10 }}
                transition={{ duration: 0.3 }}
                onClick={() => handleViewDetails(project)}
              >
                <div className="portfolio-image-wrapper">
                  <img
                    src={project.image}
                    alt={project.title}
                    className="portfolio-image"
                  />
                  <div className="portfolio-overlay">
                    <div className="portfolio-overlay-content">
                      <h3 className="portfolio-title">{project.title}</h3>
                      <p className="portfolio-description">
                        {project.description}
                      </p>
                      <button 
                        className="portfolio-btn"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleViewDetails(project);
                        }}
                      >
                        View Details
                      </button>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </div>

      {/* Project Detail Modal - Rendered as Portal */}
      {selectedProject && createPortal(
        <motion.div
          className="modal-overlay"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={closeModal}
        >
          <motion.div
            className="modal-content"
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.8, opacity: 0 }}
            onClick={(e) => e.stopPropagation()}
          >
            <button className="modal-close" onClick={closeModal}>
              ×
            </button>
            
            {/* Video Player - Show uploaded video file OR YouTube/Vimeo link */}
            {(selectedProject.videoFileUrl || (selectedProject.videoUrl && getVideoEmbed(selectedProject.videoUrl))) && (
              <div className="modal-video">
                {selectedProject.videoFileUrl ? (
                  // Uploaded video file from Appwrite
                  <video controls>
                    <source src={selectedProject.videoFileUrl} type="video/mp4" />
                    Your browser does not support the video tag.
                  </video>
                ) : (() => {
                  const embedUrl = getVideoEmbed(selectedProject.videoUrl);
                  const isDirectVideo = embedUrl && embedUrl.match(/\.(mp4|webm|ogg)$/i);
                  
                  return isDirectVideo ? (
                    // Direct video URL
                    <video controls>
                      <source src={embedUrl} type="video/mp4" />
                      Your browser does not support the video tag.
                    </video>
                  ) : (
                    // Embedded video (YouTube, Vimeo)
                    <iframe
                      src={embedUrl}
                      title={selectedProject.title}
                      frameBorder="0"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                    ></iframe>
                  );
                })()}
              </div>
            )}
            
            <div className="modal-image-container">
              {selectedProject.galleryImages && selectedProject.galleryImages.length > 0 ? (
                <>
                  {/* Gallery Navigation */}
                  {selectedProject.galleryImages.length > 1 && (
                    <>
                      <button className="gallery-nav gallery-nav-prev" onClick={prevImage}>
                        ‹
                      </button>
                      <button className="gallery-nav gallery-nav-next" onClick={nextImage}>
                        ›
                      </button>
                    </>
                  )}
                  
                  {/* Main Gallery Image */}
                  <div className="modal-image">
                    <img 
                      src={selectedProject.galleryImages[currentImageIndex]} 
                      alt={`${selectedProject.title} - Image ${currentImageIndex + 1}`} 
                    />
                  </div>
                  
                  {/* Image Counter */}
                  {selectedProject.galleryImages.length > 1 && (
                    <div className="image-counter">
                      {currentImageIndex + 1} / {selectedProject.galleryImages.length}
                    </div>
                  )}
                  
                  {/* Thumbnail Strip */}
                  {selectedProject.galleryImages.length > 1 && (
                    <div className="thumbnail-strip">
                      {selectedProject.galleryImages.map((img, index) => (
                        <div 
                          key={index}
                          className={`thumbnail ${index === currentImageIndex ? 'active' : ''}`}
                          onClick={() => setCurrentImageIndex(index)}
                        >
                          <img src={img} alt={`Thumbnail ${index + 1}`} />
                        </div>
                      ))}
                    </div>
                  )}
                </>
              ) : (
                // Fallback to main image if no gallery
                <div className="modal-image">
                  <img src={selectedProject.image} alt={selectedProject.title} />
                </div>
              )}
            </div>

            <div className="modal-body">
              <div className="modal-categories">
                {selectedProject.categories && selectedProject.categories.map((cat, index) => (
                  <span key={index} className="modal-category">{cat}</span>
                ))}
              </div>
              <h2 className="modal-title">{selectedProject.title}</h2>
              <p className="modal-description">{selectedProject.details}</p>

              {/* Live Demo Button for Portfolio Projects */}
              {selectedProject.liveDemo && (
                <div className="modal-live-demo">
                  <a 
                    href={selectedProject.liveDemo} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="live-demo-btn"
                  >
                    🌐 View Live Demo
                  </a>
                  <p className="demo-hint">Click to test this portfolio in action!</p>
                </div>
              )}

              {selectedProject.technologies && (
                <div className="modal-technologies">
                  <h3 className="modal-tech-title">Technologies Used:</h3>
                  <div className="modal-tech-list">
                    {selectedProject.technologies.map((tech, index) => (
                      <span key={index} className="tech-tag">
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </motion.div>
        </motion.div>,
        document.body
      )}
    </section>
  );
};

export default Portfolio;
