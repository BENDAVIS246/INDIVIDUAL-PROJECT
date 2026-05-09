import { Request, Response } from 'express';
import { CommunicationService } from '../services/communication.service';
import { AuthRequest } from '../middleware/auth.middleware';

const communicationService = new CommunicationService();

export class CommunicationController {
  async sendEmail(req: Request, res: Response) {
    try {
      const { applicationId, email, subject, body, messageType } = req.body;

      const communication = await communicationService.sendEmail(
        applicationId,
        email,
        subject,
        body,
        messageType
      );

      res.status(201).json({
        success: true,
        message: 'Email sent successfully',
        data: communication,
      });
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  }

  async sendSMS(req: Request, res: Response) {
    try {
      const { applicationId, phone, body, messageType } = req.body;

      const communication = await communicationService.sendSMS(
        applicationId,
        phone,
        body,
        messageType
      );

      res.status(201).json({
        success: true,
        message: 'SMS sent successfully',
        data: communication,
      });
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  }

  async getCommunicationHistory(req: Request, res: Response) {
    try {
      const { applicationId } = req.params;

      const communications = await communicationService.getCommunicationHistory(applicationId);

      res.status(200).json({
        success: true,
        data: communications,
      });
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  }
}
