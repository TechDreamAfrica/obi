// Google Drive Image Utility
// Handles conversion and processing of Google Drive image links

/**
 * Extract Google Drive file ID from various Google Drive link formats
 * @param {string} link - Google Drive link in various formats
 * @returns {string|null} File ID or null if invalid
 * 
 * Accepts formats:
 * - https://drive.google.com/file/d/FILE_ID/view
 * - https://drive.google.com/file/d/FILE_ID/view?usp=sharing
 * - https://drive.google.com/open?id=FILE_ID
 * - FILE_ID (direct ID)
 */
export function extractGoogleDriveFileId(link) {
    if (!link) return null;
    
    try {
        // If it's already just an ID (alphanumeric string)
        if (/^[a-zA-Z0-9_-]+$/.test(link) && link.length > 10) {
            return link;
        }

        // Try to match /file/d/FILE_ID/ pattern
        const filePattern = /\/file\/d\/([a-zA-Z0-9_-]+)/;
        const fileMatch = link.match(filePattern);
        if (fileMatch) return fileMatch[1];

        // Try to match open?id=FILE_ID pattern
        const openPattern = /id=([a-zA-Z0-9_-]+)/;
        const openMatch = link.match(openPattern);
        if (openMatch) return openMatch[1];

        // Try URL parameter
        try {
            const url = new URL(link);
            const id = url.searchParams.get('id');
            if (id) return id;
        } catch (e) {
            // Not a valid URL
        }

        return null;
    } catch (error) {
        console.error('Error extracting Google Drive file ID:', error);
        return null;
    }
}

/**
 * Convert Google Drive link to direct image URL for display
 * @param {string} link - Google Drive link or file ID
 * @returns {string} Direct image URL
 */
export function getGoogleDriveImageUrl(link) {
    const fileId = extractGoogleDriveFileId(link);
    if (!fileId) {
        console.warn('Invalid Google Drive link:', link);
        return '';
    }
    return `https://drive.google.com/uc?export=view&id=${fileId}`;
}

/**
 * Get thumbnail URL for Google Drive image
 * @param {string} link - Google Drive link or file ID
 * @returns {string} Thumbnail URL
 */
export function getGoogleDriveThumbnailUrl(link) {
    const fileId = extractGoogleDriveFileId(link);
    if (!fileId) {
        console.warn('Invalid Google Drive link:', link);
        return '';
    }
    return `https://drive.google.com/thumbnail?id=${fileId}&sz=w200`;
}

/**
 * Get preview URL for Google Drive image
 * @param {string} link - Google Drive link or file ID
 * @param {number} size - Size parameter (default: 200)
 * @returns {string} Preview URL
 */
export function getGoogleDrivePreviewUrl(link, size = 400) {
    const fileId = extractGoogleDriveFileId(link);
    if (!fileId) {
        console.warn('Invalid Google Drive link:', link);
        return '';
    }
    return `https://drive.google.com/thumbnail?id=${fileId}&sz=w${size}`;
}

/**
 * Validate if a link is a valid Google Drive link
 * @param {string} link - Link to validate
 * @returns {boolean} True if valid Google Drive link
 */
export function isValidGoogleDriveLink(link) {
    if (!link) return false;
    const fileId = extractGoogleDriveFileId(link);
    return fileId !== null;
}

/**
 * Create an image element from Google Drive link
 * @param {string} link - Google Drive link
 * @param {object} options - Image options
 * @returns {HTMLImageElement} Image element
 */
export function createGoogleDriveImage(link, options = {}) {
    const img = document.createElement('img');
    img.src = getGoogleDriveImageUrl(link);
    img.alt = options.alt || 'Image from Google Drive';
    img.className = options.className || '';
    img.style.maxWidth = options.maxWidth || '100%';
    img.style.maxHeight = options.maxHeight || 'auto';
    
    if (options.width) img.style.width = options.width;
    if (options.height) img.style.height = options.height;
    if (options.loading) img.loading = options.loading;
    if (options.onerror) img.onerror = options.onerror;
    
    return img;
}

/**
 * Convert multiple Google Drive links from a comma-separated string
 * @param {string} linksString - Comma-separated Google Drive links
 * @returns {array} Array of processed image URLs
 */
export function processMultipleGoogleDriveLinks(linksString) {
    if (!linksString) return [];
    
    return linksString
        .split(',')
        .map(link => link.trim())
        .filter(link => link.length > 0)
        .map(link => getGoogleDriveImageUrl(link))
        .filter(url => url.length > 0);
}

/**
 * Handle Google Drive link input from admin
 * Validates and converts the link format
 * @param {string} userInput - Link pasted by admin
 * @returns {object} {success, imageUrl, fileId, error}
 */
export function handleAdminGoogleDriveInput(userInput) {
    if (!userInput || userInput.trim().length === 0) {
        return { success: false, error: 'Please enter a Google Drive link' };
    }

    const fileId = extractGoogleDriveFileId(userInput.trim());
    
    if (!fileId) {
        return { 
            success: false, 
            error: 'Invalid Google Drive link format. Please use:\n' +
                   '• https://drive.google.com/file/d/FILE_ID/view\n' +
                   '• Or just paste the FILE_ID'
        };
    }

    const imageUrl = getGoogleDriveImageUrl(fileId);
    
    return {
        success: true,
        fileId: fileId,
        imageUrl: imageUrl,
        thumbnailUrl: getGoogleDriveThumbnailUrl(fileId)
    };
}

export default {
    extractGoogleDriveFileId,
    getGoogleDriveImageUrl,
    getGoogleDriveThumbnailUrl,
    getGoogleDrivePreviewUrl,
    isValidGoogleDriveLink,
    createGoogleDriveImage,
    processMultipleGoogleDriveLinks,
    handleAdminGoogleDriveInput
};
