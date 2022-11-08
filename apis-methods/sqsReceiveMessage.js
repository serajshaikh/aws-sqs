// Import required AWS SDK clients and commands for Node.js
import {
    ReceiveMessageCommand,
    DeleteMessageCommand,
} from "@aws-sdk/client-sqs";
import { sqsClient } from "../libs/sqsClient.js";
// Set the parameters
const queueURL = "https://sqs.us-east-1.amazonaws.com/000718243366/sqs-config-to-s3";
const params = {
    AttributeNames: ["SentTimestamp"],
    MaxNumberOfMessages: 10,
    MessageAttributeNames: ["All"],
    QueueUrl: queueURL,
    VisibilityTimeout: 10,
    WaitTimeSeconds: 0,
};
const run = async () => {
    try {
        const data = await sqsClient.send(new ReceiveMessageCommand(params));
        if (data.Messages) {
            console.log("Message data is :", data);
            var deleteParams = {
                QueueUrl: queueURL,
                ReceiptHandle: data.Messages[0].ReceiptHandle,
            };
            try {
                const data = await sqsClient.send(new DeleteMessageCommand(deleteParams));
                console.log("Message deleted", data);
            } catch (err) {
                console.log("Error", err);
            }
        } else {
            console.log("No messages to delete");
        }
        return data; // For unit tests.
    } catch (err) {
        console.log("Receive Error", err);
    }
};
run();