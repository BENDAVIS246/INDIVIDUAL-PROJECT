import { AppDataSource } from '../config/database';
import { Shortlist } from '../models/Shortlist';
import { Application } from '../models/Application';

const shortlistRepository = AppDataSource.getRepository(Shortlist);
const applicationRepository = AppDataSource.getRepository(Application);

export class AdmissionService {
  async generateShortlist(
    academicYear: string,
    cutoffAggregate: number,
    round: number = 1
  ) {
    try {
      // Get all applications for the academic year
      const applications = await applicationRepository.find({
        where: { academicYear },
      });

      const shortlistedApps = applications.filter((app) => app.pleAggregate <= cutoffAggregate);

      // Create shortlist records
      const shortlists = shortlistedApps.map((app) =>
        shortlistRepository.create({
          applicationId: app.id,
          academicYear,
          round,
          cutoffAggregate,
          selectionStatus: 'shortlisted',
        })
      );

      await shortlistRepository.save(shortlists);

      // Update application status
      for (const app of shortlistedApps) {
        app.status = 'shortlisted';
        await applicationRepository.save(app);
      }

      return shortlists;
    } catch (error) {
      throw error;
    }
  }

  async getShortlistedApplicants(academicYear: string) {
    try {
      const shortlist = await shortlistRepository.find({
        where: { academicYear, selectionStatus: 'shortlisted' },
        relations: ['application', 'application.applicant'],
      });
      return shortlist;
    } catch (error) {
      throw error;
    }
  }

  async scheduleInterview(
    shortlistId: string,
    interviewDate: Date,
    interviewVenue: string
  ) {
    try {
      const shortlist = await shortlistRepository.findOne({ where: { id: shortlistId } });
      if (!shortlist) {
        throw new Error('Shortlist record not found');
      }

      shortlist.interviewDate = interviewDate;
      shortlist.interviewVenue = interviewVenue;
      shortlist.interviewStatus = 'pending';
      await shortlistRepository.save(shortlist);
      return shortlist;
    } catch (error) {
      throw error;
    }
  }

  async recordInterviewScore(shortlistId: string, score: number) {
    try {
      const shortlist = await shortlistRepository.findOne({ where: { id: shortlistId } });
      if (!shortlist) {
        throw new Error('Shortlist record not found');
      }

      shortlist.interviewScore = score;
      shortlist.interviewStatus = 'interviewed';
      await shortlistRepository.save(shortlist);
      return shortlist;
    } catch (error) {
      throw error;
    }
  }

  async issueAdmissionOffer(shortlistId: string) {
    try {
      const shortlist = await shortlistRepository.findOne({
        where: { id: shortlistId },
        relations: ['application'],
      });
      if (!shortlist) {
        throw new Error('Shortlist record not found');
      }

      shortlist.admissionOffered = true;
      shortlist.selectionStatus = 'admitted';
      shortlist.application.status = 'admitted';

      await shortlistRepository.save(shortlist);
      await applicationRepository.save(shortlist.application);
      return shortlist;
    } catch (error) {
      throw error;
    }
  }
}
