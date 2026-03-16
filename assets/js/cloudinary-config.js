// Cloudinary Configuration
// Replace these values with your Cloudinary account details

const cloudinaryConfig = {
    cloudName: 'dhdw63wff',          // Your Cloudinary cloud name
    uploadPreset: 'oasis-unsigned',    // Unsigned upload preset name
    apiKey: 'BgU-mMdzstu3d--Jl555CFS6IpU'                  // Optional: Only needed for signed uploads
};

// Cloudinary base URLs
const CLOUDINARY_BASE_URL = `https://res.cloudinary.com/${cloudinaryConfig.cloudName}`;
const CLOUDINARY_UPLOAD_URL = `https://api.cloudinary.com/v1_1/${cloudinaryConfig.cloudName}/image/upload`;

// Export configuration
export { cloudinaryConfig, CLOUDINARY_BASE_URL, CLOUDINARY_UPLOAD_URL };
