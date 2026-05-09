import express from 'express';
import { ApplicationController } from '../controllers/application.controller';
import { authMiddleware } from '../middleware/auth.middleware';

const router = express.Router();
const applicationController = new ApplicationController();

// Create application
router.post('/', authMiddleware, (req, res) => applicationController.createApplication(req as any, res));

// Upload documents
router.post('/:applicationId/documents', authMiddleware, (req, res) =>
  applicationController.uploadDocuments(req as any, res)
);

// Get application by ID
router.get('/:applicationId', authMiddleware, (req, res) =>
  applicationController.getApplicationById(req as any, res)
);

// Get user's applications
router.get('/', authMiddleware, (req, res) =>
  applicationController.getUserApplications(req as any, res)
);

// Get applications by academic year
router.get('/year/:academicYear', (req, res) =>
  applicationController.getApplicationsByYear(req, res)
);

// Update application status
router.put('/:applicationId/status', (req, res) =>
  applicationController.updateApplicationStatus(req, res)
);

export default router;
