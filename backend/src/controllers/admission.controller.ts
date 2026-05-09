import { Request, Response } from 'express';
import { AdmissionService } from '../services/admission.service';
import { AuthRequest, roleMiddleware } from '../middleware/auth.middleware';

const admissionService = new AdmissionService();

export class AdmissionController {
  async generateShortlist(req: Request, res: Response) {
    try {
      const { academicYear, cutoffAggregate, round } = req.body;

      const shortlist = await admissionService.generateShortlist(
        academicYear,
        cutoffAggregate,
        round
      );

      res.status(201).json({
        success: true,
        message: 'Shortlist generated successfully',
        data: shortlist,
      });
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  }

  async getShortlistedApplicants(req: Request, res: Response) {
    try {
      const { academicYear } = req.params;
      const shortlist = await admissionService.getShortlistedApplicants(academicYear);

      res.status(200).json({
        success: true,
        data: shortlist,
      });
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  }

  async scheduleInterview(req: Request, res: Response) {
    try {
      const { shortlistId } = req.params;
      const { interviewDate, interviewVenue } = req.body;

      const shortlist = await admissionService.scheduleInterview(
        shortlistId,
        new Date(interviewDate),
        interviewVenue
      );

      res.status(200).json({
        success: true,
        message: 'Interview scheduled successfully',
        data: shortlist,
      });
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  }

  async recordInterviewScore(req: Request, res: Response) {
    try {
      const { shortlistId } = req.params;
      const { score } = req.body;

      const shortlist = await admissionService.recordInterviewScore(shortlistId, score);

      res.status(200).json({
        success: true,
        message: 'Interview score recorded successfully',
        data: shortlist,
      });
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  }

  async issueAdmissionOffer(req: Request, res: Response) {
    try {
      const { shortlistId } = req.params;

      const shortlist = await admissionService.issueAdmissionOffer(shortlistId);

      res.status(200).json({
        success: true,
        message: 'Admission offer issued successfully',
        data: shortlist,
      });
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  }
}
