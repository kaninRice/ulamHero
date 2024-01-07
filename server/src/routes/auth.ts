import { Router } from 'express';

import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';

const authRouter = Router();

import User, { IUser } from '../models/user';

authRouter.post('/register', async (req, res) => {
    const { username, password } = req.body;

    try {
        const user = await User.findOne({ username });

        if (user) {
            return res
                .status(400)
                .json({ message: 'username already exists' });
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = new User({ username, password: hashedPassword, bookmarkList: [] });
        await newUser.save();

        res.status(201).json({ message: 'register successful' });
    } catch (err) {
        res.status(500).json({ message: 'register error' });
    }
});

authRouter.post('/login', async (req, res) => {
    const { username, password } = req.body;

    try {
        const user: IUser | null = await User.findOne({ username });

        if (!user) {
            return res.status(400).json({ message: 'username does not exist' });
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);

        if (!isPasswordValid) {
            return res.status(400).json({ message: 'wrong credentials' });
        }

        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET!);
        res.status(200).json({ token, userID: user._id });
    } catch (err) {
        res.status(500).json({ type: err });
    }
});

export const verifyToken = (req: any, res: any, next: any) => {
    const authHeader = req.headers.authorization;

    if (authHeader) {
        const token = req.headers.authorization.split(' ')[1];
        const decoded = jwt.verify(token, process.env.JWT_SECRET!);
        const userId = (<any>decoded).id
        res.locals.id = userId;
        next();
    } else {
        res.sendStatus(401);
    }
};

export default authRouter;
