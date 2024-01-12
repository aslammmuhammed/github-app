// github-app.js
import { App } from "octokit";
import config from "./config.js";

const app = new App({
  appId: config.appId,
  privateKey: config.privateKey,
  webhooks: {
    secret: config.webhookSecret,
  },
});

export default app;
