import { Request, Response } from 'express';
import Streak from '../models/Streak';

export const updateStreak = async (req: Request, res: Response) => {
  try {
    const { userId, currentStreak, longestStreak, lastActiveDate } = req.body;
    const streak = await Streak.findOneAndUpdate(
      { userId },
      { currentStreak, longestStreak, lastActiveDate },
      { new: true, upsert: true }
    );
    res.json(streak);
  } catch (err) {
    res.status(400).json({ error: (err as Error).message });
  }
};

export const getStreakInfo = async (req: Request, res: Response) => {
  try {
    const { userId } = req.query;
    const streak = await Streak.findOne({ userId });
    res.json(streak);
  } catch (err) {
    res.status(500).json({ error: (err as Error).message });
  }
};
