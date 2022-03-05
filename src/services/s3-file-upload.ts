import AWS from "aws-sdk";
import fs from "fs";
import dotenv from "dotenv";
dotenv.config();
import axios from "axios";

interface s3Upload {
  fileName: string;
  fileType: string;
  bucketName: string;
}

AWS.config.credentials = new AWS.Credentials({
  accessKeyId: process.env.AWS_ACCESS_KEY_ID as string,
  secretAccessKey: process.env.AWS_ACCESS_KEY_SECRET as string,
});

const s3 = new AWS.S3({ region: "us-east-1" });

export const getSignedUploadUrl = ({
  fileName,
  fileType,
  bucketName,
}: s3Upload) => {
  return s3.getSignedUrl("putObject", {
    Bucket: bucketName,
    Key: fileName,
    Expires: 604800,
    ContentType: fileType,
  });
};

/*
    This function gets a signed URL and then uses AXIOS to upload a buffer read from a localfile.
    A workflow like this simulates a UI File upload architecture.
*/
export default async function s3FileUpload(
  name: string,
  sub: string[],
  options: any
) {
  console.log(name, sub, options);
  try {
    if (!sub[0]) {
      throw new Error("You need to spesifcy YOURBUCKET: see README");
    }
    const file = fs.readFileSync("src/files/fistbump.png");
    const fileType = "image/png";

    const uploadUrl = getSignedUploadUrl({
      fileName: "fistbump.png",
      fileType,
      bucketName: sub[0],
    });

    await axios.put(uploadUrl, file, {
      headers: {
        "Content-Type": fileType,
      },
    });
  } catch (e) {
    console.error(e);
  }
}
