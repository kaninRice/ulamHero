import { Router } from 'express';
import Recipe from '../models/recipe';

const indexRouter = Router();

indexRouter.get('/get-featured-recipes', async (req, res) => {
    const data = await Recipe.aggregate([
        { $sample: { size: 3 } },
    ]);

    type leanRecipe = {
        _id: string,
        name: string,
        imgPath: string
    }

    const leanRecipeList: Array<leanRecipe> = [];

    data.forEach((recipe) => {
        leanRecipeList.push({
            _id: recipe._id,
            name: recipe.name,
            imgPath: `/images/${recipe.imgPath}`,
        });
    })

    res.json(leanRecipeList);
})

export default indexRouter;