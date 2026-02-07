# Gallery System Guide

## Overview

The portfolio now supports **multiple images per project** with a full gallery system. Each project can have:
- 1 main cover image (shown in grid view)
- Unlimited additional gallery images (shown in detail modal)

## Features

### Admin Dashboard
- **Multi-file upload**: Select multiple images at once
- **Live preview**: See thumbnails before uploading
- **Remove files**: Delete files before submitting or remove existing images
- **Edit support**: View and manage existing gallery images when editing

### Portfolio Display
- **Full-screen gallery**: View all images in detail modal
- **Navigation controls**: 
  - Previous/Next buttons (‹ and ›)
  - Keyboard arrows (← and →)
  - Thumbnail strip for quick navigation
  - Image counter (e.g., "3 / 7")
- **Smooth transitions**: Animated image changes
- **Responsive design**: Works on mobile and desktop

## How to Use

### 1. Upload a New Project with Gallery

1. Login to admin dashboard (`/admin`)
2. Fill in project details (title, category, description, etc.)
3. **Main Image**: Upload the cover image (shown in grid)
4. **Gallery Images**: 
   - Click "Choose Files" in Gallery Images section
   - Select multiple images (Ctrl/Cmd + Click or drag-select)
   - Preview thumbnails will appear
   - Remove unwanted images using ❌ button
5. Click "Add Project"

### 2. Edit Existing Gallery

1. Click "Edit" on any project
2. Existing gallery images will show with ❌ buttons
3. **Add more images**: Select new files to add
4. **Remove images**: Click ❌ on any thumbnail
5. Click "Update Project"

### 3. View Gallery on Portfolio

1. Click "View Details" on any project card
2. If project has gallery images:
   - Use ‹ › buttons to navigate
   - Use arrow keys on keyboard
   - Click thumbnails at bottom
   - See image counter at bottom
3. If no gallery, falls back to main image

## Image Best Practices

### File Size & Format
- **Format**: JPG or PNG
- **Size**: Recommended 1920x1080 or smaller
- **Compression**: Use online tools to compress before upload
- **Mobile**: Keep under 500KB per image for fast loading

### Image Order Tips
1. **First image**: Most impactful shot (before/after, final result)
2. **Second image**: Different angle or close-up detail
3. **Last image**: Supporting context or process shots

### Clinical Cases Example
```
Gallery Order:
1. Final result (main smile shot)
2. Before comparison
3. Close-up of specific treatment area
4. Different angle (side view)
5. X-ray or diagnostic image
6. Process/treatment step
```

### Motion Graphics Example
```
Gallery Order:
1. Final rendered frame (hero shot)
2. Animation keyframe
3. Behind-the-scenes wireframe
4. Color/lighting variation
5. Project storyboard
```

## Technical Details

### Storage Structure
- **Appwrite Storage**: Each image stored as separate file
- **Database**: `galleryImages` array stores file IDs
- **Display**: IDs converted to URLs using `getFileView()`

### Performance
- **Lazy loading**: Images load on demand
- **Thumbnail strip**: Small preview images for quick access
- **Navigation**: Client-side (instant image switching)

### Browser Support
- Modern browsers (Chrome, Firefox, Safari, Edge)
- Keyboard navigation (arrow keys, ESC to close)
- Touch gestures on mobile (swipe coming soon)

## Troubleshooting

### Gallery images not showing
1. Check Appwrite Console → Storage → verify files uploaded
2. Check project document → `galleryImages` array has file IDs
3. Check browser console for errors
4. Verify `getFileView()` returns valid URLs

### Images in wrong order
- Order is determined by upload sequence
- To reorder: Edit project, remove all images, re-upload in desired order
- Future: Drag-and-drop reordering feature

### Remove button not working
1. Check browser console for errors
2. Verify storage permissions in Appwrite
3. Check that file ID exists in storage
4. Refresh page and try again

### Preview images not displaying
1. File size may be too large (check console)
2. Invalid file format (use JPG/PNG only)
3. Browser memory issue (refresh page)

## Future Enhancements

### Planned Features
- [ ] Drag-and-drop reordering in admin
- [ ] Bulk delete gallery images
- [ ] Touch swipe gestures on mobile
- [ ] Zoom functionality for detail view
- [ ] Lightbox mode (hide text, show only image)
- [ ] Download original image button
- [ ] Gallery captions per image

### Ideas for Advanced Use
- Video support in gallery (upload to Appwrite, display video player)
- 3D viewer integration (for dental models)
- Before/after slider comparison tool
- Image annotations/markup tools

## Questions?

If you encounter issues:
1. Check Appwrite Console for storage/database errors
2. Open browser DevTools → Console tab
3. Review `APPWRITE_SETUP.md` for configuration
4. Check `LOGIN_TROUBLESHOOTING.md` for auth issues

Happy showcasing! 🎨✨
