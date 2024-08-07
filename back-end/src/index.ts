import { port } from "./config";
import server from "./server";

server.listen(port, () => {
    console.log(`server running at http://localhost:${port}`);
});