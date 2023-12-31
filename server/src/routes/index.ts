import { Router } from 'express';

const db = require('../db/conn');
import { ObjectId } from 'mongodb';

const indexRouter = Router();

indexRouter.get('/', (req, res) => {
    res.send('index route')
})

export default indexRouter;