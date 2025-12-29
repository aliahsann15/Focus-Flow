import express from 'express';
import { createSession, syncSessions, getDailySummary } from '../controllers/focusSessionController';
import { verifyToken } from '../middlewares/authMiddleware';

const router = express.Router();

router.use(verifyToken);
router.post('/', createSession);
router.post('/sync', syncSessions);
router.get('/daily', getDailySummary);

export default router;
