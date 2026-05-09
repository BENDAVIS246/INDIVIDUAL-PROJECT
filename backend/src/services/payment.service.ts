import { AppDataSource } from '../config/database';
import { Payment } from '../models/Payment';
import { v4 as uuidv4 } from 'uuid';

const paymentRepository = AppDataSource.getRepository(Payment);

export class PaymentService {
  async initiatePayment(
    applicationId: string,
    amount: number,
    paymentMethod: string,
    phone: string
  ) {
    try {
      const transactionId = `TXN-${Date.now()}-${uuidv4().substring(0, 4).toUpperCase()}`;
      const receiptNumber = `RCP-${Date.now()}`;

      const payment = paymentRepository.create({
        transactionId,
        applicationId,
        amount,
        paymentMethod,
        phone,
        receiptNumber,
        status: 'pending',
      });

      await paymentRepository.save(payment);
      return payment;
    } catch (error) {
      throw error;
    }
  }

  async verifyPayment(transactionId: string, externalTransactionId: string) {
    try {
      const payment = await paymentRepository.findOne({ where: { transactionId } });
      if (!payment) {
        throw new Error('Payment not found');
      }

      payment.status = 'completed';
      payment.externalTransactionId = externalTransactionId;
      payment.completedAt = new Date();
      await paymentRepository.save(payment);
      return payment;
    } catch (error) {
      throw error;
    }
  }

  async getPaymentByTransaction(transactionId: string) {
    try {
      const payment = await paymentRepository.findOne({
        where: { transactionId },
        relations: ['application'],
      });
      return payment;
    } catch (error) {
      throw error;
    }
  }

  async getApplicationPayments(applicationId: string) {
    try {
      const payments = await paymentRepository.find({
        where: { applicationId },
        order: { initiatedAt: 'DESC' },
      });
      return payments;
    } catch (error) {
      throw error;
    }
  }

  async getPaymentsSummary(academicYear: string) {
    try {
      const payments = await paymentRepository
        .createQueryBuilder('payment')
        .leftJoinAndSelect('payment.application', 'application')
        .where('application.academicYear = :academicYear', { academicYear })
        .andWhere('payment.status = :status', { status: 'completed' })
        .select('SUM(payment.amount)', 'totalAmount')
        .addSelect('COUNT(payment.id)', 'totalTransactions')
        .addSelect('payment.paymentMethod', 'method')
        .groupBy('payment.paymentMethod')
        .getRawMany();
      return payments;
    } catch (error) {
      throw error;
    }
  }
}
