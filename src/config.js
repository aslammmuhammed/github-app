// config.js
import dotenv from "dotenv";

dotenv.config();

const config = {
    appId: process.env.APP_ID,
    webhookSecret: process.env.WEBHOOK_SECRET,
    privateKeyPath: process.env.PRIVATE_KEY_PATH,
    port: process.env.PORT || 3000,
    path: process.env.WEBHOOKPATH || "/api/webhook",
    workflowRepository: process.env.WORKFLOW_REPOSITORY,
    destinationEventsString: process.env.DESTINATION_EVENTS,
    ref: process.env.REF,
};

export default config;
