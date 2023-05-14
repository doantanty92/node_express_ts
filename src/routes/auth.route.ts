import express from 'express';

import AuthController from '@/controllers/auth.controller';
import UserService from '@/services/user.service';

const router = express.Router();
const userService = new UserService();
const authController = new AuthController(userService);

// POST /api/v1/auth/register
router.post('/register', authController.register);

export default router;
