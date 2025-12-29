import express from 'express';
import { getWeeklyAnalytics, getMonthlyAnalytics, getCompletionRate } from '../controllers/analyticsController';
import { verifyToken } from '../middlewares/authMiddleware';

const router = express.Router();

router.use(verifyToken);
router.get('/weekly', getWeeklyAnalytics);
router.get('/monthly', getMonthlyAnalytics);
router.get('/completion-rate', getCompletionRate);

export default router;
