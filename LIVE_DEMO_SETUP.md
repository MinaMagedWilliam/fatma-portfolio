# Live Demo Feature - Setup Guide

✅ **Implementation Complete!** The "View Live Demo" button is now fully integrated into the admin dashboard.

## What's New

You can now add live demo URLs to your portfolio projects. When visitors view a project with a live demo link, they'll see a special button to test the site in real-time!

## How to Add Live Demo to Your Projects

### Option 1: Via Admin Dashboard (Recommended)

1. **Log in to Admin Dashboard**
   - Go to: `http://localhost:5173/admin/login`
   - Use your credentials

2. **Edit Your Portfolio Project**
   - Find your portfolio project in the list
   - Click the **Edit** button (pencil icon)

3. **Add Live Demo URL**
   - Scroll to the "Live Demo URL" field (below Technologies)
   - Enter your live website URL:
     - For this site: `https://yoursite.netlify.app`
     - For local testing: `http://localhost:5173`
     - Or use: `window.location.origin` (if you want the current URL)

4. **Save Changes**
   - Click "Update Case"
   - The project will now have the live demo button!

### Option 2: Via Appwrite Console

1. Go to: https://cloud.appwrite.io/console
2. Navigate to: Databases → portfolio-db → projects collection
3. Find your portfolio project
4. Click **Update Document**
5. Add a new attribute field:
   - **Key**: `liveDemo`
   - **Type**: String
   - **Value**: Your live demo URL (e.g., `https://example.netlify.app`)
6. Save the document

## Where Does the Button Appear?

When a project has a `liveDemo` URL:
- The project modal will show a special **"🌐 View Live Demo"** button
- The button appears between the description and technologies sections
- Clicking it opens the live site in a new tab
- A helpful hint appears: _"Experience the live website by clicking below"_

## Example Projects to Add Live Demo

For your "Dr. Mina Maged Portfolio" project (this site itself):
- **liveDemo**: `https://your-deployed-site.netlify.app`
- **liveDemo** (local testing): `http://localhost:5173`
- **liveDemo** (recursive demo): `window.location.origin`

## Testing Checklist

- [ ] Log into admin dashboard
- [ ] Edit your portfolio project
- [ ] Add live demo URL in the "Live Demo URL" field
- [ ] Save the project
- [ ] Go to homepage
- [ ] Click on the portfolio project card
- [ ] Verify "🌐 View Live Demo" button appears in the modal
- [ ] Click the button
- [ ] Confirm it opens the correct URL in a new tab

## Styling

The live demo button features:
- **Gradient background** (cyan/blue)
- **Hover effect** (scales to 1.05x)
- **Icon** (🌐 globe)
- **Box shadow glow** on hover
- **Opens in new tab** for better UX

## Important Notes

⚠️ **The button only appears if `liveDemo` field exists and is not empty**

✅ **Works with all categories** (clinical, motion, digital, portfolios)

✅ **Optional field** - only add it to projects that have live demos

✅ **URL validation** - the input field uses `type="url"` for basic validation

## Next Steps

1. **Add live demo URLs** to your existing portfolio projects via admin dashboard
2. **Deploy your site** to Netlify to get a public URL
3. **Update the liveDemo field** with your Netlify URL
4. **Share your portfolio** with clients who can now test your work live!

---

**Need Help?** Check the admin dashboard - the live demo field has a helpful hint below it!
