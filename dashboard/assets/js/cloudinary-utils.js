// Cloudinary Utils for Dashboard
// Provides uploadImage, getOptimizedImageUrl, and isCloudinaryUrl
// using the dashboard cloudinary config

import { cloudinaryConfig, CLOUDINARY_BASE_URL, CLOUDINARY_UPLOAD_URL } from './cloudinary-config.js';

/**
 * Upload an image to Cloudinary using unsigned upload
 * @param {File} file - The image file to upload
 * @param {Object} options - Upload options
 * @param {string} options.folder - Folder path in Cloudinary (e.g., 'gallery', 'events')
 * @param {string} options.publicId - Custom public ID for the image
 * @param {Function} options.onProgress - Progress callback function
 * @returns {Promise<Object>} Upload result with url and publicId
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
 * Check if a URL is a Cloudinary URL
 * @param {string} url - URL to check
 * @returns {boolean}
 */
export function isCloudinaryUrl(url) {
    if (!url) return false;
    return url.includes('cloudinary.com') || url.includes('res.cloudinary.com');
}

/**
 * Get an optimized Cloudinary image URL for a given preset.
 * @param {string} publicIdOrUrl
 * @param {string} preset - 'thumbnail'|'card'|'hero'|'gallery'|'avatar'|'leadership'|'news'|'event'|'ministry'|'default'
 * @returns {string}
 */
export function getOptimizedImageUrl(publicIdOrUrl, preset = 'default') {
    if (!publicIdOrUrl) return '';
    if (!isCloudinaryUrl(publicIdOrUrl)) return publicIdOrUrl;

    const presets = {
        thumbnail:  { width: 150,  height: 150,  crop: 'thumb',  quality: 'auto' },
        card:       { width: 400,  height: 300,  crop: 'fill',   quality: 'auto' },
        hero:       { width: 1920, height: 600,  crop: 'fill',   quality: 'auto:good' },
        gallery:    { width: 800,  height: 600,  crop: 'fill',   quality: 'auto' },
        avatar:     { width: 200,  height: 200,  crop: 'fill',   quality: 'auto' },
        leadership: { width: 400,  height: 500,  crop: 'fill',   quality: 'auto' },
        news:       { width: 600,  height: 400,  crop: 'fill',   quality: 'auto' },
        event:      { width: 800,  height: 450,  crop: 'fill',   quality: 'auto' },
        ministry:   { width: 500,  height: 350,  crop: 'fill',   quality: 'auto' },
        default:    { quality: 'auto', fetch_format: 'auto' }
    };

    const t = presets[preset] || presets.default;
    const parts = [];
    if (t.width)        parts.push(`w_${t.width}`);
    if (t.height)       parts.push(`h_${t.height}`);
    if (t.crop)         parts.push(`c_${t.crop}`);
    if (t.quality)      parts.push(`q_${t.quality}`);
    if (t.fetch_format) parts.push(`f_${t.fetch_format}`);

    const transform = parts.join(',');
    // Insert transformation into a Cloudinary URL like:
    // https://res.cloudinary.com/<cloud>/image/upload/<transform>/<rest>
    return publicIdOrUrl.replace(/\/upload\//, `/upload/${transform}/`);
}
