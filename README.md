# Dr. Fatma Elzahraa - Portfolio Website

A modern, dark-themed portfolio website showcasing the work of Dr. Fatma Elzahraa, a professional dentist specializing in clinical dentistry, dental motion graphics, and digital dentistry.

## ✨ NEW: Admin CMS System

**Manage your portfolio projects without editing code!**

Your portfolio now includes a complete Content Management System (CMS):
- 🔐 Secure admin login
- 📝 Add/edit/delete projects through a dashboard
- 🖼️ Upload project images
- 🎬 **Video support for motion graphics** (YouTube, Vimeo, direct links)
- 🖼️ **Multiple images per project** (gallery system)
- 🚀 Changes appear instantly on your site
- ☁️ Powered by Appwrite Cloud (completely FREE)

**Quick Start:**
1. See `ADMIN_CMS_GUIDE.md` for overview
2. Follow `APPWRITE_SETUP.md` for setup (~10 minutes)
3. See `VIDEO_SUPPORT.md` for adding videos to motion graphics
4. See `GALLERY_SYSTEM.md` for multi-image galleries
5. Access admin at: `/admin/login`

## 🎨 Features

- **Modern Dark Theme**: Sleek, futuristic design with deep charcoal/black base and cyan/silver accents
- **Interactive Animations**: Smooth scroll animations and hover effects using Framer Motion
- **Fully Responsive**: Optimized for both mobile and desktop devices
- **Portfolio Showcase**: Filterable project gallery with CMS integration
- **Multi-Image Galleries**: Upload multiple images per project with navigation
- **Video Support**: Embed YouTube, Vimeo, or direct video links for motion graphics
- **Contact Form**: Functional contact form with social media integration
- **Particle Animation**: Dynamic canvas-based particle system in the hero section
- **Admin Dashboard**: Complete CMS for managing portfolio projects
- **Interactive Skill Cards**: Click skills in About section to filter portfolio

## 🚀 Tech Stack

- **React 18**: Modern React with hooks
- **Vite**: Fast build tool and development server
- **Framer Motion**: Advanced animations and transitions
- **React Icons**: Professional icon library
- **React Router**: Client-side routing for admin pages
- **Appwrite**: Backend-as-a-Service (auth, database, storage)
- **CSS3**: Custom styling with CSS variables and modern features

## 📋 Prerequisites

Before you begin, ensure you have the following installed:
- **Node.js** (version 16 or higher) - [Download here](https://nodejs.org/)
- **npm** (comes with Node.js)

## 🛠️ Installation & Setup

1. **Install Node.js** (if not already installed):
   - Download and install from [nodejs.org](https://nodejs.org/)
   - Verify installation: `node --version` and `npm --version`

2. **Install Dependencies**:
   ```bash
   npm install
   ```

3. **Start Development Server**:
   ```bash
   npm run dev
   ```
   The site will be available at `http://localhost:5173`

4. **Build for Production**:
   ```bash
   npm run build
   ```
   The production-ready files will be in the `dist` folder

5. **Preview Production Build**:
   ```bash
   npm run preview
   ```

## 📁 Project Structure

```
portfolio/
├── src/
│   ├── components/
│   │   ├── Hero.jsx         # Hero section with particle animation
│   │   ├── Hero.css
│   │   ├── About.jsx        # About section with skills
│   │   ├── About.css
│   │   ├── Portfolio.jsx    # Portfolio gallery with filters
│   │   ├── Portfolio.css
│   │   ├── Contact.jsx      # Contact form and social links
│   │   └── Contact.css
│   ├── App.jsx              # Main application component
│   ├── App.css              # Global app styles
│   ├── main.jsx             # Application entry point
│   └── index.css            # Global CSS variables and resets
├── index.html               # HTML template
├── package.json             # Dependencies and scripts
├── vite.config.js           # Vite configuration
├── netlify.toml             # Netlify deployment config
└── README.md                # This file
```

## 🎯 Sections

### Hero Section
- **Professional profile picture** with glowing effect (circular frame)
- Prominent introduction with Dr. Fatma Elzahraa's name
- Animated particle background
- Call-to-action buttons
- Smooth scroll indicator

### About Section
- Professional bio
- Three skill cards:
  - Clinical Dentistry
  - Dental Motion Graphics
  - Digital Dentistry

### Portfolio Section
- Filterable project gallery
- Categories: All, Clinical, Motion Graphics, Digital
- Placeholder images (ready to be replaced)
- Hover effects and smooth transitions

### Contact Section
- Contact form with validation
- Social media icons (LinkedIn, Instagram, Twitter, YouTube, Email)
- Contact details display
- Professional footer

## 🌐 Deployment

### Netlify Deployment

This project is configured for easy deployment on Netlify:

1. **Push to GitHub**:
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git remote add origin <your-github-repo>
   git push -u origin main
   ```

2. **Deploy on Netlify**:
   - Go to [netlify.com](https://www.netlify.com/)
   - Click "New site from Git"
   - Connect your GitHub repository
   - Netlify will auto-detect the build settings from `netlify.toml`
   - Click "Deploy site"

The `netlify.toml` file is already configured with:
- Build command: `npm run build`
- Publish directory: `dist`
- SPA redirect rules

## 🎨 Customization

### Profile Picture
Add your professional photo:
1. Place a square image named `profile.png` in the `public/` folder
2. Recommended size: 1000x1000px
3. Format: PNG (with transparent background) or JPG
4. See **PROFILE_PICTURE_GUIDE.md** for detailed instructions

### Colors
Edit CSS variables in `src/index.css`:
```css
:root {
  --color-bg-primary: #0a0a0a;
  --color-accent-cyan: #00d9ff;
  --color-accent-silver: #c0c0c0;
  /* ... more variables */
}
```

### Content
- **Personal Information**: Update text in component files
- **Portfolio Items**: Modify the `projects` array in `src/components/Portfolio.jsx`
- **Social Links**: Update the `socialLinks` array in `src/components/Contact.jsx`
- **Images**: Replace placeholder images with your own

### Adding Real Images
Replace placeholder images in `Portfolio.jsx`:
```javascript
image: '/assets/your-image.jpg'
```

Then add your images to the `public/assets/` folder.

## 📱 Responsive Breakpoints

- Desktop: > 968px
- Tablet: 768px - 968px
- Mobile: < 768px

## 🔧 Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build locally

## 🎭 Animation Features

- Scroll-triggered animations using Framer Motion
- Particle system with canvas
- Hover effects on cards and buttons
- Smooth page transitions
- Interactive filter buttons

## 📝 To-Do / Future Enhancements

- [ ] Add real project images and content
- [ ] Implement actual form submission (e.g., EmailJS, Formspree)
- [ ] Add blog section
- [ ] Integrate CMS for easy content management
- [ ] Add more portfolio categories
- [ ] Implement project detail modal/page
- [ ] Add testimonials section
- [ ] Integrate Google Analytics

## 📄 License

This project is open source and available for personal use.

## 👤 Author

**Dr. Fatma Elzahraa**
- Digital Dentist & Dental Motion Designer
- Merging Science with Creativity

---

Built with ❤️ using React and Vite
