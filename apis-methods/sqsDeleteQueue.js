import { DeleteQueueCommand } from "@aws-sdk/client-sqs";
import { sqsClient } from "../libs/sqsClient.js";

const params = { QueueUrl: "https://sqs.us-east-1.amazonaws.com/000718243366/sqs2-config-to-s3" };
const run = async () => {
 try {
 const data = await sqsClient.send(new DeleteQueueCommand(params));
 console.log("Success", data);
 return data; // For unit tests.
 } catch (err) {
 console.log("Error", err);
 }
};
run();
