import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('admission_statistics')
export class AdmissionStatistic {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  academicYear: string;

  @Column()
  totalApplications: number;

  @Column()
  shortlistedCount: number;

  @Column()
  admittedCount: number;

  @Column()
  rejectedCount: number;

  @Column()
  femaleApplicants: number;

  @Column()
  maleApplicants: number;

  @Column('text')
  subjectDistribution: string; // JSON string

  @Column('text')
  geographicalDistribution: string; // JSON string

  @Column('decimal', { precision: 5, scale: 2 })
  averagePleAggregate: number;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
