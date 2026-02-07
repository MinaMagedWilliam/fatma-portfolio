# Portfolio Website Template - Complete Build Prompt

Use this prompt to create a professional portfolio website with the same features and architecture.

---

## 🎯 Project Overview

Create a modern, dark-themed portfolio website for a professional with dual expertise (e.g., dentist + digital creator, developer + designer, etc.). The site should feature a complete admin CMS for content management without needing a traditional backend.

---

## 📋 Complete Feature List

### **Frontend Features**

#### 1. **Hero Section**
- Full-screen landing with professional headline
- Animated name/title display
- Smooth scroll to sections
- Parallax or gradient effects
- CTA button to portfolio/contact

#### 2. **About Section**
- Professional bio with rich text
- Skill cards representing different expertise areas (3-4 cards)
- Each card is clickable and filters the portfolio section
- Smooth scroll + highlight animation to portfolio
- Profile picture with hover effects

#### 3. **Portfolio Section**
- Grid/masonry layout for project cards
- **Filtering System:**
  - Filter by clicking skill cards in About section
  - Projects can belong to multiple categories (multi-category support)
  - Animated transitions when filtering
- **Project Cards:**
  - Thumbnail image
  - Title and category badges
  - Short description
  - Hover effects with scale/shadow
- **Project Modal (Detail View):**
  - Full project details
  - **Multi-Image Gallery:**
    - Multiple images per project
    - Previous/Next navigation buttons
    - Thumbnail strip at bottom
    - Image counter (1/5, 2/5, etc.)
    - Keyboard navigation (arrow keys)
    - Smooth transitions between images
  - **Video Support:**
    - YouTube/Vimeo embed support
    - Direct video file upload (.mp4)
    - Responsive 16:9 video player
    - Choice between URL or file upload
  - Multiple category badges
  - Technologies/tools used (tags)
  - Close button with escape key support
  - Click outside to close

#### 4. **Contact Section**
- **Contact Form:**
  - Name, Email, Subject, Message fields
  - Real email sending via EmailJS (no backend)
  - Loading state ("Sending..." button)
  - Success/error messages with animations
  - Form validation
  - Auto-clear after successful send
- **Social Media Links:**
  - Icon buttons for LinkedIn, Instagram, Facebook, YouTube, Email
  - Hover animations (scale, lift effect)
  - Open in new tabs
- **Contact Details:**
  - Email address display
  - Location
- **Footer:**
  - Copyright with clickable name (link to social profile)
  - Tagline/motto
  - Current year (dynamic)

#### 5. **Admin Dashboard (CMS)**
- **Authentication:**
  - Login page with email/password
  - Session management via Appwrite
  - Auto-redirect if already logged in
  - Logout functionality
- **Project Management:**
  - Create, Edit, Delete projects
  - **Form Fields:**
    - Title (text)
    - Multiple categories (checkboxes)
    - Description (short text for cards)
    - Details (long text for modal)
    - Technologies (comma-separated tags)
    - Main image upload
    - Gallery images upload (multiple files)
    - Video option toggle (URL vs Upload)
    - Video URL field (YouTube/Vimeo)
    - Video file upload (.mp4, 100MB limit)
  - **Gallery Management:**
    - Upload multiple images
    - Preview thumbnails
    - Remove individual images
    - Reorder images (optional)
  - **Video Management:**
    - Toggle between URL and file upload
    - Video file preview (name + size)
    - 100MB file size limit
    - Validation and error messages
- **Project List:**
  - View all projects
  - Edit and Delete buttons
  - Category filters
  - Search functionality (optional)
- **Data Management:**
  - Complete cleanup on delete (removes all images + videos from storage)
  - Error handling with helpful messages
  - Loading states during uploads

---

## 🎨 Design Specifications

