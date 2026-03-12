import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";

// Lazily initialize S3 client to avoid "Region is missing" error during build
let s3Client: S3Client | null = null;

function getS3Client(): S3Client {
  if (!s3Client) {
    s3Client = new S3Client({
      region: process.env.AWS_REGION || "",
      credentials: {
        accessKeyId: process.env.AWS_ACCESS_KEY_ID || "",
        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY || "",
      },
    });
  }
  return s3Client;
}

export interface UploadResult {
  imageUrl: string;
  key: string;
}

/**
 * Upload a file to AWS S3
 * @param file - The file buffer to upload
 * @param fileName - The name to give the file
 * @param contentType - The MIME type of the file
 * @returns The public URL of the uploaded file
 */
export async function uploadToS3(
  file: Buffer,
  fileName: string,
  contentType: string
): Promise<UploadResult> {
  const bucketName = process.env.AWS_S3_BUCKET_NAME;

  if (!bucketName) {
    throw new Error("AWS_S3_BUCKET_NAME is not configured");
  }

  // Generate unique key with timestamp
  const timestamp = Date.now();
  const key = `ads/${timestamp}-${fileName}`;

  const command = new PutObjectCommand({
    Bucket: bucketName,
    Key: key,
    Body: file,
    ContentType: contentType,
  });

  try {
    await getS3Client().send(command);

    // Construct the public URL
    const imageUrl = `https://${bucketName}.s3.${process.env.AWS_REGION}.amazonaws.com/${key}`;

    return { imageUrl, key };
  } catch (error) {
    console.error("S3 upload error:", error);
    throw new Error("Failed to upload file to S3");
  }
}

/**
 * Validate environment variables for S3
 */
export function validateS3Config(): { isValid: boolean; error?: string } {
  const requiredVars = [
    "AWS_REGION",
    "AWS_ACCESS_KEY_ID",
    "AWS_SECRET_ACCESS_KEY",
    "AWS_S3_BUCKET_NAME",
  ];

  for (const varName of requiredVars) {
    if (!process.env[varName]) {
      return {
        isValid: false,
        error: `Missing required environment variable: ${varName}`,
      };
    }
  }

  return { isValid: true };
}
