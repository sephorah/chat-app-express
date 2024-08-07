import express from 'express';
// import { createServer } from 'node:http';
import authRouter from "./routes/auth";
import cors from "cors";
import bodyParser from 'body-parser';

const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use("/", authRouter);
// const server = createServer(app);

app.get('/', (req, res) => {
  res.send('<h1>Hello world</h1>');
});

export default app;