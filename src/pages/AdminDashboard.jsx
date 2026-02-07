import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useAuth } from '../context/AuthContext';
import appwriteService from '../services/appwrite';
import './AdminDashboard.css';
import { FaPlus, FaEdit, FaTrash, FaSignOutAlt, FaImage } from 'react-icons/fa';

const AdminDashboard = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingProject, setEditingProject] = useState(null);
  const [formData, setFormData] = useState({
    title: '',
    categories: [], // Changed from single category to array
    description: '',
    details: '',
    technologies: '',
    imageFile: null,
    imageId: '',
    galleryFiles: [],
    galleryImages: [],
    videoUrl: '', // For YouTube/Vimeo links
    videoFile: null, // For direct video upload
    videoId: '', // Stored video file ID in Appwrite
    liveDemo: '', // Live demo URL for portfolio projects
  });
  const [uploading, setUploading] = useState(false);
  const [videoOption, setVideoOption] = useState('url'); // 'url' or 'upload'

  useEffect(() => {
    if (!user) {
      navigate('/admin/login');
    } else {
      fetchProjects();
    }
  }, [user, navigate]);

  const fetchProjects = async () => {
    try {
      const data = await appwriteService.getProjects();
      setProjects(data);
    } catch (error) {
      console.error('Error fetching projects:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = async () => {
    await logout();
    navigate('/admin/login');
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleCategoryChange = (categoryValue) => {
    setFormData(prev => {
      const categories = prev.categories.includes(categoryValue)
        ? prev.categories.filter(cat => cat !== categoryValue) // Remove if already selected
        : [...prev.categories, categoryValue]; // Add if not selected
      return { ...prev, categories };
    });
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData(prev => ({ ...prev, imageFile: file }));
    }
  };

  const handleVideoFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      // Check file size (limit to 100MB)
      if (file.size > 100 * 1024 * 1024) {
        alert('Video file is too large. Please upload a file smaller than 100MB.');
        return;
      }
      setFormData(prev => ({ ...prev, videoFile: file }));
    }
  };

  const handleGalleryFilesChange = (e) => {
    if (e.target.files && e.target.files.length > 0) {
      const filesArray = Array.from(e.target.files);
      setFormData(prev => ({ ...prev, galleryFiles: [...prev.galleryFiles, ...filesArray] }));
    }
  };

  const removeGalleryFile = (index) => {
    const newFiles = formData.galleryFiles.filter((_, i) => i !== index);
    setFormData(prev => ({ ...prev, galleryFiles: newFiles }));
  };

  const removeGalleryImage = async (imageId) => {
    try {
      await appwriteService.deleteFile(imageId);
      const newGalleryImages = formData.galleryImages.filter(id => id !== imageId);
      setFormData(prev => ({ ...prev, galleryImages: newGalleryImages }));
    } catch (error) {
      console.error('Error deleting gallery image:', error);
      alert('Error deleting image. Please try again.');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Validate at least one category is selected
    if (formData.categories.length === 0) {
      alert('Please select at least one category for this project.');
      return;
    }
    
    setUploading(true);

    try {
      let imageId = formData.imageId;
      let galleryImages = formData.galleryImages || [];
      let videoId = formData.videoId;

      // Upload main cover image if new file selected
      if (formData.imageFile) {
        const uploadedFile = await appwriteService.uploadFile(formData.imageFile);
        imageId = uploadedFile.$id;
      }

      // Upload video file if selected
      if (formData.videoFile) {
        const uploadedVideo = await appwriteService.uploadFile(formData.videoFile);
        videoId = uploadedVideo.$id;
      }

      // Upload gallery images if new files selected
      if (formData.galleryFiles && formData.galleryFiles.length > 0) {
        const uploadPromises = formData.galleryFiles.map(file => 
          appwriteService.uploadFile(file)
        );
        const uploadedFiles = await Promise.all(uploadPromises);
        const newGalleryIds = uploadedFiles.map(file => file.$id);
        galleryImages = [...galleryImages, ...newGalleryIds];
      }

      const projectData = {
        title: formData.title,
        categories: formData.categories, // Now an array of categories
        description: formData.description,
        details: formData.details,
        technologies: formData.technologies.split(',').map(t => t.trim()),
        imageId: imageId,
        galleryImages: galleryImages,
        videoUrl: formData.videoUrl || '', // YouTube/Vimeo link
        liveDemo: formData.liveDemo || '', // Live demo URL for portfolio projects
      };

      // Only add videoId if it exists (attribute might not be created yet)
      if (videoId) {
        projectData.videoId = videoId;
      }

      if (editingProject) {
        await appwriteService.updateProject(editingProject.$id, projectData);
      } else {
        await appwriteService.createProject(projectData);
      }

      // Reset form and refresh
      resetForm();
      fetchProjects();
    } catch (error) {
      console.error('Error saving project:', error);
      
      // Show detailed error message
      let errorMessage = 'Error saving project. ';
      if (error.message) {
        errorMessage += error.message;
      }
      if (error.response) {
        errorMessage += '\n\nDetails: ' + JSON.stringify(error.response);
      }
      
      // Check for specific missing attribute errors
      if (error.message && error.message.includes('categories')) {
        errorMessage = 'Missing "categories" attribute in Appwrite.\n\nPlease add it:\n1. Go to Appwrite Console → Databases → projects\n2. Add Attribute: type String, key "categories", array YES';
      } else if (error.message && error.message.includes('videoId')) {
        errorMessage = 'Missing "videoId" attribute in Appwrite.\n\nPlease add it:\n1. Go to Appwrite Console → Databases → projects\n2. Add Attribute: type String, key "videoId", size 255';
      } else if (error.message && error.message.includes('videoUrl')) {
        errorMessage = 'Missing "videoUrl" attribute in Appwrite.\n\nPlease add it:\n1. Go to Appwrite Console → Databases → projects\n2. Add Attribute: type String, key "videoUrl", size 500';
      }
      
      alert(errorMessage);
    } finally {
      setUploading(false);
    }
  };

  const handleEdit = (project) => {
    setEditingProject(project);
    setFormData({
      title: project.title,
      categories: project.categories || [], // Array of categories
      description: project.description,
      details: project.details,
      technologies: project.technologies.join(', '),
      imageFile: null,
      imageId: project.imageId,
      galleryFiles: [],
      galleryImages: project.galleryImages || [],
      videoUrl: project.videoUrl || '',
      videoFile: null,
      videoId: project.videoId || '',
      liveDemo: project.liveDemo || '', // Live demo URL
    });
    setVideoOption(project.videoId ? 'upload' : 'url'); // Set option based on existing data
    setShowForm(true);
  };

  const handleDelete = async (project) => {
    if (window.confirm('Are you sure you want to delete this project? All images will be permanently deleted.')) {
      try {
        // Delete the project document
        await appwriteService.deleteProject(project.$id);
        
        // Delete main cover image
        if (project.imageId) {
          try {
            await appwriteService.deleteFile(project.imageId);
          } catch (error) {
            console.error('Error deleting main image:', error);
          }
        }
        
        // Delete all gallery images
        if (project.galleryImages && project.galleryImages.length > 0) {
          const deletePromises = project.galleryImages.map(imageId => 
            appwriteService.deleteFile(imageId).catch(error => {
              console.error(`Error deleting gallery image ${imageId}:`, error);
            })
          );
          await Promise.all(deletePromises);
        }
        
        fetchProjects();
        alert('Project and all associated images deleted successfully!');
      } catch (error) {
        console.error('Error deleting project:', error);
        alert('Error deleting project. Please try again.');
      }
    }
  };

  const resetForm = () => {
    setFormData({
      title: '',
      categories: [], // Reset to empty array
      description: '',
      details: '',
      technologies: '',
      imageFile: null,
      imageId: '',
      galleryFiles: [],
      galleryImages: [],
      videoUrl: '',
      videoFile: null,
      videoId: '',
      liveDemo: '', // Reset live demo URL
    });
    setVideoOption('url'); // Reset to URL option
    setEditingProject(null);
    setShowForm(false);
  };

  if (loading) {
    return <div className="admin-loading">Loading...</div>;
  }

  return (
    <div className="admin-dashboard">
      <div className="admin-header">
        <div className="admin-header-content">
          <h1>Portfolio Manager</h1>
          <div className="admin-actions">
            <button className="btn-add" onClick={() => setShowForm(!showForm)}>
              <FaPlus /> Add New Case
            </button>
            <button className="btn-logout" onClick={handleLogout}>
              <FaSignOutAlt /> Logout
            </button>
          </div>
        </div>
      </div>

      <div className="admin-content">
        {showForm && (
          <motion.div
            className="project-form-container"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <div className="form-header">
              <h2>{editingProject ? 'Edit' : 'Add New'} Case</h2>
              <button className="btn-close" onClick={resetForm}>×</button>
            </div>

            <form onSubmit={handleSubmit} className="project-form">
              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="title">Title *</label>
                  <input
                    type="text"
                    id="title"
                    name="title"
                    value={formData.title}
                    onChange={handleInputChange}
                    required
                    placeholder="Project title"
                  />
                </div>

                <div className="form-group">
                  <label>Categories * (Select all that apply)</label>
                  <div className="category-checkboxes">
                    <label className="checkbox-label">
                      <input
                        type="checkbox"
                        checked={formData.categories.includes('clinical')}
                        onChange={() => handleCategoryChange('clinical')}
                      />
                      <span>Clinical</span>
                    </label>
                    <label className="checkbox-label">
                      <input
                        type="checkbox"
                        checked={formData.categories.includes('motion')}
                        onChange={() => handleCategoryChange('motion')}
                      />
                      <span>Motion Graphics</span>
                    </label>
                    <label className="checkbox-label">
                      <input
                        type="checkbox"
                        checked={formData.categories.includes('digital')}
                        onChange={() => handleCategoryChange('digital')}
                      />
                      <span>Digital</span>
                    </label>
                    <label className="checkbox-label">
                      <input
                        type="checkbox"
                        checked={formData.categories.includes('portfolios')}
                        onChange={() => handleCategoryChange('portfolios')}
                      />
                      <span>Portfolios</span>
                    </label>
                  </div>
                  {formData.categories.length === 0 && (
                    <small className="error-text">Please select at least one category</small>
                  )}
                </div>
              </div>

              <div className="form-group">
                <label htmlFor="description">Short Description *</label>
                <input
                  type="text"
                  id="description"
                  name="description"
                  value={formData.description}
                  onChange={handleInputChange}
                  required
                  placeholder="Brief description for card"
                />
              </div>

              <div className="form-group">
                <label htmlFor="details">Full Description *</label>
                <textarea
                  id="details"
                  name="details"
                  value={formData.details}
                  onChange={handleInputChange}
                  required
                  rows="4"
                  placeholder="Detailed description for modal"
                />
              </div>

              <div className="form-group">
                <label htmlFor="technologies">Technologies (comma separated) *</label>
                <input
                  type="text"
                  id="technologies"
                  name="technologies"
                  value={formData.technologies}
                  onChange={handleInputChange}
                  required
                  placeholder="CAD/CAM, Digital Impressions, 3D Printing"
                />
              </div>

              {/* Live Demo URL - for Portfolio Projects */}
              <div className="form-group">
                <label htmlFor="liveDemo">Live Demo URL (Optional - for Portfolio websites)</label>
                <input
                  type="url"
                  id="liveDemo"
                  name="liveDemo"
                  value={formData.liveDemo}
                  onChange={handleInputChange}
                  placeholder="https://example.com or https://example.netlify.app"
                />
                <small style={{ color: 'var(--color-text-secondary)', display: 'block', marginTop: '0.5rem' }}>
                  Add a live demo link for portfolio projects. Visitors can click to test the site!
                </small>
              </div>

              {/* Video Section - Choose URL or Upload */}
              <div className="form-group">
                <label>
                  <FaImage /> Video (Optional - Works for all categories)
                </label>
                
                {/* Toggle between URL and Upload */}
                <div className="video-option-toggle">
                  <button
                    type="button"
                    className={`toggle-btn ${videoOption === 'url' ? 'active' : ''}`}
                    onClick={() => setVideoOption('url')}
                  >
                    📺 YouTube/Vimeo Link
                  </button>
                  <button
                    type="button"
                    className={`toggle-btn ${videoOption === 'upload' ? 'active' : ''}`}
                    onClick={() => setVideoOption('upload')}
                  >
                    📤 Upload Video File
                  </button>
                </div>

                {/* Video URL Input */}
                {videoOption === 'url' && (
                  <div className="video-url-section">
                    <input
                      type="url"
                      id="videoUrl"
                      name="videoUrl"
                      value={formData.videoUrl}
                      onChange={handleInputChange}
                      placeholder="https://www.youtube.com/watch?v=... or https://vimeo.com/..."
                    />
                    <small className="image-info">
                      Paste a YouTube or Vimeo link. Example: https://www.youtube.com/watch?v=dQw4w9WgXcQ
                    </small>
                  </div>
                )}

                {/* Video File Upload */}
                {videoOption === 'upload' && (
                  <div className="video-upload-section">
                    <input
                      type="file"
                      id="videoFile"
                      accept="video/*"
                      onChange={handleVideoFileChange}
                    />
                    {formData.videoFile && (
                      <div className="file-preview">
                        <span>✅ {formData.videoFile.name} ({(formData.videoFile.size / (1024 * 1024)).toFixed(2)} MB)</span>
                      </div>
                    )}
                    {formData.videoId && !formData.videoFile && (
                      <small className="image-info">✅ Video file already uploaded. Upload a new file to replace it.</small>
                    )}
                    <small className="image-info">
                      Upload .mp4, .mov, .avi files (max 100MB). For larger files, use YouTube/Vimeo instead.
                    </small>
                  </div>
                )}
              </div>

              <div className="form-group">
                <label htmlFor="image">
                  <FaImage /> Cover Image (Main) *
                </label>
                <input
                  type="file"
                  id="image"
                  accept="image/*"
                  onChange={handleFileChange}
                  required={!editingProject}
                />
                {formData.imageId && !formData.imageFile && (
                  <small className="image-info">Current image will be kept if no new image is uploaded</small>
                )}
              </div>

              <div className="form-group">
                <label htmlFor="gallery">
                  <FaImage /> Gallery Images (Optional)
                </label>
                <input
                  type="file"
                  id="gallery"
                  accept="image/*"
                  multiple
                  onChange={handleGalleryFilesChange}
                />
                <small className="image-info">Select multiple images to add to the gallery</small>
                
                {/* Preview new gallery files */}
                {formData.galleryFiles.length > 0 && (
                  <div className="gallery-preview">
                    <p className="preview-title">New Images ({formData.galleryFiles.length}):</p>
                    <div className="preview-grid">
                      {formData.galleryFiles.map((file, index) => (
                        <div key={index} className="preview-item">
                          <img src={URL.createObjectURL(file)} alt={`Preview ${index + 1}`} />
                          <button
                            type="button"
                            className="remove-preview-btn"
                            onClick={() => removeGalleryFile(index)}
                            title="Remove"
                          >
                            ×
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Show existing gallery images */}
                {formData.galleryImages && formData.galleryImages.length > 0 && (
                  <div className="gallery-preview">
                    <p className="preview-title">Existing Gallery ({formData.galleryImages.length}):</p>
                    <div className="preview-grid">
                      {formData.galleryImages.map((imageId, index) => (
                        <div key={imageId} className="preview-item">
                          <img src={appwriteService.getFileView(imageId)} alt={`Gallery ${index + 1}`} />
                          <button
                            type="button"
                            className="remove-preview-btn"
                            onClick={() => removeGalleryImage(imageId)}
                            title="Delete from storage"
                          >
                            ×
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              <div className="form-actions">
                <button type="button" className="btn-cancel" onClick={resetForm}>
                  Cancel
                </button>
                <button type="submit" className="btn-submit" disabled={uploading}>
                  {uploading ? 'Saving...' : (editingProject ? 'Update' : 'Create')} Case
                </button>
              </div>
            </form>
          </motion.div>
        )}

        <div className="projects-grid">
          {projects.length === 0 ? (
            <div className="no-projects">
              <p>No cases yet. Add your first case to get started!</p>
            </div>
          ) : (
            projects.map((project) => (
              <motion.div
                key={project.$id}
                className="project-card"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
              >
                <div className="project-image">
                  {project.imageId && (
                    <img
                      src={appwriteService.getFileView(project.imageId)}
                      alt={project.title}
                    />
                  )}
                </div>
                <div className="project-info">
                  <div className="project-categories">
                    {project.categories && project.categories.map((cat, index) => (
                      <span key={index} className="project-category">{cat}</span>
                    ))}
                  </div>
                  <h3>{project.title}</h3>
                  <p>{project.description}</p>
                  <div className="project-actions">
                    <button className="btn-edit" onClick={() => handleEdit(project)}>
                      <FaEdit /> Edit
                    </button>
                    <button
                      className="btn-delete"
                      onClick={() => handleDelete(project)}
                    >
                      <FaTrash /> Delete
                    </button>
                  </div>
                </div>
              </motion.div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
