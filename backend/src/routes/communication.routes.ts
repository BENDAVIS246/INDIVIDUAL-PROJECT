import express from 'express';
import { CommunicationController } from '../controllers/communication.controller';
import { authMiddleware, roleMiddleware } from '../middleware/auth.middleware';

const router = express.Router();
const communicationController = new CommunicationController();

// Send email
router.post('/email', authMiddleware, roleMiddleware(['admin', 'admissions_officer']), (req, res) =>
  communicationController.sendEmail(req, res)
);

// Send SMS
router.post('/sms', authMiddleware, roleMiddleware(['admin', 'admissions_officer']), (req, res) =>
  communicationController.sendSMS(req, res)
);

// Get communication history
router.get('/:applicationId/history', authMiddleware, (req, res) =>
  communicationController.getCommunicationHistory(req, res)
);

export default router;
