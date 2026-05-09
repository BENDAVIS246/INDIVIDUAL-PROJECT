import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn,
  Index,
} from 'typeorm';
import { Application } from './Application';

@Entity('shortlists')
@Index(['academicYear', 'isActive'])
export class Shortlist {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => Application, (app) => app.shortlistRecords, { eager: true })
  @JoinColumn({ name: 'applicationId' })
  application: Application;

  @Column()
  applicationId: string;

  @Column()
  academicYear: string;

  @Column()
  round: number; // Shortlisting round

  @Column()
  cutoffAggregate: number; // Minimum PLE aggregate for this round

  @Column({
    type: 'enum',
    enum: ['shortlisted', 'rejected', 'pending'],
    default: 'pending',
  })
  selectionStatus: string;

  @Column({ nullable: true })
  interviewDate: Date;

  @Column({ nullable: true })
  interviewVenue: string;

  @Column({
    type: 'enum',
    enum: ['pending', 'interviewed', 'admitted', 'rejected'],
    default: 'pending',
  })
  interviewStatus: string;

  @Column({ nullable: true })
  interviewScore: number;

  @Column({ default: false })
  admissionOffered: boolean;

  @Column({ nullable: true })
  admissionLetterId: string;

  @Column({ default: true })
  isActive: boolean;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
