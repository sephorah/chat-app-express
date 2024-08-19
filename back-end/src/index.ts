import { serverPort } from "./config";
import server from "./server";

server.listen(serverPort, () => {
    console.log(`server running at http://localhost:${serverPort}`);
});