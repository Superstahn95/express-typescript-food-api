type GetExtension = (mimeType: string) => string | boolean;
export const getImageExtension: GetExtension = (mimeType) => {
  switch (mimeType) {
    case "image/png":
      return ".png";
    case "image/PNG":
      return ".PNG";
    case "image/jpg":
      return ".jpg";
    case "image/JPG":
      return ".JPG";
    case "image/JPEG":
      return ".JPEG";
    case "image/jpeg":
      return ".jpeg";
    case "image/webp":
      return ".webp";
    default:
      return false;
  }
};

// export default getImageExtension;
