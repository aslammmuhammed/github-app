// github-app.js
import { App } from "octokit";
import fs from "fs";
import config from "./config.js";

const privateKey = fs.readFileSync(config.privateKeyPath, "utf8");

const app = new App({
    appId: config.appId,
    privateKey,
    webhooks: {
        secret: config.webhookSecret,
    },

});

export default app;
