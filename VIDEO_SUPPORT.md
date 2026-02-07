# Video Support for Motion Graphics

## Overview

Motion graphics projects can now display videos instead of just images! The system supports:
- **YouTube videos** (auto-embedded)
- **Vimeo videos** (auto-embedded)
- **Direct video files** (.mp4, .webm, .ogg)

## Setup in Appwrite

### Add videoUrl Attribute

1. Open **Appwrite Console** → **Databases**
2. Click your database (`portfolio-db`)
3. Click **projects** collection
4. Click **Attributes** tab
5. Click **Add Attribute**
6. Choose **String**
7. Configure:
   - **Key**: `videoUrl`
   - **Size**: `500` (for long URLs)
   - **Required**: NO (unchecked)
   - **Array**: NO (unchecked)
8. Click **Create**

## How to Use

### Adding Video to Motion Graphics Project

1. Login to **Admin Dashboard** (`/admin`)
2. Create or Edit a project
3. Select **Category**: Motion Graphics
4. **Video URL field** will appear automatically
5. Paste your video link:
   - YouTube: `https://www.youtube.com/watch?v=VIDEO_ID`
   - Vimeo: `https://vimeo.com/VIDEO_ID`
   - Direct: `https://example.com/video.mp4`
6. Still need to upload a **cover image** (thumbnail shown in grid)
7. Click **Add Project** or **Update Project**

### Supported Video Formats

#### YouTube
```
https://www.youtube.com/watch?v=dQw4w9WgXcQ
https://youtu.be/dQw4w9WgXcQ
```

#### Vimeo
```
https://vimeo.com/123456789
```

#### Direct Video URLs
```
https://example.com/video.mp4
https://example.com/video.webm
https://example.com/video.ogg
```

## Display Behavior

### Portfolio Grid View
- Shows **cover image** (thumbnail)
- Category badge shows "Motion Graphics"
- Click "View Details" to see video

### Modal Detail View
- **Video player** appears at top (16:9 aspect ratio)
- Full video controls (play, pause, fullscreen)
- Description and technologies below
- Gallery images (if any) appear below video

## Best Practices

### Video URLs
1. **Use unlisted YouTube videos** for private work
2. **Test links** before submitting (open in new tab)
3. **Keep videos short** (30-90 seconds ideal for portfolio)
4. **Add thumbnails** - cover image should be eye-catching

### Cover Images
- **Required**: Even with video, you need a cover image
- **Should represent**: Best frame from video
- **High quality**: 1920x1080 or similar
- **Optimized**: Compress before upload

### Video Quality
- **YouTube/Vimeo**: Handles quality automatically
- **Direct files**: Use H.264 codec for .mp4
- **Resolution**: 1920x1080 (Full HD) recommended
- **Bitrate**: 5-10 Mbps for good quality

## Examples

### Motion Graphics Showreel
```
Title: 3D Dental Animation - Implant Procedure
Category: Motion Graphics
Video URL: https://www.youtube.com/watch?v=YOUR_VIDEO
Cover Image: [Best frame from video]
Description: Detailed 3D animation showing implant placement process
```

### Process Video
```
Title: Logo Animation - Dental Clinic Branding
Category: Motion Graphics
Video URL: https://vimeo.com/YOUR_VIDEO
Cover Image: [Final logo frame]
Gallery: [Storyboard images, color variations]
```

## Troubleshooting

### Video not showing
1. **Check URL format**: Must match supported patterns
2. **Test in browser**: Open URL to verify it works
3. **Check console**: Browser DevTools → Console for errors
4. **Privacy settings**: YouTube/Vimeo videos must be public or unlisted (not private)

### Video not embedding
- **YouTube**: Make sure embedding is allowed (not disabled by uploader)
- **Vimeo**: Check privacy settings allow embedding
- **Direct files**: Verify CORS headers allow embedding

### Slow loading
- **Use YouTube/Vimeo**: They handle streaming better
- **Compress videos**: Use online tools before direct upload
- **Check file size**: Keep under 50MB for direct files

### Wrong aspect ratio
- Videos automatically display in 16:9 format
- Upload videos in 16:9 for best results
- 4:3 videos will have black bars on sides

## Technical Details

### Embed Detection
The system automatically detects video type:
1. **YouTube**: Extracts video ID, converts to embed URL
2. **Vimeo**: Extracts video ID, converts to player URL
3. **Direct**: Uses native HTML5 `<video>` element

### Responsive Design
- Desktop: Full 16:9 video player
- Mobile: Responsive width, maintains aspect ratio
- Touch: Full video controls available

### Performance
- **Lazy loading**: Videos only load when modal opens
- **No autoplay**: User must click play
- **Bandwidth**: YouTube/Vimeo handle adaptive streaming

## Future Enhancements

### Planned Features
- [ ] Video thumbnail preview on hover (grid view)
- [ ] Autoplay option (muted)
- [ ] Video download button
- [ ] Multiple videos per project
- [ ] Video chapters/timestamps
- [ ] 360° video support

### Advanced Ideas
- Upload videos directly to Appwrite Storage
- Video editing tools (trim, crop)
- Custom video player controls
- Analytics (view count, watch time)

## Questions?

If you encounter issues:
1. Verify `videoUrl` attribute exists in Appwrite
2. Check browser console for embed errors
3. Test video URL in incognito mode
4. Ensure video is public/unlisted (not private)

Happy creating! 🎬✨
