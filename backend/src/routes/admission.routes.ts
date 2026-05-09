import express from 'express';
import { AdmissionController } from '../controllers/admission.controller';
import { authMiddleware, roleMiddleware } from '../middleware/auth.middleware';

const router = express.Router();
const admissionController = new AdmissionController();

// Generate shortlist (admin only)
router.post('/shortlist/generate', authMiddleware, roleMiddleware(['admin', 'admissions_officer']), (req, res) =>
  admissionController.generateShortlist(req, res)
);

// Get shortlisted applicants
router.get('/shortlist/:academicYear', authMiddleware, (req, res) =>
  admissionController.getShortlistedApplicants(req, res)
);

// Schedule interview
router.post('/shortlist/:shortlistId/interview/schedule', authMiddleware, roleMiddleware(['admin', 'admissions_officer']), (req, res) =>
  admissionController.scheduleInterview(req, res)
);

// Record interview score
router.post('/shortlist/:shortlistId/interview/score', authMiddleware, roleMiddleware(['admin', 'admissions_officer']), (req, res) =>
  admissionController.recordInterviewScore(req, res)
);

// Issue admission offer
router.post('/shortlist/:shortlistId/offer', authMiddleware, roleMiddleware(['admin', 'admissions_officer']), (req, res) =>
  admissionController.issueAdmissionOffer(req, res)
);

export default router;
