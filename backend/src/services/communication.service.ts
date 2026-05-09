import { AppDataSource } from '../config/database';
import { Communication } from '../models/Communication';
import * as sendgrid from '@sendgrid/mail';
import twilio from 'twilio';

const communicationRepository = AppDataSource.getRepository(Communication);

// Initialize Twilio
const twilioClient = twilio(process.env.TWILIO_ACCOUNT_SID, process.env.TWILIO_AUTH_TOKEN);

// Initialize SendGrid
sendgrid.setApiKey(process.env.SENDGRID_API_KEY || '');

export class CommunicationService {
  async sendEmail(applicationId: string, email: string, subject: string, body: string, messageType: string) {
    try {
      const msg = {
        to: email,
        from: process.env.SENDGRID_FROM_EMAIL || 'noreply@excelsecondary.school',
        subject,
        html: body,
      };

      await sendgrid.send(msg);

      const communication = communicationRepository.create({
        applicationId,
        recipientEmail: email,
        type: 'email',
        messageType,
        subject,
        body,
        status: 'sent',
      });

      await communicationRepository.save(communication);
      return communication;
    } catch (error) {
      console.error('Email sending error:', error);
      const communication = communicationRepository.create({
        applicationId,
        recipientEmail: email,
        type: 'email',
        messageType,
        subject,
        body,
        status: 'failed',
        failureReason: (error as Error).message,
      });
      await communicationRepository.save(communication);
      throw error;
    }
  }

  async sendSMS(applicationId: string, phone: string, body: string, messageType: string) {
    try {
      await twilioClient.messages.create({
        body,
        from: process.env.TWILIO_PHONE_NUMBER,
        to: phone,
      });

      const communication = communicationRepository.create({
        applicationId,
        recipientPhone: phone,
        type: 'sms',
        messageType,
        subject: 'SMS Notification',
        body,
        status: 'sent',
      });

      await communicationRepository.save(communication);
      return communication;
    } catch (error) {
      console.error('SMS sending error:', error);
      const communication = communicationRepository.create({
        applicationId,
        recipientPhone: phone,
        type: 'sms',
        messageType,
        subject: 'SMS Notification',
        body,
        status: 'failed',
        failureReason: (error as Error).message,
      });
      await communicationRepository.save(communication);
      throw error;
    }
  }

  async getCommunicationHistory(applicationId: string) {
    try {
      const communications = await communicationRepository.find({
        where: { applicationId },
        order: { createdAt: 'DESC' },
      });
      return communications;
    } catch (error) {
      throw error;
    }
  }
}
