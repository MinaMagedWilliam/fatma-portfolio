# 🚀 Quick Start Guide - Dr. Mina Maged Portfolio

## ⚠️ IMPORTANT: Node.js Installation Required

Your portfolio website is **ready to go**, but you need to install Node.js first to run it.

### Step 1: Install Node.js

1. **Download Node.js**:
   - Visit: https://nodejs.org/
   - Download the **LTS (Long Term Support)** version (currently v20.x or v22.x)
   - Choose the Windows installer (.msi)

2. **Install Node.js**:
   - Run the downloaded installer
   - Click "Next" through the setup wizard
   - Accept the license agreement
   - Keep all default settings (including npm package manager)
   - Click "Install"
   - Wait for installation to complete
   - Click "Finish"

3. **Verify Installation**:
   - **Close and reopen VS Code** (important!)
   - Open a new terminal in VS Code
   - Run these commands:
   ```powershell
   node --version
   ```
   Should show something like: `v20.x.x` or `v22.x.x`
   
   ```powershell
   npm --version
   ```
   Should show something like: `10.x.x`

---

## Step 2: Install Project Dependencies

After Node.js is installed and verified, run:

```powershell
npm install
```

This will install:
- React 18
- Vite (build tool)
- Framer Motion (animations)
- React Icons (social media icons)
- All other dependencies

**Expected output**: 
- Progress bar showing package installation
- Takes 1-3 minutes depending on internet speed
- Creates a `node_modules` folder

---

## Step 3: Start the Development Server

```powershell
npm run dev
```

**What happens**:
- Vite starts a local development server
- Your browser should automatically open
- If not, visit: http://localhost:5173
- You'll see your portfolio website live!

**Development mode features**:
- ⚡ Lightning-fast hot module reload
- 🔄 Changes appear instantly when you save files
- 🐛 Error messages appear in the browser

---

## Step 4: Explore Your Website

Your portfolio includes:

### 🏠 Hero Section
- Animated particle background
- "Dr. Mina Maged" headline with gradient
- Call-to-action buttons

### 👤 About Section  
- Professional bio
- 3 skill cards with hover effects

### 💼 Portfolio Section
- Filterable project gallery
- 6 placeholder projects
- Categories: All, Clinical, Motion Graphics, Digital

### 📧 Contact Section
- Contact form
- Social media icons
- Footer

---

## 🎨 Customization Guide

### Replace Placeholder Images

1. Create an `assets` folder in the `public` directory
2. Add your images
3. Update `src/components/Portfolio.jsx`:

```javascript
image: '/assets/your-project-image.jpg'
```

### Update Social Media Links

Edit `src/components/Contact.jsx` - find the `socialLinks` array:

```javascript
const socialLinks = [
  { icon: <FaLinkedin />, name: 'LinkedIn', url: 'YOUR_LINKEDIN_URL' },
  { icon: <FaInstagram />, name: 'Instagram', url: 'YOUR_INSTAGRAM_URL' },
  // ... etc
];
```

### Change Colors

Edit `src/index.css` - modify CSS variables:

```css
:root {
  --color-accent-cyan: #00d9ff;  /* Change this */
  --color-accent-silver: #c0c0c0; /* Change this */
}
```

### Update Content

- **Personal info**: Edit component files in `src/components/`
- **Portfolio projects**: Modify the `projects` array in `Portfolio.jsx`
- **Bio text**: Update text in `About.jsx`

---

## 🏗️ Build for Production

When ready to deploy:

```powershell
npm run build
```

**What happens**:
- Creates optimized production files in `dist` folder
- Minifies CSS and JavaScript
- Optimizes images
- Ready for deployment!

---

## 🌐 Deploy to Netlify

### Option 1: Drag & Drop (Easiest)

1. Run `npm run build`
2. Go to https://app.netlify.com/drop
3. Drag the `dist` folder onto the page
4. Your site is live!

### Option 2: Git Integration (Recommended)

1. Push code to GitHub:
   ```powershell
   git init
   git add .
   git commit -m "Initial commit"
   git remote add origin YOUR_GITHUB_REPO_URL
   git push -u origin main
   ```

2. Connect to Netlify:
   - Go to https://app.netlify.com
   - Click "New site from Git"
   - Choose GitHub
   - Select your repository
   - Netlify auto-detects settings from `netlify.toml`
   - Click "Deploy site"

3. Your site is live at: `https://your-site-name.netlify.app`

---

## 📋 Common Commands

| Command | Description |
|---------|-------------|
| `npm run dev` | Start development server |
| `npm run build` | Build for production |
| `npm run preview` | Preview production build locally |

---

## 🆘 Troubleshooting

### "npm: The term 'npm' is not recognized"
- Node.js isn't installed or terminal needs restart
- Close VS Code completely and reopen
- Try running in a new terminal

### Port 5173 already in use
- Another Vite project is running
- Kill the other process or change port in `vite.config.js`

### Module not found errors
- Run `npm install` again
- Delete `node_modules` folder and run `npm install`

### Animations not working
- Check browser console for errors
- Ensure all dependencies installed correctly

---

## 📁 Project Structure

```
portfolio/
├── src/
│   ├── components/         # React components
│   │   ├── Hero.jsx       # Landing section
│   │   ├── About.jsx      # About section
│   │   ├── Portfolio.jsx  # Projects gallery
│   │   └── Contact.jsx    # Contact form
│   ├── App.jsx            # Main app
│   ├── main.jsx           # Entry point
│   └── index.css          # Global styles
├── public/                # Static assets (create this)
├── index.html             # HTML template
├── package.json           # Dependencies
├── vite.config.js         # Vite config
└── netlify.toml           # Netlify config
```

---

## 🎯 Next Steps

1. ✅ Install Node.js (if you haven't already)
2. ✅ Run `npm install`
3. ✅ Run `npm run dev`
4. 🎨 Customize content and images
5. 🧪 Test on mobile devices
6. 🚀 Deploy to Netlify
7. 📣 Share your portfolio!

---

## 💡 Tips

- **Save frequently**: Changes appear instantly in dev mode
- **Use browser DevTools**: Press F12 to inspect elements
- **Check console**: Look for errors if something breaks
- **Responsive testing**: Use DevTools device toolbar (Ctrl+Shift+M)

---

## 📞 Need Help?

If you encounter issues:
1. Check the browser console for error messages
2. Ensure all files are saved
3. Try restarting the dev server (Ctrl+C, then `npm run dev`)
4. Clear browser cache (Ctrl+Shift+Delete)

---

**Your portfolio is ready to launch! 🚀**

Just install Node.js and run `npm install` to get started.
