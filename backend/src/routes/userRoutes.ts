import express from 'express';
import { getAllUsers, getUserById, updateUser, deleteUser } from '../controllers/userController';
import { verifyToken } from '../middleware/authMiddleware';

const router = express.Router();


// Get all users (protected)
router.get('/', verifyToken, getAllUsers);

// Get user by ID (protected)
router.get('/:id', verifyToken, getUserById);

// Update user (protected)
router.put('/:id', verifyToken, updateUser);

// Delete user (protected)
router.delete('/:id', verifyToken, deleteUser);

export default router;