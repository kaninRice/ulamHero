import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';

import database from './db/conn';
import authRouter from './routes/auth';

import indexRouter from './routes/index';
import searchRouter from './routes/search';
import recipeRouter from './routes/recipe';
import userRouter from './routes/user';

dotenv.config();

const app = express();
const port = process.env.PORT;

const corsOptions = {
    origin: process.env.CLIENT_ORIGIN
}

app.use(cors(corsOptions));
app.use(express.json());
app.use(express.static('public'));

app.use('/auth', authRouter)
app.use(indexRouter);
app.use(searchRouter);
app.use(recipeRouter);
app.use(userRouter);

app.listen(port, () => {
    database.connect();
    console.log(`[server] Running at http://localhost:${port}`);
});