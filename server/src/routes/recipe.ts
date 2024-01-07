import { Router } from 'express';

import User from '../models/user';
import Recipe from '../models/recipe';
import { verifyToken } from './auth';

import { ObjectId } from 'mongodb';

const recipeRouter = Router();

recipeRouter.get('/recipes/:id', async (req, res) => {
    const o_id = new ObjectId(req.params.id);

    try {
        const data = await Recipe.findOne({ _id: o_id });

        if (data == null) return;
        data.imgPath = `/images/${data.imgPath}`;

        res.json(data);

    } catch (err) {
        res.status(500).json({ type: err });
    }
});

recipeRouter.get('/recipes/verify-bookmark/:id', verifyToken, async (req, res) => {
    const o_userId = new ObjectId(res.locals.id);
    const o_recipeId = new ObjectId(req.params.id);

    try {
        const data = await User.findOne({ _id: o_userId, bookmarkList: { $in: o_recipeId } });
        const response = { isBookmarked: false }

        if (data) {
            response.isBookmarked = true;
        }

        res.json(response);
    } catch (err) {
        res.status(500).json({ type: err });
    }
});

export default recipeRouter;
