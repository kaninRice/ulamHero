import { Router } from 'express';
import { ObjectId } from 'mongodb';

import User from '../models/user';
import Recipe from '../models/recipe';

import { verifyToken } from './auth';

const userRouter = Router();

userRouter.get('/user/bookmarks/get', verifyToken, async (req, res) => {
    const o_userId = new ObjectId(res.locals.id);

    try {
        const bookmarkList = await User.findOne({ _id: o_userId }).select(
            'bookmarkList -_id'
        );

        const o_bookmarkList = <ObjectId[]>[];

        (<any>bookmarkList?.bookmarkList).forEach((recipeId: string) => {
            o_bookmarkList.push(new ObjectId(recipeId));
        });

        const data = await Recipe.find({
            _id: { $in: o_bookmarkList },
        });

        data.forEach((recipe) => {
            recipe.imgPath = `/images/${recipe.imgPath}`;
        });

        res.status(200).json(data);
    } catch (err) {
        res.status(500).json({ type: err });
    }
});

userRouter.put('/user/bookmarks/toggle', verifyToken, async (req, res) => {
    const o_userId = new ObjectId(res.locals.id);
    const recipeId = req.body.recipeId;

    try {
        const user = await User.find({ _id: o_userId, bookmarkList: recipeId });
        let message = 'bookmark added';
        
        // remove bookmark
        if (user.length > 0) {
            await User.findOneAndUpdate(
                { _id: o_userId },
                { $pull: { bookmarkList: recipeId } }
            );
            message = 'bookmark removed'
        } else {
            // add bookmark
            await User.findOneAndUpdate(
                { _id: o_userId },
                { $addToSet: { bookmarkList: recipeId } }
            );
        }
        

        res.status(200).json({ message: message });
    } catch (err) {
        res.status(500).json({ type: err });
    }
});

userRouter.delete('/user/delete', verifyToken, async (req, res) => {
    const o_userId = new ObjectId(res.locals.id);

    try {
        await User.deleteOne({ _id: o_userId });

        res.status(200).json({ message: 'account deleted' });
    } catch (err) {
        res.status(500).json({ type: err });
    }
})

export default userRouter;