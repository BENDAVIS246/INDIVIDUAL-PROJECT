import { Request, Response } from 'express';
import { PaymentService } from '../services/payment.service';
import { AuthRequest } from '../middleware/auth.middleware';

const paymentService = new PaymentService();

export class PaymentController {
  async initiatePayment(req: AuthRequest, res: Response) {
    try {
      const { applicationId, amount, paymentMethod, phone } = req.body;

      const payment = await paymentService.initiatePayment(
        applicationId,
        amount,
        paymentMethod,
        phone
      );

      res.status(201).json({
        success: true,
        message: 'Payment initiated successfully',
        data: payment,
      });
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  }

  async verifyPayment(req: Request, res: Response) {
    try {
      const { transactionId, externalTransactionId } = req.body;

      const payment = await paymentService.verifyPayment(transactionId, externalTransactionId);

      res.status(200).json({
        success: true,
        message: 'Payment verified successfully',
        data: payment,
      });
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  }

  async getPaymentStatus(req: Request, res: Response) {
    try {
      const { transactionId } = req.params;
      const payment = await paymentService.getPaymentByTransaction(transactionId);

      res.status(200).json({
        success: true,
        data: payment,
      });
    } catch (error: any) {
      res.status(404).json({ error: error.message });
    }
  }

  async getApplicationPayments(req: Request, res: Response) {
    try {
      const { applicationId } = req.params;
      const payments = await paymentService.getApplicationPayments(applicationId);

      res.status(200).json({
        success: true,
        data: payments,
      });
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  }

  async getPaymentSummary(req: Request, res: Response) {
    try {
      const { academicYear } = req.params;
      const summary = await paymentService.getPaymentsSummary(academicYear);

      res.status(200).json({
        success: true,
        data: summary,
      });
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  }
}
