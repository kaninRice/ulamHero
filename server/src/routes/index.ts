import { Router } from 'express';

import Recipe from '../models/recipe';
import { leanRecipe } from '../types/common'

const indexRouter = Router();

indexRouter.get('/featured-recipes', async (req, res) => {
    try {
        const data = await Recipe.aggregate([{ $sample: { size: 3 } }]);
        const leanRecipeList: Array<leanRecipe> = [];

        data.forEach((recipe) => {
            leanRecipeList.push({
                _id: recipe._id,
                name: recipe.name,
                imgPath: `/images/${recipe.imgPath}`,
            });
        });

        res.status(200).json(leanRecipeList);
    } catch (err) {
        res.status(500).json({ type: err });
    }
})

export default indexRouter;