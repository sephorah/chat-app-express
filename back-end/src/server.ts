import express from 'express';
import { createServer } from 'node:http';
import authRouter from "./routes/auth";
import cors from "cors";
import bodyParser from 'body-parser';
import { Server } from 'socket.io';
import { clientPort } from './config';

const app = express();
const server = createServer(app);
const io = new Server(server, {
  cors: {
    origin: `http://localhost:${clientPort}`
  }
});

app.use(cors());
app.use(bodyParser.json());
app.use("/", authRouter);

app.get("/", (req, res) => {
  res.send("<h1>Hello world</h1>");
});

io.on("connection", (socket) => {
  console.log("A user connected!")
})

export default server;