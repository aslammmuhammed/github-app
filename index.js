// index.js
import http from "http";
import config from "./src/config.js";
import { middleware } from "./src/handler.js"

http.createServer(middleware).listen(config.port,() => {
    console.log(`Server is listening for events at port ${config.port}`);
});
