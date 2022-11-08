import {CreateBucketCommand } from "@aws-sdk/client-s3";
import { s3Client } from "../libs/s3Client.js";
// Set the parameters
const params = {
    Bucket: "mysqsbucketuploadingfileintoit-123321"
};
const run = async () => {
    try {
        const data = await s3Client.send(
            new CreateBucketCommand({ Bucket: params.Bucket })
        );
        console.log(data);
        console.log("Successfully created a bucket called ", data.Location);
        return data; // For unit tests.
    } catch (err) {
        console.log("Error", err);
    }
};
run();
