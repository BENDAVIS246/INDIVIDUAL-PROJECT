import express from 'express';
import { PaymentController } from '../controllers/payment.controller';
import { authMiddleware } from '../middleware/auth.middleware';

const router = express.Router();
const paymentController = new PaymentController();

// Initiate payment
router.post('/initiate', authMiddleware, (req, res) => paymentController.initiatePayment(req as any, res));

// Verify payment
router.post('/verify', (req, res) => paymentController.verifyPayment(req, res));

// Get payment status
router.get('/:transactionId', (req, res) => paymentController.getPaymentStatus(req, res));

// Get application payments
router.get('/application/:applicationId', (req, res) => paymentController.getApplicationPayments(req, res));

// Get payment summary by year
router.get('/summary/:academicYear', (req, res) => paymentController.getPaymentSummary(req, res));

export default router;
