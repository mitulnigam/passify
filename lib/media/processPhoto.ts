export type ProcessPhotoOptions = {
  maxWidth?: number;
  maxHeight?: number;
  quality?: number;
  maxFileSizeMb?: number;
};

export type ProcessedPhotoResult = {
  dataUrl: string;
  file: File;
  originalSize: number;
  compressedSize: number;
  width: number;
  height: number;
};

const DEFAULT_OPTIONS: Required<ProcessPhotoOptions> = {
  maxWidth: 600,
  maxHeight: 600,
  quality: 0.85,
  maxFileSizeMb: 10,
};

/**
 * Validates, resizes, and compresses an uploaded image file on the client using HTML5 Canvas.
 * Protects against memory spikes, prevents tainted canvases, and reduces export payload size.
 */
export async function processPhoto(
  file: File,
  options?: ProcessPhotoOptions
): Promise<ProcessedPhotoResult> {
  const opts = { ...DEFAULT_OPTIONS, ...options };

  if (!file.type.startsWith("image/")) {
    throw new Error("Invalid file type. Please upload an image (PNG, JPG, or WebP).");
  }

  const maxBytes = opts.maxFileSizeMb * 1024 * 1024;
  if (file.size > maxBytes) {
    throw new Error(`File is too large. Maximum size is ${opts.maxFileSizeMb} MB.`);
  }

  return new Promise((resolve, reject) => {
    const reader = new FileReader();

    reader.onerror = () => reject(new Error("Failed to read the image file."));
    reader.onload = (e) => {
      const img = new Image();
      img.onerror = () => reject(new Error("Unable to parse image data. The file might be corrupted."));
      img.onload = () => {
        try {
          let { width, height } = img;

          // Compute new dimensions keeping aspect ratio
          if (width > opts.maxWidth || height > opts.maxHeight) {
            const ratio = Math.min(opts.maxWidth / width, opts.maxHeight / height);
            width = Math.round(width * ratio);
            height = Math.round(height * ratio);
          }

          const canvas = document.createElement("canvas");
          canvas.width = width;
          canvas.height = height;

          const ctx = canvas.getContext("2d");
          if (!ctx) {
            throw new Error("Could not initialize 2D canvas context for image processing.");
          }

          // Crisp rendering settings
          ctx.imageSmoothingEnabled = true;
          ctx.imageSmoothingQuality = "high";
          ctx.drawImage(img, 0, 0, width, height);

          // Prefer image/webp for best compression, fall back to image/jpeg
          const mimeType = "image/jpeg";
          const dataUrl = canvas.toDataURL(mimeType, opts.quality);

          canvas.toBlob(
            (blob) => {
              if (!blob) {
                reject(new Error("Image compression failed."));
                return;
              }

              const compressedFile = new File([blob], file.name.replace(/\.[^/.]+$/, ".jpg"), {
                type: mimeType,
                lastModified: Date.now(),
              });

              resolve({
                dataUrl,
                file: compressedFile,
                originalSize: file.size,
                compressedSize: blob.size,
                width,
                height,
              });
            },
            mimeType,
            opts.quality
          );
        } catch (err) {
          reject(err instanceof Error ? err : new Error(String(err)));
        }
      };

      if (typeof e.target?.result === "string") {
        img.src = e.target.result;
      } else {
        reject(new Error("Could not read file contents."));
      }
    };

    reader.readAsDataURL(file);
  });
}
