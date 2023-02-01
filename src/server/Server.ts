import express, { json } from 'express';
import 'dotenv/config';

import { router } from './routes';

const server = express();

server.use(router);
server.use(json());

export { server };