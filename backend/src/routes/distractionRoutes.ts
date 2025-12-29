import express from 'express';
import { logDistraction, getDistractionStats } from '../controllers/distractionController';
import { verifyToken } from '../middlewares/authMiddleware';

const router = express.Router();

router.use(verifyToken);
router.post('/', logDistraction);
router.get('/stats', getDistractionStats);

export default router;
