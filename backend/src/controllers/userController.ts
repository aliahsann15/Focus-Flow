import { Request, Response } from 'express';
import UserModel from '../models/User';

// Register a new user
export const registerUser = async (req: Request, res: Response) => {
  try {
    const { fullname, email, passwordHash, profilePictureUrl } = req.body;
    const user = new UserModel({ fullname, email, passwordHash, profilePictureUrl });
    await user.save();
    res.status(201).json({ message: 'User registered', user });
  } catch (err) {
    res.status(400).json({ error: (err as Error).message });
  }
};

// Get all users
export const getAllUsers = async (_req: Request, res: Response) => {
  try {
    const users = await UserModel.find();
    res.json(users);
  } catch (err) {
    res.status(500).json({ error: (err as Error).message });
  }
};

// Get user by ID
export const getUserById = async (req: Request, res: Response) => {
  try {
    const user = await UserModel.findById(req.params.id);
    if (!user) return res.status(404).json({ error: 'User not found' });
    res.json(user);
  } catch (err) {
    res.status(500).json({ error: (err as Error).message });
  }
};

// Update user
export const updateUser = async (req: Request, res: Response) => {
  try {
    const updates = req.body;
    const user = await UserModel.findByIdAndUpdate(req.params.id, updates, { new: true });
    if (!user) return res.status(404).json({ error: 'User not found' });
    res.json({ message: 'User updated', user });
  } catch (err) {
    res.status(400).json({ error: (err as Error).message });
  }
};

// Delete user
export const deleteUser = async (req: Request, res: Response) => {
  try {
    const user = await UserModel.findByIdAndDelete(req.params.id);
    if (!user) return res.status(404).json({ error: 'User not found' });
    res.json({ message: 'User deleted' });
  } catch (err) {
    res.status(400).json({ error: (err as Error).message });
  }
};