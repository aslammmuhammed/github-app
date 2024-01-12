// handler.js
import { createNodeMiddleware } from "@octokit/webhooks";
import app from "./github-app.js";
import config from "./config.js";

async function handlePushEvents({ octokit, payload }) {
  let repoDispatchDetails, repoDispatchEventType, workflowRepo;

  if (config.ref !== payload.ref) {
    console.log("Event is not from the ref", config.ref);
    return;
  }

  try {
    repoDispatchDetails = JSON.parse(config.destinationEventsString);
    console.log("destinationEventsProvided:", repoDispatchDetails);
  } catch (error) {
    console.error("Error parsing REPO_DETAILS:", error.message);
    return;
  }
  for (let repo in repoDispatchDetails) {
    if (repo === payload.repository.full_name) {
      console.log("here");
      repoDispatchEventType = repoDispatchDetails[repo].event_type;
      workflowRepo = repoDispatchDetails[repo].workflow_repo;
      console.log(workflowRepo);
      console.log(repoDispatchEventType);
      break;
    }
  }

  if (repoDispatchEventType !== undefined) {
    console.log("Push event received from", payload.repository.full_name);
    console.log("Destination Event:", repoDispatchEventType);
    try {
      await octokit.request("POST /repos/{owner}/{repo}/dispatches", {
        owner: payload.repository.owner.name,
        repo: workflowRepo,
        event_type: repoDispatchEventType,
        client_payload: {
          ref: `${payload.ref}`,
          sha: `${payload.head_commit.id}`,
        },
      });
    } catch (error) {
      if (error.response) {
        console.error(
          `Error! \nStatus: ${error.response.status}. \nMessage: ${error.response.data.message}`
        );
      }
      console.error(error);
    }
  } else {
    console.log(
      "Destination Event not found for",
      payload.repository.full_name
    );
    return;
  }
}

app.webhooks.on("push", handlePushEvents);

app.webhooks.onError((error) => {
  if (error.name === "AggregateError") {
    console.error(`Error processing request: ${error.event}`);
  } else {
    console.error(error);
  }
});

export const middleware = createNodeMiddleware(app.webhooks, {
  path: config.path,
});
