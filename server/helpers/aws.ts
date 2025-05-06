import {
  S3Client,
  PutObjectCommand,
  GetObjectCommand,
  DeleteObjectCommand
} from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";

const clientConfig = {
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY,
    secretAccessKey: process.env.AWS_SECRET_KEY,
  },
  region: 'us-west-2'
}

const s3 = new S3Client(clientConfig);
const bucketName = 'carlsmed-memes-1';

type ShipToS3Args = {
  originalname: string
  buffer: string,
  mimetype: string
}

export async function shipImageBufferToS3({ originalname, buffer, mimetype }: ShipToS3Args) {
  const options = {
    Bucket: bucketName,
    Key: originalname,
    Body: buffer,
    ContentType: mimetype
  }

  const putCommand = new PutObjectCommand(options);

  await s3.send(putCommand);

  const getOptions = {
    Bucket: bucketName,
    Key: originalname
  }
  const getCommand = new GetObjectCommand(getOptions);
  const url = await getSignedUrl(s3, getCommand, { expiresIn: 604799 });
  return url;
}

type DeleteFromS3Args = {
  originalImageName: string
}

export async function deleteImageFromS3({ originalImageName }: DeleteFromS3Args) {
  const options = {
    Bucket: bucketName,
    Key: originalImageName,
  }
  
  const command = new DeleteObjectCommand(options);

  await s3.send(command);
}