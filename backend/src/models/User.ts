import { Schema, model, Document } from 'mongoose';

export interface IUserSettings {
    focusDuration: number;
    shortBreakDuration: number;
    longBreakDuration: number;
    notificationsEnabled: boolean;
    theme: string;
}

export interface IUser extends Document {
    name: string;
    email: string;
    passwordHash: string;
    timezone: string;
    settings: IUserSettings;
    profilePictureUrl?: string;
    createdAt: Date;
    updatedAt: Date;
}

const UserSchema = new Schema<IUser>(
    {
        name: { type: String, required: true },
        email: { type: String, required: true, unique: true },
        passwordHash: { type: String, required: true },
        timezone: { type: String, default: 'UTC' },
        settings: {
            focusDuration: { type: Number, default: 25 },
            shortBreakDuration: { type: Number, default: 5 },
            longBreakDuration: { type: Number, default: 15 },
            notificationsEnabled: { type: Boolean, default: true },
            theme: { type: String, default: 'light' },
        },
        profilePictureUrl: { type: String },
    },
    { timestamps: true }
);

export default model<IUser>('User', UserSchema);