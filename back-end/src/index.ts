import express from 'express';
import { createServer } from 'node:http';
import { config } from 'dotenv';

config();

const port = process.env.SERVER_PORT;
const app = express();
const server = createServer(app);

app.get('/', (req, res) => {
  res.send('<h1>Hello world</h1>');
});

server.listen(port, () => {
  console.log('server running at http://localhost:3000');
});