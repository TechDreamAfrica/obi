// Cloudinary Image Utility
// Handles image upload, transformation, and retrieval via Cloudinary

import { cloudinaryConfig, CLOUDINARY_BASE_URL, CLOUDINARY_UPLOAD_URL } from './cloudinary-config.js';

/**
 * Upload an image to Cloudinary using unsigned upload
 * @param {File} file - The image file to upload
 * @param {Object} options - Upload options
 * @param {string} options.folder - Folder path in Cloudinary (e.g., 'gallery', 'events')
 * @param {string} options.publicId - Custom public ID for the image
 * @param {Function} options.onProgress - Progress callback function
 * @returns {Promise<Object>} Upload result with URL and public_id
 */
export async function uploadImage(file, options = {}) {
    const { folder = 'oasis-img', publicId = null, onProgress = null } = options;

    const formData = new FormData();
    formData.append('file', file);
    formData.append('upload_preset', cloudinaryConfig.uploadPreset);
    
    if (folder) {
        formData.append('folder', folder);
    }
    
    if (publicId) {
        formData.append('public_id', publicId);
    }

    return new Promise((resolve, reject) => {
        const xhr = new XMLHttpRequest();
        
        xhr.open('POST', CLOUDINARY_UPLOAD_URL, true);
        
        // Progress tracking
        if (onProgress) {
            xhr.upload.onprogress = (event) => {
                if (event.lengthComputable) {
                    const progress = Math.round((event.loaded / event.total) * 100);
                    onProgress(progress);
                }
            };
        }
        
        xhr.onload = () => {
            if (xhr.status === 200) {
                const response = JSON.parse(xhr.responseText);
                resolve({
                    url: response.secure_url,
                    publicId: response.public_id,
                    width: response.width,
                    height: response.height,
                    format: response.format,
                    resourceType: response.resource_type,
                    bytes: response.bytes
                });
            } else {
                reject(new Error(`Upload failed: ${xhr.statusText}`));
            }
        };
        
        xhr.onerror = () => reject(new Error('Upload failed: Network error'));
        xhr.send(formData);
    });
}

/**
 * Upload image from URL to Cloudinary
 * @param {string} imageUrl - URL of the image to upload
 * @param {Object} options - Upload options
 * @returns {Promise<Object>} Upload result
 */
export async function uploadImageFromUrl(imageUrl, options = {}) {
    const { folder = 'oasis-img', publicId = null } = options;

    const formData = new FormData();
    formData.append('file', imageUrl);
    formData.append('upload_preset', cloudinaryConfig.uploadPreset);
    
    if (folder) {
        formData.append('folder', folder);
    }
    
    if (publicId) {
        formData.append('public_id', publicId);
    }

    try {
        const response = await fetch(CLOUDINARY_UPLOAD_URL, {
            method: 'POST',
            body: formData
        });

        if (!response.ok) {
            throw new Error(`Upload failed: ${response.statusText}`);
        }

        const data = await response.json();
        return {
            url: data.secure_url,
            publicId: data.public_id,
            width: data.width,
            height: data.height,
            format: data.format
        };
    } catch (error) {
        console.error('Error uploading image from URL:', error);
        throw error;
    }
}

/**
 * Generate a transformed Cloudinary image URL
 * @param {string} publicIdOrUrl - Cloudinary public ID or full URL
 * @param {Object} transformations - Transformation options
 * @returns {string} Transformed image URL
 */
export function getCloudinaryUrl(publicIdOrUrl, transformations = {}) {
    const {
        width = null,
        height = null,
        crop = 'fill',           // fill, fit, scale, crop, thumb, pad
        gravity = 'auto',        // auto, face, center, north, south, etc.
        quality = 'auto',        // auto, auto:low, auto:best, 1-100
        format = 'auto',         // auto, webp, jpg, png
        blur = null,
        brightness = null,
        effect = null,
        radius = null            // for rounded corners, 'max' for circle
    } = transformations;

    // Extract public ID from URL if full URL is provided
    let publicId = publicIdOrUrl;
    if (publicIdOrUrl && publicIdOrUrl.includes('cloudinary.com')) {
        const match = publicIdOrUrl.match(/\/v\d+\/(.+?)(?:\.\w+)?$/);
        if (match) {
            publicId = match[1];
        }
    }

    if (!publicId) return '';

    // Build transformation string
    const transforms = [];
    
    if (width) transforms.push(`w_${width}`);
    if (height) transforms.push(`h_${height}`);
    if (crop) transforms.push(`c_${crop}`);
    if (gravity) transforms.push(`g_${gravity}`);
    if (quality) transforms.push(`q_${quality}`);
    if (format) transforms.push(`f_${format}`);
    if (blur) transforms.push(`e_blur:${blur}`);
    if (brightness) transforms.push(`e_brightness:${brightness}`);
    if (effect) transforms.push(`e_${effect}`);
    if (radius) transforms.push(`r_${radius}`);

    const transformString = transforms.length > 0 ? transforms.join(',') : '';

    return `${CLOUDINARY_BASE_URL}/image/upload/${transformString}/${publicId}`;
}

/**
 * Get optimized image URL for different use cases
 * @param {string} publicIdOrUrl - Cloudinary public ID or URL
 * @param {string} preset - Preset name: 'thumbnail', 'card', 'hero', 'gallery', 'avatar'
 * @returns {string} Optimized image URL
 */
