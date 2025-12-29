import { Schema, model, Document, Types } from 'mongoose';

export interface IFocusSession extends Document {
  userId: Types.ObjectId;
  taskId?: Types.ObjectId;
  startTime: Date;
  endTime: Date;
  durationMinutes: number;
  sessionType: 'Focus' | 'ShortBreak' | 'LongBreak';
  completed: boolean;
  createdAt: Date;
}

const FocusSessionSchema = new Schema<IFocusSession>({
  userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  taskId: { type: Schema.Types.ObjectId, ref: 'Task' },
  startTime: { type: Date, required: true },
  endTime: { type: Date, required: true },
  durationMinutes: { type: Number, required: true },
  sessionType: { type: String, enum: ['Focus', 'ShortBreak', 'LongBreak'], required: true },
  completed: { type: Boolean, default: false },
  createdAt: { type: Date, default: Date.now },
});

export default model<IFocusSession>('FocusSession', FocusSessionSchema);
