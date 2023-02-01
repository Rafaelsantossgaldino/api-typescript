import { server } from "./server/Server";

server.listen(3333, () => {
    console.log('Starting server on port http://localhost:3333');
});