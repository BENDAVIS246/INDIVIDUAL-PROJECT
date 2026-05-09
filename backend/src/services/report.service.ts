import { AppDataSource } from '../config/database';
import { Application } from '../models/Application';
import { Payment } from '../models/Payment';
import { Shortlist } from '../models/Shortlist';

const applicationRepository = AppDataSource.getRepository(Application);
const paymentRepository = AppDataSource.getRepository(Payment);
const shortlistRepository = AppDataSource.getRepository(Shortlist);

export class ReportService {
  async getAdmissionStatistics(academicYear: string) {
    try {
      const applications = await applicationRepository.find({
        where: { academicYear },
        relations: ['applicant'],
      });

      const totalApplications = applications.length;
      const shortlistedCount = applications.filter((app) => app.status === 'shortlisted').length;
      const admittedCount = applications.filter((app) => app.status === 'admitted').length;
      const rejectedCount = applications.filter((app) => app.status === 'rejected').length;
      const femaleApplicants = applications.filter((app) => app.gender === 'Female').length;
      const maleApplicants = applications.filter((app) => app.gender === 'Male').length;

      const averagePleAggregate =
        applications.reduce((sum, app) => sum + app.pleAggregate, 0) / totalApplications;

      return {
        academicYear,
        totalApplications,
        shortlistedCount,
        admittedCount,
        rejectedCount,
        femaleApplicants,
        maleApplicants,
        averagePleAggregate: parseFloat(averagePleAggregate.toFixed(2)),
        genderDistribution: {
          male: maleApplicants,
          female: femaleApplicants,
        },
      };
    } catch (error) {
      throw error;
    }
  }

  async getPaymentReport(academicYear: string) {
    try {
      const payments = await paymentRepository
        .createQueryBuilder('payment')
        .leftJoinAndSelect('payment.application', 'application')
        .where('application.academicYear = :academicYear', { academicYear })
        .andWhere('payment.status = :status', { status: 'completed' })
        .getRawMany();

      const totalAmount = payments.reduce((sum, p) => sum + parseFloat(p.payment_amount), 0);
      const paymentsByMethod = {} as any;

      payments.forEach((p) => {
        const method = p.payment_paymentMethod;
        if (!paymentsByMethod[method]) {
          paymentsByMethod[method] = 0;
        }
        paymentsByMethod[method] += parseFloat(p.payment_amount);
      });

      return {
        academicYear,
        totalAmount,
        totalTransactions: payments.length,
        paymentsByMethod,
      };
    } catch (error) {
      throw error;
    }
  }

  async getApplicationTypeDistribution(academicYear: string) {
    try {
      const applications = await applicationRepository.find({
        where: { academicYear },
      });

      const distribution = {} as any;
      applications.forEach((app) => {
        if (!distribution[app.applicationType]) {
          distribution[app.applicationType] = 0;
        }
        distribution[app.applicationType]++;
      });

      return {
        academicYear,
        distribution,
      };
    } catch (error) {
      throw error;
    }
  }

  async getSubjectPreferences(academicYear: string) {
    try {
      const applications = await applicationRepository.find({
        where: { academicYear, applicationType: 'Form 5' },
      });

      const preferences = {} as any;
      applications.forEach((app) => {
        if (app.preferredCombination) {
          if (!preferences[app.preferredCombination]) {
            preferences[app.preferredCombination] = 0;
          }
          preferences[app.preferredCombination]++;
        }
      });

      return {
        academicYear,
        preferences,
      };
    } catch (error) {
      throw error;
    }
  }
}
