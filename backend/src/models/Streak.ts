import { Schema, model, Document, Types } from 'mongoose';

export interface IStreak extends Document {
  userId: Types.ObjectId;
  currentStreak: number;
  longestStreak: number;
  lastActiveDate: Date;
}

const StreakSchema = new Schema<IStreak>({
  userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  currentStreak: { type: Number, default: 0 },
  longestStreak: { type: Number, default: 0 },
  lastActiveDate: { type: Date, required: true },
});

export default model<IStreak>('Streak', StreakSchema);
