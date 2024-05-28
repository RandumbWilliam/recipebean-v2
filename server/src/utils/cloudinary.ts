import { RECIPE_BANNERS_FOLDER } from "@/constants";
import config from "@config";
import { v2 as cloudinary } from "cloudinary";

cloudinary.config({
  cloud_name: config.CLOUDINARY_CLOUD_NAME,
  api_key: config.CLOUDINARY_API_KEY,
  api_secret: config.CLOUDINARY_API_SECRET,
});

export const upload = async (imageFile: string) => {
  const response = await cloudinary.uploader.upload(imageFile, {
    folder: RECIPE_BANNERS_FOLDER,
  });

  return response.url;
};

/**
 * Validates a Base64-encoded string.
 * @param {string} encoded Base64-encoded string.
 */
export const validateBase64 = (encoded: string) => {
  if (typeof encoded !== "string") return false;
  const regex = /^data:[a-zA-Z0-9]+\/[a-zA-Z0-9-.+]+;base64,/;
  return regex.test(encoded);
};
