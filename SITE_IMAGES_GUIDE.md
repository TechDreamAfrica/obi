# Site Images Management Guide

## Overview

The OBI Dashboard now includes a **Site Images Manager** that allows you to replace all website images with Google Drive hosted images. This means you don't need to upload images directly to your server - just upload them to Google Drive and paste the links!

## Benefits

- ✅ **Easy Updates**: Change images without touching code
- ✅ **Cloud Storage**: Images stored on Google Drive (unlimited storage with Google account)
- ✅ **Fast Loading**: Google Drive's CDN ensures fast image delivery
- ✅ **No Server Space**: Saves your hosting storage
- ✅ **Real-time Updates**: Changes reflect immediately on the website

## How to Use

### Step 1: Upload Images to Google Drive

1. Go to [Google Drive](https://drive.google.com/)
2. Create a folder for your site images (e.g., "OBI Website Images")
3. Upload your images to this folder
4. Recommended image names:
   - `logo.jpg` or `logo.png` - Your institute logo
   - `cert.jpg` - Certificate/credentials image
   - `students.jpg` - Students photo
   - `building.jpg` - Building/facilities image
   - `class.jpg` - Classroom image
   - `leadership.jpg` - Leadership photo
   - `abt.jpg` - About us image
   - `story.jpg` - Our story image
   - `placeholder.jpg` - Default placeholder

### Step 2: Get Google Drive Share Links

For each image:

1. Right-click the image file in Google Drive
2. Click **"Get link"** or **"Share"**
3. Change access to **"Anyone with the link"** can **view**
4. Click **"Copy link"**
5. You'll get a link like:
   ```
   https://drive.google.com/file/d/1ABC123xyz456/view?usp=sharing
   ```

### Step 3: Add Links to Dashboard

1. Log in to your dashboard
2. Click **"Site Images"** in the sidebar
3. For each image:
   - Paste the Google Drive link in the input field
   - Click **"Save"**
   - The preview will show your image immediately

### Step 4: Verify on Website

1. Go to your public website
2. Refresh the page (Ctrl+F5 or Cmd+Shift+R)
3. Your new images should appear!

## Bulk Update

Save time by updating multiple images at once:

1. Go to **Site Images** page
2. Scroll to **"Bulk Update"** section
3. Enter one image per line in this format:
   ```
   logo=https://drive.google.com/file/d/YOUR_LOGO_FILE_ID/view
   cert=https://drive.google.com/file/d/YOUR_CERT_FILE_ID/view
   students=https://drive.google.com/file/d/YOUR_STUDENTS_FILE_ID/view
   ```
4. Click **"Bulk Update"**
5. All images will be saved at once!

## Available Image Slots

| Image Name | Used On | Description |
|------------|---------|-------------|
| **logo** | All pages | Your institute logo in header |
| **cert** | Homepage, OBI section | Certificate/credentials display |
| **students** | Homepage, OBI section | Students or campus life |
| **building** | Homepage | Ministry or building photo |
| **class** | Homepage | Classroom or teaching scene |
| **leadership** | Homepage | Leadership or community |
| **abt** | About page | Main about us image |
| **story** | About page | Our story section |
| **placeholder** | Various | Default image for missing content |

## Tips for Best Results

### Image Dimensions

- **Logo**: 200x60px to 400x120px (landscape)
- **Hero Images** (cert, students): 1200x600px to 1920x1080px
- **Feature Images** (building, class, leadership): 800x600px minimum
- **About Images**: 1000x800px minimum

### Image Quality

- Use **JPEG** for photos (smaller file size)
- Use **PNG** for logos with transparency
- Compress images before uploading (recommended: under 500KB each)
- Tools: [TinyPNG](https://tinypng.com/), [Compressor.io](https://compressor.io/)

### Google Drive Tips

1. **Organize Files**: Keep images in dedicated folders
2. **Consistent Naming**: Use clear, descriptive names
3. **Backup**: Keep original high-resolution versions
4. **Permissions**: Always set to "Anyone with link can view"

## Troubleshooting

### Images Not Showing

**Problem**: Pasted Google Drive link but image doesn't appear

**Solutions**:
- ✅ Ensure link sharing is set to "Anyone with link can view"
- ✅ Check if the link is complete (includes `/view` at the end)
- ✅ Try a different browser or clear cache
- ✅ Wait 1-2 minutes for changes to propagate

### Image Shows in Dashboard But Not on Website

**Solutions**:
- ✅ Hard refresh the website (Ctrl+F5 or Cmd+Shift+R)
- ✅ Clear browser cache
- ✅ Check browser console for errors (F12)
- ✅ Verify the image name matches exactly

### Preview Shows "No Image Set"

**Solutions**:
- ✅ Click "Save" after pasting the link
- ✅ Check if the Google Drive link is valid
- ✅ Make sure file is an image (JPG, PNG, GIF)
- ✅ Try copying the link again from Google Drive

### "Access Denied" Error

**Solutions**:
- ✅ Change sharing settings to "Anyone with link"
- ✅ Remove any access restrictions
- ✅ Re-copy the share link after changing settings

## How It Works

### Behind the Scenes

1. **Upload to Dashboard**: You paste Google Drive links
2. **Automatic Conversion**: System converts links to direct image URLs
3. **Store in Firebase**: Links saved in Firestore database
4. **Frontend Fetches**: Website loads images from Firebase
5. **Display Images**: Converted Google Drive URLs show images

### Link Conversion

The system automatically converts:
```
FROM: https://drive.google.com/file/d/1ABC123xyz456/view
TO:   https://drive.google.com/uc?export=view&id=1ABC123xyz456
```

This makes the image display directly without opening Google Drive viewer.

## Advanced Usage

### Using in Custom Code

If you're adding custom pages or features, you can use the site images system:

```javascript
// Import the utility
import { getSiteImage, loadSiteImage } from './assets/js/site-images.js';

// Get an image URL
const logoUrl = await getSiteImage('logo');

// Load image into an element
const imgElement = document.getElementById('my-image');
await loadSiteImage(imgElement, 'logo', 'fallback.jpg');

// Replace all images on page
import { replacePageImages } from './assets/js/site-images.js';
await replacePageImages();
```

### Using Data Attributes

Add this to any image tag:
```html
<img data-site-image="logo" src="assets/images/logo.jpg" alt="Logo">
```

The system will automatically replace it with the Google Drive image!

## Security & Privacy

- ✅ **Safe**: Google Drive links are read-only
- ✅ **Private Dashboard**: Only admins can change images
- ✅ **Public Images**: Website visitors can see images (as intended)
- ✅ **No Risk**: Viewers can't access your Google Drive account

## Best Practices

### Naming Convention

Use consistent names:
- `hero-image.jpg` instead of `IMG_1234.jpg`
- `logo-2024.png` instead of `untitled.png`

### File Organization

```
Google Drive/
  └── OBI Website Images/
      ├── logos/
      │   └── logo.png
      ├── homepage/
      │   ├── cert.jpg
      │   ├── students.jpg
      │   └── building.jpg
      └── about/
          ├── abt.jpg
          └── story.jpg
```

### Update Process

1. Upload new image to Google Drive
2. Get share link
3. Update in dashboard
4. Verify on website
5. Delete old image from Google Drive (optional)

## Maintenance

### Regular Tasks

- **Monthly**: Review and optimize image sizes
- **Quarterly**: Check for unused images in Google Drive
- **As Needed**: Update images for events, news, seasonal changes

### Monitoring

- Check website regularly to ensure images load
- Monitor Google Drive storage usage
- Keep backup copies of important images

## Support

### Common Questions

**Q: Can I use images from other websites?**  
A: Only use images you have rights to. Upload your own photos or use licensed stock images.

**Q: Is there a limit to how many images I can store?**  
A: Google Drive free accounts get 15GB. Upgrade for more storage if needed.

**Q: Will old images still work if I change them?**  
A: Yes, updating an image slot replaces it everywhere on the site automatically.

**Q: Can I use this for news and events images?**  
A: Yes! When adding news/events in the dashboard, you can use Google Drive links for those images too.

## Summary

The Site Images Manager makes it easy to:
- 🖼️ Manage all website images from one place
- ☁️ Store images on Google Drive
- ⚡ Update images without coding
- 🔄 See changes immediately
- 💾 Save hosting space

**Need Help?** Check the dashboard for visual guides and tooltips!

---

**Version**: 1.0  
**Last Updated**: December 8, 2025
