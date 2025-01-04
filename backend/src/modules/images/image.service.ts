import { v2 as cloudinary } from 'cloudinary';
import config from '~/libs/config/config';

cloudinary.config({
  cloud_name: config.cloudinary.cloudName,
  api_key: config.cloudinary.apiKey,
  api_secret: config.cloudinary.apiSecret,
});

class ImageService {
  async upload(filePath: string, folder: string): Promise<string> {
    try {
      const result = await cloudinary.uploader.upload(filePath, {
        folder,
        use_filename: true,
        unique_filename: false,
        overwrite: true,
      });

      return result.secure_url;
    } catch (error) {
      console.error('Error uploading to Cloudinary:', error);
      throw new Error('Failed to upload image');
    }
  }
}

export { ImageService };
