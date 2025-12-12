# Google Drive Image Integration Guide

## Overview

The Oasis IMG Dashboard now supports Google Drive as an image storage solution. Admins can paste Google Drive sharing links directly into dashboard forms, and the system automatically converts them to displayable image URLs.

## How It Works

### For Admins

1. **Upload Image to Google Drive**
   - Go to [Google Drive](https://drive.google.com)
   - Upload your image file
   - Right-click the image file and select "Share"

2. **Get the Sharing Link**
   - Click on "Share" button in Google Drive
   - Make sure "Viewer" access is enabled (anyone with the link can view)
   - Copy the sharing link (format: `https://drive.google.com/file/d/FILE_ID/view?usp=sharing`)

3. **Paste in Dashboard**
   - Go to the relevant dashboard page (News, Gallery, Events, Courses, Leadership, or Site Images)
   - Click "Add" or edit an existing item
   - Paste the Google Drive link in the "Image URL" field
   - The preview will show if the image is accessible
   - Save the item

### Supported Link Formats

The system automatically recognizes and converts:

- **Full sharing link**: `https://drive.google.com/file/d/FILE_ID/view`
- **Sharing link with params**: `https://drive.google.com/file/d/FILE_ID/view?usp=sharing`
- **Open link format**: `https://drive.google.com/open?id=FILE_ID`
- **Direct file ID**: Just paste the FILE_ID portion (the long alphanumeric string)

### Example

1. Google Drive link: `https://drive.google.com/file/d/1a2B3c4D5e6F7g8H9i0J1k2L3m4N5o6P7/view?usp=sharing`
2. Paste this into the dashboard form
3. The system extracts the FILE_ID and displays a preview
4. When saved, it stores the original link and creates a direct image URL

## Dashboard Pages with Google Drive Support

### 1. News (news.html)
- Add/edit news articles with featured images
- Image preview shows before publishing
- Supports featured images for blog posts

### 2. Gallery (gallery.html)
- Upload gallery images without file size limits
- Perfect for photo galleries and portfolios
- Images preview before saving

### 3. Events (events.html)
- Add event posters and banners
- Display event images on the frontend
- Image validation ensures link is public

### 4. Courses/Programs (courses.html)
- Featured images for course listings
- Display course covers on the frontend
- Support for multiple course images

### 5. Leadership (leadership.html)
- Team member photos
- Staff profile images
- Leadership team gallery

### 6. Site Images Manager (site-images.html)
- Centralized image management
- Images used across the website
- Including:
  - Logo
  - Certificate image
  - Hero images
  - Building photos
  - Class/Learning images
  - Placeholder images

## Image URL Conversion

### Backend Conversion
When you save a Google Drive link, the system:
1. Extracts the FILE_ID from the link
2. Converts it to: `https://drive.google.com/uc?export=view&id=FILE_ID`
3. This direct URL works in `<img>` tags and on the frontend

### Frontend Display
When images are displayed on the public website:
1. The system checks if the stored URL is a Google Drive link
2. Automatically converts it to the direct image URL
3. Images load and display like any other web image

## Troubleshooting

### "Preview failed - file may not be public"
**Solution**: 
- Go back to Google Drive
- Right-click the image → Share
- Set to "Viewer" - Anyone with the link
- Make sure "Share" button shows the link is ready

### Image shows broken (404 error)
**Solution**:
- Check that the Google Drive file exists
- Ensure sharing link is still active
- Try copying the link again and updating in dashboard

### Link format not recognized
**Solution**:
- Use the full sharing link format: `https://drive.google.com/file/d/FILE_ID/view`
- Or get a new sharing link from Google Drive

## Best Practices

1. **Image Naming**: Give your Google Drive files clear, descriptive names
2. **Organization**: Create folders in Google Drive for different types (News, Events, etc.)
3. **Backup**: Keep originals in case you need to update
4. **Permissions**: Always set images to "Anyone with the link" can view
5. **File Size**: Google Drive images should load quickly; optimize large images
6. **Format**: Use common formats: JPG, PNG, GIF, WebP

## How Images Are Stored

- **Database**: Original link is stored in Firestore
- **Conversion**: System auto-converts for display
- **Caching**: Browsers cache images for faster loading
- **Reliability**: Google Drive ensures 99.9% uptime

## For Developers

### Google Drive Utils Module

Location: `/dashboard/assets/js/google-drive-utils.js`

Key functions:
- `extractGoogleDriveFileId(link)` - Extract file ID
- `getGoogleDriveImageUrl(link)` - Get direct image URL
- `handleAdminGoogleDriveInput(userInput)` - Validate & process admin input
- `isValidGoogleDriveLink(link)` - Check if valid

### Example Usage

```javascript
import { getGoogleDriveImageUrl, handleAdminGoogleDriveInput } from './assets/js/google-drive-utils.js';

// Convert a Google Drive link to displayable URL
const link = 'https://drive.google.com/file/d/FILE_ID/view';
const imageUrl = getGoogleDriveImageUrl(link);

// Validate admin input
const result = handleAdminGoogleDriveInput(userInput);
if (result.success) {
    console.log('Image URL:', result.imageUrl);
} else {
    console.log('Error:', result.error);
}
```

## Security Considerations

1. **Public Links Only**: Only share images that should be public
2. **Revocation**: Images become unavailable if you unshare them
3. **URL Stability**: Google Drive links are permanent as long as access is maintained
4. **No Direct Access**: Don't expose Google Drive credentials in frontend code

## Migration from Other Sources

If you previously used other image hosting:

1. Upload old images to Google Drive
2. Get sharing links for each
3. Edit dashboard entries
4. Replace old URLs with Google Drive links
5. Save and the conversion happens automatically

## Additional Resources

- [Google Drive Help](https://support.google.com/drive)
- [Sharing files in Google Drive](https://support.google.com/drive/answer/2494822)
- [File upload limits](https://support.google.com/drive/answer/37603)

---

**Last Updated**: 2024
**Version**: 1.0
