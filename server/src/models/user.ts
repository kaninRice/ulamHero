import { Schema, model } from 'mongoose';

export interface IUser {
    _id?: string;
    username: string;
    password: string;
    bookmarkList: [String];
}

const UserSchema = new Schema<IUser>({
    username: { 
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    bookmarkList: {
        type: [String],
    }
});

const User = model<IUser>('user', UserSchema);

export default User;
