import { PutObjectCommand } from "@aws-sdk/client-s3";
import { s3Client } from "../libs/s3Client.js";
import { readFileSync } from 'fs';
import {sendMsg} from './sqsSendMessage.js';

const BODY = readFileSync(`../UploadMeS3/sampleDemo.text`).toString();
console.log(BODY);

const params = {
    Bucket: "mysqsbucketuploadingfileintoit-123321",
    Key: "sampleDemo.text",
    Body: "BODY",
};
const run = async () => {
    // Created an object and uploading it to the Amazon S3 bucket.
    try {
        const results = await s3Client.send(new PutObjectCommand(params));
        console.log("Successfully Uploaded the data in s3");
        console.log("Results is", results);
        sendMsg();
        return results;
    } catch (err) {
        console.log("Error", err);
    }
};
run();