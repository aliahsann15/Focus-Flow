import express from 'express';
import { updateStreak, getStreakInfo } from '../controllers/streakController';
import { verifyToken } from '../middlewares/authMiddleware';

const router = express.Router();

router.use(verifyToken);
router.get('/', getStreakInfo);
router.put('/update', updateStreak);

export default router;
