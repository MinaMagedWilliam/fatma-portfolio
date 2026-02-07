# Appwrite Setup Guide for Portfolio CMS

This guide will help you set up Appwrite Cloud to power your portfolio admin dashboard.

## Why Appwrite?

- **Completely FREE** for small projects
- **Netlify compatible** - works perfectly with static site hosting
- **No backend code needed** - database, authentication, and file storage included
- **Easy to use** - intuitive admin panel

---

## Step 1: Create Appwrite Cloud Account

1. Go to [https://cloud.appwrite.io](https://cloud.appwrite.io)
2. Click **"Sign Up"** (free, no credit card required)
3. Create your account using email or GitHub

---

## Step 2: Create a New Project

1. Once logged in, click **"Create Project"**
2. Name it: **"Portfolio"** (or any name you like)
3. **Copy the Project ID** - you'll need this later

---

## Step 3: Set Up the Database

### Navigation Checklist

Follow this path exactly:

```
Appwrite Console Home
  → Left Sidebar: Click "Databases" 
    → Click "Create Database" button
      → Name: "PortfolioDB" → Create
        → Now you're INSIDE the database
          → Click "Create Table" (or "Create Collection") button
            → Name: "projects" → Create
              → Now you're INSIDE the table/collection
                → Click "Attributes" tab at the top
                  → Click "Create Attribute" button
```

### Create Database

1. In the Appwrite Console, look at the **left sidebar**
2. Find and click **"Databases"** (has a database icon)
3. Click the **"Create Database"** button (usually a big button in the center or top-right)
4. Name it: **"PortfolioDB"**
5. Click **"Create"**
6. **Copy the Database ID** (you'll see it displayed after creation)

### Create Projects Collection (Table)

**After creating the database, you should now be INSIDE that database.**

**Note:** Appwrite may call this a **"Table"** instead of "Collection" - they're the same thing!

1. You'll see your database name at the top: "PortfolioDB"
2. Look for a button that says **"Create Table"** or **"Create Collection"** (both mean the same thing!)
3. Click **"Create Table"** or **"Create Collection"**
4. In the popup/form:
   - **Table/Collection ID**: Leave it auto-generated OR type `projects`
   - **Table/Collection Name**: Type `projects`
5. Click **"Create"**
6. **IMPORTANT: Copy the Collection ID** - you'll need this for your config file
   - The Collection ID is a long string like `68ed8abc0012def45678`
   - It's NOT just the word "projects"
   - You can find it at the top of the collection page or in Settings
7. **Important:** After creating, the table/collection page will automatically open

**Can't find the button?**
- Make sure you're INSIDE the database (you should see "PortfolioDB" at the top)
- Look for a **"+ Create Table"** or **"+ Create Collection"** button near the top of the page
- If you see "No tables yet" or "No collections yet", that means you're in the right place - click the create button

### Add Attributes (Fields)

Once you've created the table/collection, you should see tabs at the top:
- **Documents** (default tab)
- **Attributes** ← Click this tab
- **Indexes**
- **Settings**

**Click the "Attributes" tab**, then click **"Create Attribute"** button (or "+ Add Attribute" depending on your Appwrite version).

For each field below, click **"Create Attribute"** and fill in the details:

**Field 1: title**
1. Click **"Create Attribute"** → Select **"String"**
2. Key: `title`
3. Size: `255`
4. Required: ✅ Yes
5. Array: ❌ No
6. Click **"Create"**

**Field 2: category**
1. Click **"Create Attribute"** → Select **"String"**
2. Key: `category`
3. Size: `50`
4. Required: ✅ Yes
5. Array: ❌ No
6. Click **"Create"**

**Field 3: description**
1. Click **"Create Attribute"** → Select **"String"**
2. Key: `description`
3. Size: `500`
4. Required: ✅ Yes
5. Array: ❌ No
6. Click **"Create"**

**Field 4: details**
1. Click **"Create Attribute"** → Select **"String"**
2. Key: `details`
3. Size: `2000`
4. Required: ✅ Yes
5. Array: ❌ No
6. Click **"Create"**

**Field 5: technologies** (IMPORTANT: This is an array)
1. Click **"Create Attribute"** → Select **"String"**
2. Key: `technologies`
3. Size: `100`
4. Required: ❌ No
5. Array: ✅ **YES - Check this box!**
6. Click **"Create"**

**Field 6: imageId**
1. Click **"Create Attribute"** → Select **"String"**
2. Key: `imageId`
3. Size: `255`
4. Required: ❌ No
5. Array: ❌ No
6. Click **"Create"**

**Field 7: videoUrl** *(Optional - for Motion Graphics videos)*
1. Click **"Create Attribute"** → Select **"String"**
2. Key: `videoUrl`
3. Size: `500`
4. Required: ❌ No
5. Array: ❌ No
6. Click **"Create"**

**Wait for attributes to be created** - Each attribute takes a few seconds to create. You'll see a status indicator.

### Set Permissions

1. Click the **"Settings"** tab in your table/collection
2. Scroll to **"Permissions"**
3. Add these permissions:
   - **Read Access:** `Any` (allows public to view projects)
   - **Create, Update, Delete:** `Users` (only logged-in users can manage projects)

---

## Step 4: Set Up File Storage

1. Click **"Storage"** in the left sidebar
2. Click **"Create Bucket"**
3. Name it: **"project-images"**
4. **Copy the Bucket ID**

### Set Storage Permissions

1. Open your bucket settings
2. Under **Permissions**:
   - **Read Access:** `Any` (public can view images)
   - **Create, Update, Delete:** `Users` (only logged-in users can upload)
3. Under **File Size**:
   - Set **Maximum File Size:** `10MB` (adjust as needed)
4. Under **Allowed File Extensions**:
   - Add: `jpg, jpeg, png, gif, webp`

---

## Step 5: Configure Your App

1. Open `src/config/appwrite.js` in VS Code
2. Replace the placeholder values with your IDs:

```javascript
export const appwriteConfig = {
  endpoint: 'https://cloud.appwrite.io/v1',
  projectId: 'YOUR_PROJECT_ID_HERE',       // From Step 2 - looks like: 68ed8a8f0032cd3c025c
  databaseId: 'YOUR_DATABASE_ID_HERE',     // From Step 3 - looks like: 68ed8ab9002eb2e1dbf8
  projectsCollectionId: 'YOUR_COLLECTION_ID_HERE',  // From Step 3 - looks like: 68ed8xyz... (NOT just 'projects')
  storageId: 'YOUR_BUCKET_ID_HERE',        // From Step 4 - looks like: 68ed8c6f00079b6e068e
};
```

**IMPORTANT:** 
- All IDs should be long alphanumeric strings
- `projectsCollectionId` should be the **Collection ID**, NOT just the word "projects"
- If you used `'projects'` as the ID, go back to Appwrite and copy the actual Collection ID

---

## Step 6: Add Platform (for Web)

This tells Appwrite which websites are allowed to use your project.

1. Go to your Appwrite project overview (click "Overview" in left sidebar)
2. Scroll down or click **"Settings"** in the left sidebar
3. Find the **"Platforms"** section
4. Click **"Add Platform"**
5. Select **"Web"** or **"Web App"** (the one with a browser icon 🌐)
6. **Choose framework type:** Select **"React"** (your project uses React + Vite)
7. **Enter Name:** `Portfolio Local` (or any name you want)
8. **Enter Hostname:** `localhost` (for local development)
9. Click **"Next"** or **"Create"**

**To add more hostnames later (after deploying to Netlify):**
1. Go back to Settings → Platforms
2. Click **"Add Platform"** again
3. Select **"Web"** → **"React"**
4. **Enter Name:** `Portfolio Production`
5. **Enter Hostname:** `your-site.netlify.app` (your Netlify URL)
6. Click **"Create"**

**Important Notes:**
- Framework Type: **React** (because your portfolio is built with React)
- Just enter the hostname (e.g., `localhost`), NOT the full URL (not `http://localhost:5174`)
- You can add multiple platforms for different environments (local, production, etc.)

---

## Step 7: Create Admin User

### Option A: Create via Appwrite Console (Recommended)

1. Click **"Auth"** in the left sidebar
2. Click **"Create User"**
3. Fill in:
   - **Email:** your admin email
   - **Password:** strong password (min 8 characters)
   - **Name:** your name
4. Click **"Create"**

### Option B: Create via Your App

1. Start your development server: `npm run dev`
2. Go to `http://localhost:5173/admin/login`
3. The login page has a registration option (if you want to add a register button)

---

## Step 8: Test Everything

### Start Development Server

```bash
npm run dev
```

### Test Main Portfolio

1. Go to `http://localhost:5173`
2. You should see placeholder projects (fallback data)
3. Once you add projects via admin, they'll replace placeholders

### Test Admin Login

1. Go to `http://localhost:5173/admin/login`
2. Enter your admin email and password
3. You should be redirected to the dashboard

### Test Adding a Project

1. In the admin dashboard, click **"Add New Project"**
2. Fill in all fields:
   - **Title:** "My First Case"
   - **Category:** Select `clinical`, `motion`, or `digital`
   - **Description:** Short description (shown in portfolio grid)
   - **Details:** Full description (shown in modal)
   - **Technologies:** Comma-separated (e.g., "CAD/CAM, 3D Printing")
   - **Image:** Upload a project image
3. Click **"Save Project"**
4. Go back to the main portfolio - your project should appear!

---

## Step 9: Deploy to Netlify

Your app is already configured for Netlify (`netlify.toml` exists).

### Deploy

1. Push your code to GitHub
2. Go to [netlify.com](https://netlify.com)
3. Click **"Add new site"** → **"Import from Git"**
4. Select your repository
5. Netlify will auto-detect Vite settings
6. Click **"Deploy"**

### Important: Update Appwrite Platform

After deployment, add your Netlify URL to Appwrite:

1. Go to Appwrite Console → **Settings** → **Platforms**
2. Add your Netlify URL (e.g., `your-site.netlify.app`)

---

## Common Issues & Fixes

### Can't find "Databases" in sidebar

**Solution:**
1. Make sure you're logged into Appwrite Cloud: [https://cloud.appwrite.io](https://cloud.appwrite.io)
2. Make sure you've selected a project (click on your project name if needed)
3. The left sidebar should show: Overview, Auth, **Databases**, Storage, Functions, Messaging, Settings
4. If you don't see the sidebar, try clicking the menu icon (☰) in the top-left

### Can't find "Create Collection" button

**Solution:**
1. **First, create a database** - you must create a database before you can create collections/tables
2. **Open your database** - click on the database name in the list
3. Once INSIDE the database, you'll see a **"Create Table"** or **"Create Collection"** button (they're the same!)
4. The page should say something like "No tables yet" or "No collections yet" with a create button

**Where are you?**
- ❌ If you see a list of databases → You need to CLICK on your database to enter it
- ✅ If you see "PortfolioDB" at the top and "No tables/collections yet" → You're in the right place!
- ✅ Click **"Create Table"** - it's the same as "Create Collection"

### Can't find "Add Attribute" button

**Solution:**
1. Make sure you've **created a table/collection first** (Step 3)
2. **Click on your table/collection name** to open it
3. Look for tabs at the top: Documents | **Attributes** | Indexes | Settings
4. **Click the "Attributes" tab**
5. You should now see a **"Create Attribute"** or "+ Add Attribute" button
6. If you don't see tabs, try refreshing the page or clicking on the table/collection name again

**Still can't find it?**
- The button might be called **"Create Attribute"** instead of "Add Attribute"
- Make sure you're inside the table/collection (not in the database list view)
- The Attributes tab is right next to the Documents tab

### "Appwrite service is not available"

**Solution:** Check that all IDs in `src/config/appwrite.js` are correct.

### "User unauthorized"

**Solution:** Make sure you've set up permissions correctly in your collection and bucket settings (see Steps 3 & 4).

### Images not loading

**Solution:** 
1. Check Storage bucket permissions (should allow public read)
2. Verify the `storageId` in your config matches your bucket ID

### Can't log in

**Error: "Invalid email or password"**

This usually means one of these issues:

**Solution 1: Make sure you created the user in Appwrite first**
1. Go to Appwrite Console → **Auth** (left sidebar)
2. Check if you see your user in the list
3. If NOT, click **"Create User"** and add:
   - Email: your email
   - Password: your password (min 8 characters)
   - Name: your name
4. Try logging in again

**Solution 2: Check if you're creating the user correctly**
1. The user MUST be created in **Appwrite Console → Auth**
2. Regular email/password users are separate from other auth methods
3. Make sure password is at least 8 characters

**Solution 3: Verify platform is configured**
1. Go to Appwrite Console → **Settings** → **Platforms**
2. Make sure you added `localhost` as a Web platform
3. The server is now running on a different port - you may need to add that too

**Solution 4: Check browser console for errors**
1. Open browser Developer Tools (F12)
2. Go to Console tab
3. Look for red error messages
4. Common errors:
   - "Origin not allowed" → Add `localhost` to platforms
   - "Project not found" → Check `projectId` in config
   - "Collection not found" → Check `projectsCollectionId` in config

**Quick Test: Create a new admin user**
1. In Appwrite Console, go to **Auth**
2. Click **"Create User"**
3. Email: `admin@test.com`
4. Password: `admin123456` (temp password for testing)
5. Name: `Admin`
6. Try logging in with these credentials

### Projects not showing on main page

**Solution:**
1. Add at least one project via admin dashboard
2. Check browser console for API errors
3. Portfolio will show placeholder data if Appwrite isn't configured yet

---

## Next Steps

Once everything works:

1. ✅ Add all your real portfolio projects via admin dashboard
2. ✅ Upload high-quality images for each project
3. ✅ Test on mobile devices
4. ✅ Share your portfolio URL!

---

## Admin Dashboard Access

- **Production URL:** `https://your-site.netlify.app/admin/login`
- **Local URL:** `http://localhost:5173/admin/login`

**Keep your admin credentials safe!** This is your content management system.

---

## Cost & Limits (Free Tier)

Appwrite Cloud Free Tier includes:

- **750K Function Executions** per month
- **2GB Bandwidth** per month  
- **2GB Storage** total
- **75K Database Reads** per month
- **Unlimited Projects**

**Important Limitations:**
- ⚠️ **Image transformations are NOT available** on the free tier (no resizing, cropping, or format conversion)
- Images are served at their original size and format
- Use `getFileView()` instead of `getFilePreview()` to avoid 403 errors
- Optimize your images before uploading (resize and compress them)

**Recommended Image Settings:**
- Max width: 1200px
- Format: JPG or WebP
- Compress before upload to save bandwidth
- Use online tools like TinyPNG or Squoosh.app

This is more than enough for a personal portfolio! 🎉

---

## Support

- **Appwrite Docs:** [https://appwrite.io/docs](https://appwrite.io/docs)
- **Appwrite Discord:** [https://appwrite.io/discord](https://appwrite.io/discord)

---

**Ready to start!** Follow the steps above, and you'll have a fully functional CMS for your portfolio in minutes. 🚀
