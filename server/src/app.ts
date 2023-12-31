import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';

import database from './db/conn';

import indexRouter from './routes/index';

dotenv.config();

const app = express();
const port = process.env.PORT;

app.use(cors());
app.use(express.json());

app.use(indexRouter);

app.listen(port, () => {
    database.connect();
    console.log(`[server] Running at http://localhost:${port}`);
});