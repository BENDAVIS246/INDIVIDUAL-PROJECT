import express from 'express';
import { body } from 'express-validator';
import { AuthController } from '../controllers/auth.controller';
import { authMiddleware } from '../middleware/auth.middleware';

const router = express.Router();
const authController = new AuthController();

// Register endpoint
router.post(
  '/register',
  [
    body('email').isEmail().normalizeEmail(),
    body('password').isLength({ min: 6 }),
    body('firstName').notEmpty(),
    body('lastName').notEmpty(),
  ],
  (req, res) => authController.register(req, res)
);

// Login endpoint
router.post(
  '/login',
  [
    body('email').isEmail(),
    body('password').notEmpty(),
  ],
  (req, res) => authController.login(req, res)
);

// Validate token endpoint
router.get('/validate', authMiddleware, (req, res) => authController.validateToken(req, res));

export default router;