### **Color Scheme**
- **Background:** Deep charcoal/black (#0a0a0a, #111111)
- **Text Primary:** White/Off-white (#ffffff, #f5f5f5)
- **Text Secondary:** Light gray (#a0a0a0)
- **Accent Primary:** Cyan/Teal (#00d9ff, #00b8d4)
- **Accent Secondary:** Silver/Light cyan (#c0c0c0)
- **Gradients:** Cyan to blue/teal for buttons and highlights

### **Typography**
- **Headings:** 600-700 font weight, large sizes (2rem-4rem)
- **Body:** 400 font weight, readable sizes (1rem-1.125rem)
- **Font Stack:** System fonts or modern sans-serif (Inter, Roboto, Poppins)
- **Spacing:** Generous line-height (1.6-1.8)

### **Animations & Effects**
- **Framer Motion** for all animations
- **Scroll animations:** Fade in + slide up when sections enter viewport
- **Hover effects:** Scale (1.05-1.1), lift (translateY), glow (box-shadow)
- **Page transitions:** Smooth, eased (0.3s-0.6s duration)
- **Stagger animations:** For lists, grids, cards (0.1s-0.2s delay)
- **Loading states:** Spinners, skeleton screens, or pulse effects

### **Responsive Design**
- **Mobile-first approach**
- **Breakpoints:**
  - Mobile: < 768px
  - Tablet: 768px - 968px
  - Desktop: > 968px
- **Grid layouts:** CSS Grid or Flexbox
- **Touch-friendly:** Large tap targets (44px minimum)
- **Mobile menu:** Hamburger menu for navigation

---

## 🛠️ Tech Stack

### **Frontend Framework**
- **React 18** with functional components and hooks
- **Vite** for build tooling (fast dev server, optimized builds)
- **React Router** for client-side routing (admin pages)

### **Styling**
- **CSS Modules** or **plain CSS** with CSS variables
- **Framer Motion** for animations
- **React Icons** for icon library

### **Backend/Services (BaaS)**
- **Appwrite Cloud** (free tier):
  - Authentication (email/password)
  - Database (portfolio projects collection)
  - Storage (images and video files)
  - No backend code needed!

### **Email Service**
- **EmailJS** (free tier: 200 emails/month)
- No server-side code required

### **Deployment**
- **Netlify** (recommended) or Vercel
- Continuous deployment from GitHub
- Automatic HTTPS
- SPA redirect handling

---

## 📦 Project Structure

```
portfolio/
├── public/
│   └── (static assets)
├── src/
│   ├── components/
│   │   ├── Hero.jsx
│   │   ├── Hero.css
│   │   ├── About.jsx
│   │   ├── About.css
│   │   ├── Portfolio.jsx
│   │   ├── Portfolio.css
│   │   ├── Contact.jsx
│   │   └── Contact.css
│   ├── pages/
│   │   ├── AdminLogin.jsx
│   │   ├── AdminLogin.css
│   │   ├── AdminDashboard.jsx
│   │   └── AdminDashboard.css
│   ├── config/
│   │   ├── appwrite.js       # Appwrite credentials
│   │   └── emailjs.js        # EmailJS credentials
│   ├── services/
│   │   └── appwrite.js       # Appwrite SDK wrapper
│   ├── context/
│   │   └── AuthContext.jsx   # Authentication state
│   ├── App.jsx
│   ├── App.css
│   ├── index.css             # Global styles + CSS variables
│   └── main.jsx
├── .gitignore
├── package.json
├── vite.config.js
├── netlify.toml              # Netlify deployment config
└── README.md
```

---

## 🔧 Setup Instructions

### **Step 1: Initialize Project**

```bash
npm create vite@latest portfolio -- --template react
cd portfolio
npm install
```

### **Step 2: Install Dependencies**

```bash
npm install react-router-dom framer-motion react-icons appwrite @emailjs/browser
```

### **Step 3: Set Up Appwrite**

1. **Create account:** https://cloud.appwrite.io
2. **Create project:** Name it "Portfolio"
3. **Create database:** "portfolio-db"
4. **Create collection:** "projects"
5. **Add attributes:**
   - `title` (String, 255, required)
   - `categories` (String, 50, required=NO, **Array=YES**)
   - `description` (String, 500, required)
   - `details` (String, 2000, required)
   - `technologies` (String, 100, required=NO, **Array=YES**)
   - `imageId` (String, 255, required=NO)
   - `galleryImages` (String, 255, required=NO, **Array=YES**)
   - `videoUrl` (String, 500, required=NO)
   - `videoId` (String, 255, required=NO)
6. **Set permissions:**
   - Read: `Any` (public can view)
   - Create/Update/Delete: `Users` (admin only)
7. **Create storage bucket:** "project-images"
   - Permissions: Read=`Any`, Create/Update/Delete=`Users`
   - Max file size: 10MB (or 100MB for videos)
   - Allowed extensions: jpg, jpeg, png, gif, webp, mp4
8. **Add platform:** Settings → Platforms → Web
   - Hostname: `localhost` (for development)
   - Add production URL later
9. **Create admin user:** Auth → Create User
   - Email, password, name

### **Step 4: Set Up EmailJS**

1. **Create account:** https://www.emailjs.com
2. **Add email service:** Gmail (or your provider)
3. **Create template:** Use variables: `{{from_name}}`, `{{reply_to}}`, `{{subject}}`, `{{message}}`
4. **Get credentials:**
   - Service ID
   - Template ID
   - Public Key (Account → General → API Keys)

### **Step 5: Configure Credentials**

Create `src/config/appwrite.js`:
```javascript
export const appwriteConfig = {
  endpoint: 'https://cloud.appwrite.io/v1',
  projectId: 'YOUR_PROJECT_ID',
  databaseId: 'YOUR_DATABASE_ID',
  projectsCollectionId: 'YOUR_COLLECTION_ID',
  storageId: 'YOUR_BUCKET_ID',
};
```

Create `src/config/emailjs.js`:
```javascript
export const emailjsConfig = {
  serviceId: 'YOUR_SERVICE_ID',
  templateId: 'YOUR_TEMPLATE_ID',
  publicKey: 'YOUR_PUBLIC_KEY',
};
```

### **Step 6: Create Appwrite Service Wrapper**

Create `src/services/appwrite.js` with methods:
- `login(email, password)` - with session cleanup
- `logout()`
- `getCurrentUser()`
- `getProjects()` - fetch all projects
- `createProject(projectData)` - create new project
- `updateProject(id, projectData)` - update project
- `deleteProject(id)` - delete project + all files
- `uploadFile(file)` - upload image/video
- `getFilePreview(fileId)` or `getFileView(fileId)` - get file URL
- `deleteFile(fileId)` - remove file from storage

### **Step 7: Build Components**

**Hero.jsx:**
- Full-screen section
- Animated title
- CTA button
- Smooth scroll

**About.jsx:**
- Bio text
- Profile picture
- Skill cards (3-4)
- Click handler for filtering portfolio

**Portfolio.jsx:**
- State for active filter
- Filter projects by categories (use `categories.includes(filter)`)
- Grid layout for project cards
- Modal state for detail view
- Gallery state (current image index)
- Gallery navigation functions
- Keyboard event listeners
- Video embed parser (YouTube/Vimeo)

**Contact.jsx:**
- Form state (name, email, subject, message)
- EmailJS integration with `emailjs.init()` and `emailjs.send()`
- Loading state
- Success/error states
- Social media links array

**AdminLogin.jsx:**
- Form state
- Login function from AuthContext
- Redirect if already logged in
- Error handling

**AdminDashboard.jsx:**
- Fetch projects on mount
- Form state for all fields
- Multiple category checkboxes
- Gallery images array state
- Video toggle state (URL vs Upload)
- File upload handlers with validation
- Submit handler (upload files first, then create/update project)
- Delete handler (delete all files, then project)
- Edit mode vs Create mode

### **Step 8: Set Up Routing**

In `App.jsx`:
```javascript
import { BrowserRouter, Routes, Route } from 'react-router-dom';

// Main portfolio (all sections on one page)
// Admin login at /admin/login
// Admin dashboard at /admin/dashboard
```

### **Step 9: Create AuthContext**

- Provide user state globally
- Handle login/logout
- Auto-fetch current user on mount
- Loading state

### **Step 10: Configure Deployment**

Create `netlify.toml`:
```toml
[build]
  command = "npm run build"
  publish = "dist"

[[redirects]]
  from = "/*"
  to = "/index.html"
  status = 200
```

Add to `.gitignore`:
```
node_modules
dist
.env
```

---

## 🎯 Key Implementation Details

### **Multi-Category Filtering**
```javascript
// Project data structure
{
  categories: ['clinical', 'motion'], // Array of categories
  // ... other fields
}

// Filtering logic
const filteredProjects = projects.filter(project => 
  activeFilter === 'all' || project.categories.includes(activeFilter)
);
```

### **Gallery Navigation**
```javascript
const [currentImageIndex, setCurrentImageIndex] = useState(0);
const [galleryImages, setGalleryImages] = useState([]);

const nextImage = () => {
  setCurrentImageIndex((prev) => 
    prev === galleryImages.length - 1 ? 0 : prev + 1
  );
};

const prevImage = () => {
  setCurrentImageIndex((prev) => 
    prev === 0 ? galleryImages.length - 1 : prev - 1
  );
};

// Keyboard support
useEffect(() => {
  const handleKeyPress = (e) => {
    if (e.key === 'ArrowRight') nextImage();
    if (e.key === 'ArrowLeft') prevImage();
    if (e.key === 'Escape') closeModal();
  };
  window.addEventListener('keydown', handleKeyPress);
  return () => window.removeEventListener('keydown', handleKeyPress);
}, [galleryImages]);
```

### **Video Embed Detection**
```javascript
const getVideoEmbed = (url, videoFileUrl) => {
  // Prioritize uploaded video file
  if (videoFileUrl) {
    return <video src={videoFileUrl} controls />;
  }
  
  // YouTube
  if (url?.includes('youtube.com') || url?.includes('youtu.be')) {
    const videoId = extractYouTubeId(url);
    return <iframe src={`https://www.youtube.com/embed/${videoId}`} />;
  }
  
  // Vimeo
  if (url?.includes('vimeo.com')) {
    const videoId = extractVimeoId(url);
    return <iframe src={`https://player.vimeo.com/video/${videoId}`} />;
  }
  
  return null;
};
```

### **File Upload with Progress**
```javascript
const handleImageUpload = async (e) => {
  const files = Array.from(e.target.files);
  
  // Validate file size
  for (const file of files) {
    if (file.size > 10 * 1024 * 1024) { // 10MB
      alert(`${file.name} is too large`);
      return;
    }
  }
  
  // Upload files
  const uploadedIds = [];
  for (const file of files) {
    try {
      const response = await appwriteService.uploadFile(file);
      uploadedIds.push(response.$id);
    } catch (error) {
      console.error('Upload failed:', error);
    }
  }
  
  setGalleryImages([...galleryImages, ...uploadedIds]);
};
```

### **Complete Data Cleanup**
```javascript
const handleDelete = async (projectId) => {
  if (!confirm('Delete this project?')) return;
  
  try {
    const project = projects.find(p => p.$id === projectId);
    
    // Delete main image
    if (project.imageId) {
      await appwriteService.deleteFile(project.imageId);
    }
    
    // Delete gallery images
    if (project.galleryImages) {
      for (const fileId of project.galleryImages) {
        await appwriteService.deleteFile(fileId);
      }
    }
    
    // Delete video file
    if (project.videoId) {
      await appwriteService.deleteFile(project.videoId);
    }
    
    // Delete project document
    await appwriteService.deleteProject(projectId);
    
    alert('Project deleted successfully!');
    fetchProjects(); // Refresh list
  } catch (error) {
    console.error('Delete failed:', error);
    alert('Failed to delete project');
  }
};
```

### **Session Management**
```javascript
// In appwrite.js service
async login(email, password) {
  try {
    // Check for existing session
    try {
      const currentSession = await this.account.getSession('current');
      if (currentSession) {
        await this.account.deleteSession('current');
      }
    } catch (error) {
      // No active session, continue
    }
    
    // Create new session
    return await this.account.createEmailPasswordSession(email, password);
  } catch (error) {
    console.error('Login error:', error);
    throw error;
  }
}
```

---

## ✅ Testing Checklist

### **Frontend Testing**
- [ ] Hero section displays correctly
- [ ] About section skill cards are clickable
- [ ] Clicking skill card scrolls to portfolio and filters
- [ ] Portfolio grid displays all projects
- [ ] Filtering shows correct projects
- [ ] Multi-category projects appear in multiple filters
- [ ] Modal opens with project details
- [ ] Gallery navigation works (prev/next/keyboard)
- [ ] Image counter updates correctly
- [ ] Video player works (YouTube/Vimeo/uploaded)
- [ ] Contact form validates input
- [ ] Email sends successfully (check inbox)
- [ ] Social links open in new tabs
- [ ] Footer name link works
- [ ] Mobile responsive on all sections

### **Admin Testing**
- [ ] Login page works
- [ ] Already logged in users redirect to dashboard
- [ ] Dashboard displays all projects
- [ ] Create new project with all fields
- [ ] Upload multiple gallery images
- [ ] Upload video file
- [ ] Paste YouTube/Vimeo URL
- [ ] Select multiple categories
- [ ] Edit existing project
- [ ] Delete project removes all files
- [ ] Logout works
- [ ] Error messages display correctly

### **Performance Testing**
- [ ] Images load quickly
- [ ] Videos play smoothly
- [ ] Animations are smooth (60fps)
- [ ] No layout shifts
- [ ] Fast page load (< 3s)

---

## 🚀 Deployment Steps

1. **Push to GitHub:**
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git remote add origin YOUR_REPO_URL
   git push -u origin main
   ```

2. **Deploy to Netlify:**
   - Go to netlify.com
   - "New site from Git"
   - Select repository
   - Build command: `npm run build`
   - Publish directory: `dist`
   - Deploy!

3. **Update Appwrite Platform:**
   - Copy Netlify URL (e.g., `yoursite.netlify.app`)
   - Go to Appwrite Console → Settings → Platforms
   - Add new Web platform with production URL

4. **Test production site:**
   - Visit live URL
   - Test all features
   - Check admin login works
   - Verify emails send

---

## 📝 Customization Guide

### **For Different Professions**

**Change these elements:**
1. **Hero tagline** - Update profession description
2. **About bio** - Rewrite professional background
3. **Skill cards** - Change to relevant expertise areas (3-4)
4. **Category names** - Update to match profession (e.g., "clinical", "motion", "digital")
5. **Color scheme** - Adjust CSS variables in `index.css`
6. **Social links** - Update URLs in Contact.jsx
7. **Footer tagline** - Change motto/slogan

### **Optional Enhancements**
- Add blog section
- Testimonials/reviews
- Certifications/awards
- Contact information (phone, location map)
- Multi-language support
- Dark/light mode toggle
- Analytics (Google Analytics, Plausible)
- SEO optimization (meta tags, sitemap)
- Loading screen/splash page

---

## 🎓 Learning Resources

- **React:** https://react.dev/learn
- **Vite:** https://vitejs.dev/guide/
- **Framer Motion:** https://www.framer.com/motion/
- **Appwrite Docs:** https://appwrite.io/docs
- **EmailJS Docs:** https://www.emailjs.com/docs/
- **Netlify Docs:** https://docs.netlify.com/

---

## 💡 Pro Tips

1. **Use CSS Variables** - Makes theming easy
2. **Optimize Images** - Compress before uploading (TinyPNG, Squoosh)
3. **Lazy Load** - Use `loading="lazy"` on images
4. **Semantic HTML** - Use proper tags (section, article, nav)
5. **Accessibility** - Add alt text, ARIA labels, keyboard navigation
6. **Error Boundaries** - Catch React errors gracefully
7. **Loading States** - Show spinners during async operations
8. **Toast Notifications** - Better UX than alert()
9. **Form Validation** - Client-side + proper error messages
10. **Git Workflow** - Commit often, meaningful messages

---

## 🆘 Common Issues & Solutions

**Issue: Appwrite 400 Bad Request**
- **Solution:** Check all attributes exist in collection, verify IDs in config

**Issue: EmailJS fails to send**
- **Solution:** Verify Public Key, check template variables match

**Issue: Images not loading**
- **Solution:** Check storage permissions, verify bucket ID

**Issue: Login fails**
- **Solution:** Check platform is configured, verify credentials

**Issue: Filtering doesn't work**
- **Solution:** Ensure categories is an array, use `.includes()`

**Issue: Gallery navigation broken**
- **Solution:** Verify galleryImages is array, check index bounds

**Issue: Video won't play**
- **Solution:** Check URL format, verify video file uploaded correctly

---

## 📄 License

This template is free to use for personal and commercial projects.

---

**Estimated Build Time:** 8-12 hours for experienced developers, 16-24 hours for beginners

**Difficulty Level:** Intermediate (React knowledge required, BaaS setup needed)

**Result:** Fully functional, production-ready portfolio website with admin CMS! 🎉
