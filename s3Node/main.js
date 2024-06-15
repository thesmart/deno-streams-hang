import { PutObjectCommand, S3Client } from '@aws-sdk/client-s3';
import { createReadStream, statSync } from 'node:fs';

const S3_REGION = process.env.S3_REGION;
const S3_BUCKET = process.env.S3_BUCKET;
const client = new S3Client({ region: S3_REGION });

const fileStat = statSync("../test.jpg");
const readStream = createReadStream("../test.jpg");
const key = Date.now() + '.jpg';

// setup the command to write the file to S3
const cmd = new PutObjectCommand({
  Bucket: S3_BUCKET,
  Key: key,
  CacheControl: 'max-age=315360000, immutable',
  ContentLength: fileStat.size,
  ContentType: 'image/jpeg',
  Body: readStream,
});

client.send(cmd).then(() => {
  console.info("done: ", key);
}).catch((err) => {
  console.error(err);
});