export function getOptimizedImageUrl(publicIdOrUrl, preset = 'default') {
    const presets = {
        thumbnail: { width: 150, height: 150, crop: 'thumb', gravity: 'auto', quality: 'auto' },
        card: { width: 400, height: 300, crop: 'fill', gravity: 'auto', quality: 'auto' },
        hero: { width: 1920, height: 600, crop: 'fill', gravity: 'auto', quality: 'auto:good' },
        gallery: { width: 800, height: 600, crop: 'fill', gravity: 'auto', quality: 'auto' },
        avatar: { width: 200, height: 200, crop: 'fill', gravity: 'face', radius: 'max' },
        leadership: { width: 400, height: 500, crop: 'fill', gravity: 'face', quality: 'auto' },
        news: { width: 600, height: 400, crop: 'fill', gravity: 'auto', quality: 'auto' },
        event: { width: 800, height: 450, crop: 'fill', gravity: 'auto', quality: 'auto' },
        ministry: { width: 500, height: 350, crop: 'fill', gravity: 'auto', quality: 'auto' },
        default: { quality: 'auto', format: 'auto' }
    };

    const transform = presets[preset] || presets.default;
    return getCloudinaryUrl(publicIdOrUrl, transform);
}

/**
 * Generate responsive image srcset
 * @param {string} publicIdOrUrl - Cloudinary public ID or URL
 * @param {Array<number>} widths - Array of widths for srcset
 * @returns {string} Srcset string for responsive images
 */
export function generateSrcset(publicIdOrUrl, widths = [320, 640, 960, 1280, 1920]) {
    return widths
        .map(w => {
            const url = getCloudinaryUrl(publicIdOrUrl, { 
                width: w, 
                crop: 'fill', 
                quality: 'auto', 
                format: 'auto' 
            });
            return `${url} ${w}w`;
        })
        .join(', ');
}

/**
 * Check if a URL is a Cloudinary URL
 * @param {string} url - URL to check
 * @returns {boolean} True if Cloudinary URL
 */
export function isCloudinaryUrl(url) {
    if (!url) return false;
    return url.includes('cloudinary.com') || url.includes('res.cloudinary.com');
}

/**
 * Convert any image URL to use Cloudinary (via fetch)
 * @param {string} imageUrl - Original image URL
 * @returns {string} Cloudinary-compatible URL for on-the-fly fetch
 */
export function fetchRemoteImage(imageUrl) {
    if (!imageUrl) return '';
    
    // If already a Cloudinary URL, return as-is
    if (isCloudinaryUrl(imageUrl)) {
        return imageUrl;
    }

    // Use Cloudinary's fetch feature to serve remote images through CDN
    const encodedUrl = encodeURIComponent(imageUrl);
    return `${CLOUDINARY_BASE_URL}/image/fetch/f_auto,q_auto/${encodedUrl}`;
}

/**
 * Initialize Cloudinary Upload Widget (requires widget script)
 * @param {Object} options - Widget configuration
 * @param {Function} onSuccess - Success callback
 * @param {Function} onError - Error callback
 * @returns {Object} Widget instance
 */
export function initUploadWidget(options = {}, onSuccess = null, onError = null) {
    if (typeof cloudinary === 'undefined' || !cloudinary.createUploadWidget) {
        console.error('Cloudinary Upload Widget script not loaded. Add this to your HTML:\n' +
            '<script src="https://upload-widget.cloudinary.com/global/all.js" type="text/javascript"></script>');
        return null;
    }

    const defaultOptions = {
        cloudName: cloudinaryConfig.cloudName,
        uploadPreset: cloudinaryConfig.uploadPreset,
        folder: 'oasis-img',
        sources: ['local', 'url', 'camera'],
        multiple: true,
        maxFiles: 10,
        maxFileSize: 10000000, // 10MB
        styles: {
            palette: {
                window: '#FFFFFF',
                windowBorder: '#90A0B3',
                tabIcon: '#2563EB',
                menuIcons: '#5A616A',
                textDark: '#000000',
                textLight: '#FFFFFF',
                link: '#2563EB',
                action: '#2563EB',
                inactiveTabIcon: '#6B7280',
                error: '#EF4444',
                inProgress: '#2563EB',
                complete: '#10B981',
                sourceBg: '#F3F4F6'
            },
            fonts: {
                default: null,
                "'Inter', sans-serif": { url: 'https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600&display=swap', active: true }
            }
        },
        ...options
    };

    const widget = cloudinary.createUploadWidget(defaultOptions, (error, result) => {
        if (error) {
            console.error('Upload Widget Error:', error);
            if (onError) onError(error);
            return;
        }

        if (result.event === 'success') {
            const uploadResult = {
                url: result.info.secure_url,
                publicId: result.info.public_id,
                width: result.info.width,
                height: result.info.height,
                format: result.info.format
            };
            
            if (onSuccess) onSuccess(uploadResult);
        }
    });

    return widget;
}

/**
 * Open Cloudinary Upload Widget
 * @param {Object} options - Widget options
 * @returns {Promise<Object>} Upload result
 */
export function openUploadWidget(options = {}) {
    return new Promise((resolve, reject) => {
        const widget = initUploadWidget(
            options,
            (result) => resolve(result),
            (error) => reject(error)
        );

        if (widget) {
            widget.open();
        } else {
            reject(new Error('Failed to initialize upload widget'));
        }
    });
}

// Export all functions as default object for convenience
export default {
    uploadImage,
    uploadImageFromUrl,
    getCloudinaryUrl,
    getOptimizedImageUrl,
    generateSrcset,
    isCloudinaryUrl,
    fetchRemoteImage,
    initUploadWidget,
    openUploadWidget
};
