# Step 1: Add Gallery Images Attribute to Appwrite

## Follow These Steps Exactly

### 1. Open Appwrite Console
- Go to: https://cloud.appwrite.io
- Click on your **Portfolio** project

### 2. Navigate to Your Collection
- Click **"Databases"** in left sidebar
- Click **"PortfolioDB"**
- Click **"projects"** collection (or table)

### 3. Add the New Attribute
- Click the **"Attributes"** tab at the top
- Click **"Create Attribute"** button

### 4. Fill in the Form
```
Attribute Type: String
Key: galleryImages
Size: 100
Required: ❌ NO (unchecked)
Array: ✅ YES (CHECK THIS BOX!)
Default: (leave empty)
```

### 5. Create and Wait
- Click **"Create"**
- Wait 5-10 seconds for the attribute to be created
- You should see it appear in the attributes list

### 6. Verify
You should now see in your attributes list:
- ✅ title (String)
- ✅ category (String)
- ✅ description (String)
- ✅ details (String)
- ✅ technologies (String Array)
- ✅ imageId (String)
- ✅ **galleryImages (String Array)** ← NEW!

---

## What This Does

- **imageId** - Main cover image (shown in grid)
- **galleryImages** - Array of additional image IDs (shown in detail view)

Example:
```json
{
  "title": "Dental Implant Case",
  "imageId": "abc123",
  "galleryImages": ["xyz456", "def789", "ghi012"]
}
```

Result: 1 cover image + 3 gallery images = 4 total images for the case!

---

## After Adding the Attribute

**Tell me:** "Done, I added galleryImages attribute"

Then I'll update all the code to support multiple images! 🚀
