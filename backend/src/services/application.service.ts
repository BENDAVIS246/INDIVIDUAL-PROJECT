import { AppDataSource } from '../config/database';
import { Application } from '../models/Application';
import { v4 as uuidv4 } from 'uuid';

const applicationRepository = AppDataSource.getRepository(Application);

export class ApplicationService {
  async createApplication(userId: string, applicationData: any) {
    try {
      const applicationId = `APP-${new Date().getFullYear()}-${uuidv4().substring(0, 8).toUpperCase()}`;

      const application = applicationRepository.create({
        applicationId,
        userId,
        pleAggregate: applicationData.pleAggregate,
        pleNumber: applicationData.pleNumber,
        dateOfBirth: applicationData.dateOfBirth,
        gender: applicationData.gender,
        preferredCombination: applicationData.preferredCombination,
        applicationType: applicationData.applicationType || 'Form 1',
        academicYear: new Date().getFullYear().toString(),
        status: 'pending',
      });

      await applicationRepository.save(application);
      return application;
    } catch (error) {
      throw error;
    }
  }

  async uploadDocuments(applicationId: string, birthCertificatePath: string, pleResultSlipPath: string) {
    try {
      const application = await applicationRepository.findOne({ where: { id: applicationId } });
      if (!application) {
        throw new Error('Application not found');
      }

      application.birthCertificatePath = birthCertificatePath;
      application.pleResultSlipPath = pleResultSlipPath;
      await applicationRepository.save(application);
      return application;
    } catch (error) {
      throw error;
    }
  }

  async getApplicationById(applicationId: string) {
    try {
      const application = await applicationRepository.findOne({
        where: { id: applicationId },
        relations: ['applicant', 'payments', 'communications'],
      });
      if (!application) {
        throw new Error('Application not found');
      }
      return application;
    } catch (error) {
      throw error;
    }
  }

  async getUserApplications(userId: string) {
    try {
      const applications = await applicationRepository.find({
        where: { userId },
        relations: ['payments'],
        order: { createdAt: 'DESC' },
      });
      return applications;
    } catch (error) {
      throw error;
    }
  }

  async getApplicationsByAcademicYear(academicYear: string) {
    try {
      const applications = await applicationRepository.find({
        where: { academicYear },
        relations: ['applicant'],
      });
      return applications;
    } catch (error) {
      throw error;
    }
  }

  async updateApplicationStatus(applicationId: string, status: string) {
    try {
      const application = await applicationRepository.findOne({ where: { id: applicationId } });
      if (!application) {
        throw new Error('Application not found');
      }
      application.status = status;
      await applicationRepository.save(application);
      return application;
    } catch (error) {
      throw error;
    }
  }
}
