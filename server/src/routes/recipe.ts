import { Router } from 'express';
import Recipe from '../models/recipe';

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

export default recipeRouter;
