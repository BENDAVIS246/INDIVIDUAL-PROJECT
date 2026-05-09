import express from 'express';
import { ReportController } from '../controllers/report.controller';
import { authMiddleware, roleMiddleware } from '../middleware/auth.middleware';

const router = express.Router();
const reportController = new ReportController();

// Get admission statistics
router.get(
  '/statistics/:academicYear',
  authMiddleware,
  roleMiddleware(['admin', 'head_teacher']),
  (req, res) => reportController.getAdmissionStatistics(req, res)
);

// Get payment report
router.get(
  '/payments/:academicYear',
  authMiddleware,
  roleMiddleware(['admin', 'accounts_staff', 'head_teacher']),
  (req, res) => reportController.getPaymentReport(req, res)
);

// Get application type distribution
router.get(
  '/applications/distribution/:academicYear',
  authMiddleware,
  roleMiddleware(['admin', 'admissions_officer', 'head_teacher']),
  (req, res) => reportController.getApplicationTypeDistribution(req, res)
);

// Get subject preferences
router.get(
  '/subjects/:academicYear',
  authMiddleware,
  roleMiddleware(['admin', 'admissions_officer', 'head_teacher']),
  (req, res) => reportController.getSubjectPreferences(req, res)
);

export default router;
