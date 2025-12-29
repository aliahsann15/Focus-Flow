import { Request, Response } from 'express';
import Task from '../models/Task';
import FocusSession from '../models/FocusSession';

export const getWeeklyAnalytics = async (req: Request, res: Response) => {
  // Placeholder: implement aggregation logic
  res.json({ message: 'Weekly analytics not implemented' });
};

export const getMonthlyAnalytics = async (req: Request, res: Response) => {
  // Placeholder: implement aggregation logic
  res.json({ message: 'Monthly analytics not implemented' });
};

export const getCompletionRate = async (req: Request, res: Response) => {
  try {
    const { userId } = req.query;
    const total = await Task.countDocuments({ userId });
    const completed = await Task.countDocuments({ userId, status: 'Completed' });
    const rate = total > 0 ? (completed / total) * 100 : 0;
    res.json({ completionRate: rate });
  } catch (err) {
    res.status(500).json({ error: (err as Error).message });
  }
};
