import dotenv from "dotenv";
import fs from "fs";

dotenv.config();
const envTemplatePath = "./env.template";

const envTemplate = fs.readFileSync(envTemplatePath, "utf-8");
const requiredEnvVars = envTemplate
  .split("\n")
  .map((line) => line.trim())
  .filter((line) => line && !line.startsWith("#"))
  .map((line) => line.split("=")[0]);

const missingEnvVars = requiredEnvVars.filter((envVar) => !process.env[envVar]);

if (missingEnvVars.length > 0) {
  console.error(`Missing environment variables: ${missingEnvVars.join(", ")}`);
  process.exit(1);
}

const config = {
  appId: process.env.APP_ID,
  webhookSecret: process.env.WEBHOOK_SECRET,
  privateKey: process.env.PRIVATE_KEY,
  port: process.env.PORT || 3000,
  path: process.env.WEBHOOKPATH || "/api/webhook",
  repoDetails: process.env.REPO_DETAILS,
  ref: process.env.REF || "refs/heads/main",
};

export default config;
