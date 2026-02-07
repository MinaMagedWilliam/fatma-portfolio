# 📸 Adding Your Profile Picture

## Quick Guide

Your portfolio now includes a professional profile picture section in the Hero (landing) section!

---

## 🎯 Where to Place Your Picture

### Option 1: Simple Method (Recommended)

1. **Prepare your picture:**
   - Use a PNG file with transparent background (or JPG)
   - Square dimensions work best (e.g., 500x500px, 1000x1000px)
   - Professional headshot or portrait

2. **Rename your picture to:** `profile.png`

3. **Place it in the `public` folder:**
   ```
   portfolio/
   └── public/
       └── profile.png  ← Put your image here
   ```

4. **That's it!** The website will automatically display your picture

---

### Option 2: Different Filename

If you want to use a different filename (e.g., `mina-photo.png`):

1. Place your image in the `public` folder
2. Open `src/components/Hero.jsx`
3. Find this line (around line 139):
   ```jsx
   src="/profile.png"
   ```
4. Change it to:
   ```jsx
   src="/mina-photo.png"
   ```

---

## 🎨 Profile Picture Features

Your profile picture includes:

✅ **Circular frame** with cyan border
✅ **Glowing effect** around the image
✅ **Pulsing animation** for the outer ring
✅ **Hover effect** - scales up on mouse over
✅ **Responsive design** - adjusts size on mobile
✅ **Professional look** - matches the dark theme

### Visual Effects:
- 200px diameter on desktop
- 150px diameter on mobile
- Cyan (#00d9ff) border and glow
- Smooth scale animation on hover
- Pulsing ring animation

---

## 📐 Image Recommendations

### Best Practices:

**Size:**
- Minimum: 500x500px
- Recommended: 1000x1000px or higher
- Format: PNG (with transparency) or JPG

**Composition:**
- Professional headshot or portrait
- Good lighting
- Neutral or clean background
- Face centered and clearly visible

**Technical:**
- High resolution for retina displays
- Optimized file size (< 500KB if possible)
- Square aspect ratio

---

## 🖼️ Creating a Professional Profile Picture

### If you don't have a picture ready:

1. **Use a placeholder temporarily:**
   - The site uses a default placeholder if `profile.png` is missing
   - You can use: https://via.placeholder.com/500/1a1a1a/00d9ff?text=Dr.+Mina+Maged

2. **Create/Edit your photo:**
   - Use [remove.bg](https://www.remove.bg/) to remove background
   - Use [Canva](https://www.canva.com/) to create a professional frame
   - Use Photoshop or GIMP for advanced editing

3. **Professional tips:**
   - Wear professional attire (lab coat for medical context)
   - Good lighting (face well-lit, no harsh shadows)
   - Clean background (solid color or subtle pattern)
   - Confident, friendly expression

---

## 📁 File Structure

```
portfolio/
├── public/
│   └── profile.png        ← Your profile picture goes here
├── src/
│   └── components/
│       ├── Hero.jsx       ← References the image
│       └── Hero.css       ← Styles the image
```

---

## 🎨 Customizing the Profile Picture Style

### Change Size

Edit `src/components/Hero.css`:

```css
.profile-image-wrapper {
  width: 250px;  /* Change from 200px */
  height: 250px; /* Change from 200px */
}
```

### Change Border Color

```css
.profile-image {
  border: 4px solid #your-color-here;
  box-shadow: 0 0 30px rgba(your-rgb, 0.4);
}
```

### Remove Animations

Find and remove or comment out:
```css
/* .profile-ring { ... } */
/* .profile-glow { ... } */
```

### Make it Square Instead of Round

```css
.profile-image {
  border-radius: 10%; /* or 0 for sharp corners */
}
```

---

## ✅ Testing Your Picture

After adding your picture:

1. **Start the dev server** (if not running):
   ```powershell
   npm run dev
   ```

2. **Check the browser:**
   - Picture should appear at the top of the page
   - Above your name
   - With a glowing cyan border

3. **Test hover effect:**
   - Move mouse over the picture
   - It should scale up slightly
   - Glow should intensify

4. **Test responsive:**
   - Press F12 (DevTools)
   - Press Ctrl+Shift+M (device toolbar)
   - Check on different screen sizes

---

## 🆘 Troubleshooting

### Picture not showing?

**Check:**
1. File is named exactly `profile.png` (case-sensitive)
2. File is in the `public` folder (not `src`)
3. Image file is not corrupted
4. Browser cache cleared (Ctrl+Shift+R)

**Try:**
- Check browser console (F12) for errors
- Verify the file path in `Hero.jsx`
- Restart the dev server (Ctrl+C, then `npm run dev`)

### Picture looks blurry?

- Use a higher resolution image (at least 1000x1000px)
- Ensure image quality is high
- PNG format preserves quality better than JPG

### Picture not centered?

- Ensure your image is square (same width and height)
- If it's not square, it will be cropped to fit the circle

---

## 🚀 Alternative Locations for Profile Picture

You can also add profile pictures in other sections:

### In the About Section:
The About section could also feature a larger profile image. Let me know if you'd like to add one there too!

### In the Contact Section:
A smaller avatar next to contact information.

---

## 📝 Summary

1. ✅ Profile picture section added to Hero
2. 📁 Place your `profile.png` in the `public/` folder
3. 🎨 Professional styling with glow effects
4. 📱 Fully responsive design
5. ✨ Hover animations included

**Your portfolio now has a professional profile picture display!**

Just add your `profile.png` to the `public/` folder and refresh the page! 🎉
