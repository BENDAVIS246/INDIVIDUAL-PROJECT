import { Request, Response } from 'express';
import { ReportService } from '../services/report.service';

const reportService = new ReportService();

export class ReportController {
  async getAdmissionStatistics(req: Request, res: Response) {
    try {
      const { academicYear } = req.params;
      const statistics = await reportService.getAdmissionStatistics(academicYear);

      res.status(200).json({
        success: true,
        data: statistics,
      });
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  }

  async getPaymentReport(req: Request, res: Response) {
    try {
      const { academicYear } = req.params;
      const report = await reportService.getPaymentReport(academicYear);

      res.status(200).json({
        success: true,
        data: report,
      });
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  }

  async getApplicationTypeDistribution(req: Request, res: Response) {
    try {
      const { academicYear } = req.params;
      const distribution = await reportService.getApplicationTypeDistribution(academicYear);

      res.status(200).json({
        success: true,
        data: distribution,
      });
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  }

  async getSubjectPreferences(req: Request, res: Response) {
    try {
      const { academicYear } = req.params;
      const preferences = await reportService.getSubjectPreferences(academicYear);

      res.status(200).json({
        success: true,
        data: preferences,
      });
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  }
}
