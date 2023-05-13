import express from 'express';

import { validate } from '@/middleware/validate';
import { createUserSchema, verifyUserSchema } from '@/schemas/user.schema';
import AuthController from '@/controllers/auth.controller';

const router = express.Router();
const authController = new AuthController();

// POST /api/v1/auth/register
router.post('/register', validate(createUserSchema), authController.register);

// GET /api/v1/auth/verify-email/:token
router.get(
  '/verify-email',
  validate(verifyUserSchema),
  authController.verifyEmail
);

export default router;
