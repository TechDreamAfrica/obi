# Google Drive Image Setup - Quick Start

## 5-Minute Setup

### Step 1: Create Google Account (if needed)
- Go to [Google Drive](https://drive.google.com)
- Sign in with your Google account

### Step 2: Upload an Image
1. Click **"+ New"** button
2. Select **"File upload"**
3. Choose an image from your computer
4. Wait for upload to complete

### Step 3: Get Sharing Link
1. Right-click the uploaded image
2. Click **"Share"**
3. In the popup, make sure it says **"Anyone with the link"** can view
4. Click **"Copy link"**
5. You'll get something like: `https://drive.google.com/file/d/1a2B3c4D5e6F/view?usp=sharing`

### Step 4: Use in Dashboard
1. Go to [Admin Dashboard](https://oasisimg.org/dashboard/login.html)
2. Go to the page you need (News, Gallery, Events, etc.)
3. Click **"Add"** or **"Edit"**
4. Paste the Google Drive link in the **"Image URL"** field
5. Wait for preview to load
6. Click **"Save"** or **"Publish"**

✅ **Done!** The image will automatically display on the website

---

## Dashboard Pages

### 📰 News (Add news articles)
- Path: Dashboard → News
- Field: "Image URL"
- Purpose: Featured image for articles
- Recommended size: 600×400px

### 🖼️ Gallery (Image portfolio)
- Path: Dashboard → Gallery
- Field: "Image URL"
- Purpose: Portfolio/gallery display
- Recommended size: 800×600px or any aspect ratio

### 📅 Events (Event announcements)
- Path: Dashboard → Events
- Field: "Image URL"
- Purpose: Event poster/banner
- Recommended size: 1200×600px

### 📚 Programs/Courses (Course listings)
- Path: Dashboard → Programs Offered
- Field: "Image URL"
- Purpose: Course featured image
- Recommended size: 600×400px

### 👥 Leadership (Team profiles)
- Path: Dashboard → Leadership
- Field: "Image URL"
- Purpose: Staff/leadership photo
- Recommended size: 300×400px (portrait)

### 🎨 Site Images (Global images)
- Path: Dashboard → Site Images
- Images managed:
  - **Logo**: Website logo
  - **Certificate**: Graduation/certificate image
  - **Students**: Student activity image
  - **Building**: Campus/building photo
  - **Class**: Classroom learning image
  - **Leadership**: Leadership team photo
  - **About**: About page image
  - **Story**: Ministry story image

---

## Fixing Image Issues

### Image shows broken/404
**Solution:**
1. Go to Google Drive
2. Find your image file
3. Right-click → **Share**
4. Change to **"Anyone with the link"** → View
5. Copy the NEW link
6. Update in dashboard
7. Save

### Preview won't load
**Solution:**
1. Make sure Google Drive link is **public** (Anyone with link)
2. Try copying the link again
3. Paste in dashboard and wait 2-3 seconds for preview

### Link not recognized
**Solution:**
- Use the full Google Drive link format
- Should look like: `https://drive.google.com/file/d/FILE_ID/view?usp=sharing`
- NOT just the ID alone

---

## Important Tips

✅ **DO:**
- Make Google Drive files **"Anyone with the link"** can view
- Use descriptive file names in Google Drive
- Organize images in folders (News, Events, etc.)
- Optimize large images before uploading
- Keep backup of originals

❌ **DON'T:**
- Keep images as "Private" - nobody can see them
- Delete Google Drive images after uploading to website
- Share with specific people - use "Anyone with link"
- Upload extremely large files (>10MB)
- Use random file names

---

## Supported Image Formats

✅ Recommended:
- JPG/JPEG - Best for photos
- PNG - For images with transparency
- WebP - Modern, smaller file size

⚠️ Should work but not ideal:
- GIF - For simple graphics
- BMP - Older format
- SVG - Vector graphics

---

## Troubleshooting Checklist

If images aren't showing, go through this list:

- [ ] Google Drive link is set to "Anyone with the link"
- [ ] Link format looks like: `drive.google.com/file/d/...`
- [ ] You clicked "Save" or "Publish" in dashboard
- [ ] Website was refreshed (Ctrl+Shift+R)
- [ ] Google Drive file still exists (not deleted)
- [ ] File size isn't too large (10MB+)
- [ ] Tried right-clicking image → Inspect → check img src URL

---

## Example Workflows

### Workflow 1: Adding News Article with Image

```
1. Upload image to Google Drive
2. Right-click → Share → Copy Link
3. Dashboard → News → Add News
4. Fill in: Title, Category, Author, Content
5. Paste Google Drive link in "Image URL"
6. Wait for preview to show
7. Click "Publish"
8. Image appears on website
```

### Workflow 2: Updating Gallery

```
1. Create folder in Google Drive called "Gallery"
2. Upload 5-10 images to folder
3. For each image:
   - Right-click → Share → Copy Link
   - Dashboard → Gallery → Add Image
   - Paste link
   - Add title & description
   - Save
4. All images appear on Gallery page
```

### Workflow 3: Bulk Update Site Images

```
1. Upload all site images to Google Drive
2. Get sharing link for each
3. Dashboard → Site Images
4. For each image type (Logo, Certificate, etc.):
   - Paste Google Drive link
   - Click Save
5. All website images update instantly
```

---

## How It Works (Technical)

When you paste a Google Drive link:
1. ✅ System extracts the file ID from the link
2. ✅ Converts it to: `drive.google.com/uc?export=view&id=FILE_ID`
3. ✅ This URL works in HTML `<img>` tags
4. ✅ Image displays on your website

**Data stored:** Original Google Drive link is saved to database

**No uploads needed:** You don't upload to our server - Google Drive hosts the image

---

## File Size & Performance

**Recommended file sizes:**
- **Small images** (thumbnails): 100KB - 300KB
- **Medium images** (articles): 300KB - 800KB  
- **Large images** (full width): 800KB - 2MB
- **Maximum**: 10MB per file

**Optimization tips:**
- Use [tinypng.com](https://tinypng.com) to compress
- Export as JPG for photos (smaller than PNG)
- Use 1200×600 max dimensions, not 3000×2000

---

## Need Help?

**Common Questions:**

Q: Will my images break if I delete the Google Drive file?
A: Yes - always keep the file in Google Drive

Q: Can I use private Google Drive images?
A: No - must be "Anyone with the link" to view

Q: Can I use someone else's Google Drive images?
A: Yes - if they share the link with "Anyone with the link"

Q: How many images can I upload?
A: Unlimited (Google Drive limit is 15GB free)

Q: Do images need to be square?
A: No - any aspect ratio works (landscape, portrait, etc.)

---

**Last Updated:** 2024
**Version:** 1.0
