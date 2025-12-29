import { Schema, model, Document, Types } from 'mongoose';

export interface ITask extends Document {
  userId: Types.ObjectId;
  title: string;
  description?: string;
  category: 'Study' | 'Revision' | 'Practice';
  priority: 'Low' | 'Medium' | 'High';
  estimatedMinutes: number;
  dueDate: Date;
  status: 'Pending' | 'Completed';
  syncStatus: 'Pending' | 'Synced';
  createdAt: Date;
  updatedAt: Date;
}

const TaskSchema = new Schema<ITask>({
  userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  title: { type: String, required: true },
  description: { type: String },
  category: { type: String, enum: ['Study', 'Revision', 'Practice'], required: true },
  priority: { type: String, enum: ['Low', 'Medium', 'High'], required: true },
  estimatedMinutes: { type: Number, required: true },
  dueDate: { type: Date, required: true },
  status: { type: String, enum: ['Pending', 'Completed'], default: 'Pending' },
  syncStatus: { type: String, enum: ['Pending', 'Synced'], default: 'Pending' },
}, { timestamps: true });

export default model<ITask>('Task', TaskSchema);
