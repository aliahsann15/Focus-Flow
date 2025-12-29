import { Request, Response } from 'express';
import FocusSession from '../models/FocusSession';

export const createSession = async (req: Request, res: Response) => {
  try {
    const session = new FocusSession(req.body);
    await session.save();
    res.status(201).json(session);
  } catch (err) {
    res.status(400).json({ error: (err as Error).message });
  }
};

export const syncSessions = async (req: Request, res: Response) => {
  try {
    const sessions = await FocusSession.insertMany(req.body.sessions);
    res.status(201).json(sessions);
  } catch (err) {
    res.status(400).json({ error: (err as Error).message });
  }
};

export const getDailySummary = async (req: Request, res: Response) => {
  try {
    const { userId, date } = req.query;
    // Example: aggregate by userId and date
    const summary = await FocusSession.aggregate([
      { $match: { userId, startTime: { $gte: new Date(date as string) } } },
      { $group: { _id: '$sessionType', total: { $sum: '$durationMinutes' } } }
    ]);
    res.json(summary);
  } catch (err) {
    res.status(500).json({ error: (err as Error).message });
  }
};
