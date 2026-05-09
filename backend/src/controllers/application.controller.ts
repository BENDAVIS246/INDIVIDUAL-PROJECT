import { Request, Response } from 'express';
import { ApplicationService } from '../services/application.service';
import { AuthRequest } from '../middleware/auth.middleware';

const applicationService = new ApplicationService();

export class ApplicationController {
  async createApplication(req: AuthRequest, res: Response) {
    try {
      const userId = req.user?.id;
      const applicationData = req.body;

      const application = await applicationService.createApplication(userId, applicationData);

      res.status(201).json({
        success: true,
        message: 'Application created successfully',
        data: application,
      });
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  }

  async uploadDocuments(req: AuthRequest, res: Response) {
    try {
      const { applicationId } = req.params;
      const { birthCertificatePath, pleResultSlipPath } = req.body;

      const application = await applicationService.uploadDocuments(
        applicationId,
        birthCertificatePath,
        pleResultSlipPath
      );

      res.status(200).json({
        success: true,
        message: 'Documents uploaded successfully',
        data: application,
      });
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  }

  async getApplicationById(req: AuthRequest, res: Response) {
    try {
      const { applicationId } = req.params;
      const application = await applicationService.getApplicationById(applicationId);

      res.status(200).json({
        success: true,
        data: application,
      });
    } catch (error: any) {
      res.status(404).json({ error: error.message });
    }
  }

  async getUserApplications(req: AuthRequest, res: Response) {
    try {
      const userId = req.user?.id;
      const applications = await applicationService.getUserApplications(userId);

      res.status(200).json({
        success: true,
        data: applications,
      });
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  }

  async getApplicationsByYear(req: Request, res: Response) {
    try {
      const { academicYear } = req.params;
      const applications = await applicationService.getApplicationsByAcademicYear(academicYear);

      res.status(200).json({
        success: true,
        data: applications,
      });
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  }

  async updateApplicationStatus(req: Request, res: Response) {
    try {
      const { applicationId } = req.params;
      const { status } = req.body;

      const application = await applicationService.updateApplicationStatus(applicationId, status);

      res.status(200).json({
        success: true,
        message: 'Application status updated',
        data: application,
      });
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  }
}
