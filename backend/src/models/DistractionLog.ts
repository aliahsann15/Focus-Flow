import { Schema, model, Document, Types } from 'mongoose';

export interface IDistractionLog extends Document {
  userId: Types.ObjectId;
  focusSessionId: Types.ObjectId;
  distractionType: 'SocialMedia' | 'Phone' | 'Noise' | 'Fatigue';
  timestamp: Date;
}

const DistractionLogSchema = new Schema<IDistractionLog>({
  userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  focusSessionId: { type: Schema.Types.ObjectId, ref: 'FocusSession', required: true },
  distractionType: { type: String, enum: ['SocialMedia', 'Phone', 'Noise', 'Fatigue'], required: true },
  timestamp: { type: Date, default: Date.now },
});

export default model<IDistractionLog>('DistractionLog', DistractionLogSchema);
