import { Schema, model, Model } from 'mongoose';

export interface IUser {
    username: string;
    email: string;
    passwordHash: string;
    profilePictureUrl?: string;
    createdAt: Date;
    updatedAt: Date;
}

const UserSchema = new Schema<IUser>(
    {
        username: { type: String, required: true, unique: true },
        email: { type: String, required: true, unique: true },
        passwordHash: { type: String, required: true },
        profilePictureUrl: { type: String },
    },
    { timestamps: true }
);

const UserModel: Model<IUser> = model<IUser>('User', UserSchema);

export default UserModel;