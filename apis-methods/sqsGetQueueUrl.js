import { GetQueueUrlCommand } from "@aws-sdk/client-sqs";
import { sqsClient } from "../libs/sqsClient.js";

const params = { QueueName: "sqs-config-to-s3" };
const run = async () => {
 try {
 const data = await sqsClient.send(new GetQueueUrlCommand(params));
 console.log("Success", data);
 return data; // For unit tests.
 } catch (err) {
 console.log("Error", err);
 }
};
run();
