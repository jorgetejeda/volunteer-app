import imageCompression from "browser-image-compression";

export const compressImages = async (
  images: File[],
  options: Record<string, number | boolean>,
) => {
  const compressedImages = [];

  for (const image of images) {
    if (image.type.startsWith("image/")) {
      try {
        console.log(
          `compressedFile size before->>>  ${image.size / 1024 / 1024} MB`,
          image.size,
        ); // smaller than maxSizeMB

        const compressedFile = await imageCompression(image, options);

        console.log(
          `compressedFile size after ->>> ${
            compressedFile.size / 1024 / 1024
          } MB`,
        ); // smaller than maxSizeMB

        compressedImages.push(compressedFile);
      } catch (error) {
        console.log(error);
        // Handle the error as needed
      }
    } else {
      compressedImages.push(image);
    }
  }

  return compressedImages;
};
