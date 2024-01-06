import { Router } from 'express';

import Recipe from '../models/recipe';
import { recipeItem } from '../types/common';

const searchRouter = Router();

searchRouter.get('/search/:query', async (req, res) => {
    try {
        const data = await Recipe.find({
            $text: { $search: req.params.query },
        });

        const recipeItemList: Array<recipeItem> = [];

        data.forEach((recipe) => {
            recipeItemList.push({
                _id: recipe._id as unknown as string,
                name: recipe.name,
                imgPath: `/images/${recipe.imgPath}`,
                description: recipe.description,
            });
        });

        res.json(recipeItemList);
    } catch (err) {
        res.status(500).json({ type: err });
    }
})

export default searchRouter;
