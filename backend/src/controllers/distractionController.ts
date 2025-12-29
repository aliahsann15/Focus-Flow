import { Request, Response } from 'express';
import DistractionLog from '../models/DistractionLog';

export const logDistraction = async (req: Request, res: Response) => {
  try {
    const log = new DistractionLog(req.body);
    await log.save();
    res.status(201).json(log);
  } catch (err) {
    res.status(400).json({ error: (err as Error).message });
  }
};

export const getDistractionStats = async (req: Request, res: Response) => {
  try {
    const { userId } = req.query;
    const stats = await DistractionLog.aggregate([
      { $match: { userId } },
      { $group: { _id: '$distractionType', count: { $sum: 1 } } }
    ]);
    res.json(stats);
  } catch (err) {
    res.status(500).json({ error: (err as Error).message });
  }
};
