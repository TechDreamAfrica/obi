# Cloudinary Setup Guide for Oasis IMG

This guide explains how to set up Cloudinary for image storage in your Oasis IMG website.

## What is Cloudinary?

Cloudinary is a cloud-based image and video management service that provides:
- **Fast CDN delivery** - Images load quickly from servers worldwide
- **Automatic optimization** - Images are compressed and formatted automatically
- **Easy transformations** - Resize, crop, and apply effects on-the-fly
- **Simple uploads** - Drag-and-drop upload widget included

## Setup Instructions

### Step 1: Create a Cloudinary Account

1. Go to [https://cloudinary.com/](https://cloudinary.com/)
2. Click **"Sign up for free"**
3. Fill in your details or sign up with Google/GitHub
4. Verify your email address

### Step 2: Get Your Cloud Name

1. After logging in, go to your **Dashboard**
2. Your **Cloud Name** is displayed at the top (e.g., `dab1234xyz`)
3. Copy this name - you'll need it for configuration

### Step 3: Create an Upload Preset

1. Go to **Settings** → **Upload**
2. Scroll down to **Upload presets**
3. Click **"Add upload preset"**
4. Configure the preset:
   - **Preset name**: `oasis-img-unsigned` (or any name you prefer)
   - **Signing Mode**: Select **"Unsigned"** (important for frontend uploads)
   - **Folder**: `oasis-img` (optional, keeps images organized)
5. Click **"Save"**

### Step 4: Configure Your Website

Edit the file `assets/js/cloudinary-config.js`:

```javascript
const cloudinaryConfig = {
    cloudName: 'YOUR_CLOUD_NAME',          // Replace with your cloud name
    uploadPreset: 'oasis-img-unsigned',     // Replace with your preset name
    apiKey: 'YOUR_API_KEY'                  // Optional
};
```

**Example:**
```javascript
const cloudinaryConfig = {
    cloudName: 'dab1234xyz',
    uploadPreset: 'oasis-img-unsigned',
    apiKey: '123456789012345'
};
```

### Step 5: Test the Integration

1. Go to your dashboard at `/dashboard/gallery.html`
2. Click **"Add Image"**
3. Click the **"Upload Image"** button
4. Select an image from your device
5. The image should upload and display a preview

## Usage Examples

### In Templates (HTML)

Use Cloudinary URLs directly in your image tags:

```html
<!-- Basic usage -->
<img src="https://res.cloudinary.com/YOUR_CLOUD_NAME/image/upload/v1234567890/oasis-img/image.jpg">

<!-- With automatic optimization -->
<img src="https://res.cloudinary.com/YOUR_CLOUD_NAME/image/upload/f_auto,q_auto/oasis-img/image.jpg">

<!-- Responsive with transformations -->
<img src="https://res.cloudinary.com/YOUR_CLOUD_NAME/image/upload/w_800,h_600,c_fill,f_auto,q_auto/oasis-img/image.jpg">
```

### In JavaScript

```javascript
import { getOptimizedImageUrl, getCloudinaryUrl } from './cloudinary-utils.js';

// Get optimized URL for thumbnails
const thumbnailUrl = getOptimizedImageUrl(imageUrl, 'thumbnail');

// Get optimized URL for gallery
const galleryUrl = getOptimizedImageUrl(imageUrl, 'gallery');

// Custom transformations
const customUrl = getCloudinaryUrl(imageUrl, {
    width: 600,
    height: 400,
    crop: 'fill',
    quality: 'auto'
});
```

### Available Presets

| Preset | Width | Height | Use Case |
|--------|-------|--------|----------|
| `thumbnail` | 150 | 150 | Small previews |
| `card` | 400 | 300 | News cards, listings |
| `gallery` | 800 | 600 | Gallery images |
| `hero` | 1920 | 600 | Hero banners |
| `avatar` | 200 | 200 | Profile pictures (circular) |
| `leadership` | 400 | 500 | Leadership photos |
| `news` | 600 | 400 | News article images |
| `event` | 800 | 450 | Event banners |
| `ministry` | 500 | 350 | Ministry images |

## Image Transformations

### Common Parameters

| Parameter | Values | Description |
|-----------|--------|-------------|
| `w_` | Number | Width in pixels |
| `h_` | Number | Height in pixels |
| `c_` | fill, fit, crop, thumb, scale | Crop mode |
| `g_` | auto, face, center, north | Gravity (focus point) |
| `q_` | auto, auto:low, auto:best, 1-100 | Quality |
| `f_` | auto, webp, jpg, png | Format |
| `r_` | Number or 'max' | Border radius (max = circle) |

### Example Transformations

```javascript
// Thumbnail with face detection
getCloudinaryUrl(url, { width: 200, height: 200, crop: 'thumb', gravity: 'face' })

// Full-width responsive
getCloudinaryUrl(url, { width: 1200, quality: 'auto', format: 'auto' })

// Circular avatar
getCloudinaryUrl(url, { width: 150, height: 150, crop: 'fill', gravity: 'face', radius: 'max' })
```

## Troubleshooting

### Upload Widget Not Loading

**Symptom:** The upload button doesn't open the widget

**Solutions:**
1. Check browser console for errors
2. Verify Cloudinary script is loaded in HTML:
   ```html
   <script src="https://upload-widget.cloudinary.com/global/all.js"></script>
   ```
3. Verify your cloud name is correct in config

### Upload Fails

**Symptom:** Error when trying to upload

**Solutions:**
1. Ensure upload preset is set to **"Unsigned"**
2. Check that your cloud name matches exactly
3. Verify the preset name is correct
4. Check Cloudinary dashboard for upload errors

### Images Not Displaying

**Symptom:** Uploaded images show broken image icon

**Solutions:**
1. Check the URL in browser directly
2. Verify the cloud name in URLs is correct
3. Check if the image was uploaded successfully in Cloudinary dashboard

### Mixed Content Errors

**Symptom:** Images blocked on HTTPS site

**Solution:** Always use `secure_url` (https://) from upload response. The utils already handle this.

## File Structure

```
assets/js/
├── cloudinary-config.js    # Your Cloudinary credentials
├── cloudinary-utils.js     # Upload and transformation utilities
├── site-images.js          # Updated to support Cloudinary URLs

dashboard/assets/js/
├── cloudinary-config.js    # Re-exports main config
```

## Security Notes

1. **Never expose your API Secret** - It's not needed for unsigned uploads
2. **Use unsigned presets** for frontend uploads
3. **Restrict upload presets** if needed:
   - Limit file types (jpg, png, gif, webp)
   - Set max file size (10MB recommended)
   - Restrict to specific folders

## Cost Considerations

Cloudinary's free tier includes:
- 25 credits / month
- ~25 GB storage
- ~25 GB bandwidth
- 25,000 transformations

For a small church website, this is typically sufficient. Monitor usage in your Cloudinary dashboard.

## Support

- [Cloudinary Documentation](https://cloudinary.com/documentation)
- [Upload Widget Guide](https://cloudinary.com/documentation/upload_widget)
- [Image Transformations](https://cloudinary.com/documentation/image_transformations)
