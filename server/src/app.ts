import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';

import database from './db/conn';

import indexRouter from './routes/index';
import searchRouter from './routes/search';
import recipeRouter from './routes/recipe';

dotenv.config();

const app = express();
const port = process.env.PORT;

const corsOptions = {
    origin: process.env.CLIENT_ORIGIN
}

app.use(cors(corsOptions));
app.use(express.json());
app.use(express.static('public'));

app.use(indexRouter);
app.use(searchRouter);
app.use(recipeRouter);

app.listen(port, () => {
    database.connect();
    console.log(`[server] Running at http://localhost:${port}`);
});