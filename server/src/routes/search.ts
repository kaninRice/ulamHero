import { Router } from 'express';
import Recipe from '../models/recipe';

const searchRouter = Router();

searchRouter.get('/search/:query', async (req, res) => {
    const data = await Recipe.find({ $text: { $search: req.params.query } });
    
    type recipeItem = {
        _id: string;
        name: string;
        imgPath: string;
        description: string;
    };

    const recipeItemList: Array<recipeItem> = [];
    
    data.forEach((recipe) => {
        recipeItemList.push({
            _id: recipe._id as unknown as string,
            name: recipe.name,
            imgPath: `/images/${recipe.imgPath}`,
            description: recipe.description
        });
    })

    res.json(recipeItemList);
})

export default searchRouter;
