import { v2 as cloudinary } from 'cloudinary';

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export { cloudinary };

export async function uploadMedia(fileBuffer, folder, resourceType = 'image', originalName = '') {
  return new Promise((resolve, reject) => {
    const uploadOptions = {
      folder,
      resource_type: resourceType,
    };

    if (originalName) {
      const ext = originalName.split('.').pop().toLowerCase();
      const cleanName = originalName
        .substring(0, originalName.lastIndexOf('.'))
        .replace(/[^a-zA-Z0-9-_]/g, '_');
      
      if (resourceType === 'raw') {
        // For raw files (PDFs, docs, etc.), Cloudinary requires the extension in the public_id to serve it correctly in the browser.
        uploadOptions.public_id = `${cleanName}_${Date.now()}.${ext}`;
      } else {
        // For image/video (including audio), the extension is automatically appended by Cloudinary, so public_id shouldn't contain it.
        uploadOptions.public_id = `${cleanName}_${Date.now()}`;
      }
    }

    const uploadStream = cloudinary.uploader.upload_stream(
      uploadOptions,
      (error, result) => {
        if (error) {
          reject(error);
        } else if (result) {
          resolve({
            url: result.secure_url,
            publicId: result.public_id,
            resourceType: result.resource_type,
            format: result.format || '',
          });
        } else {
          reject(new Error('Cloudinary upload returned empty result'));
        }
      }
    );

    uploadStream.end(fileBuffer);
  });
}
