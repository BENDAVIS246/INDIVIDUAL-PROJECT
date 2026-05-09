import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn,
  OneToMany,
  Index,
} from 'typeorm';
import { User } from './User';
import { Payment } from './Payment';
import { Shortlist } from './Shortlist';
import { Communication } from './Communication';

@Entity('applications')
@Index(['userId', 'academicYear'])
export class Application {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ unique: true })
  applicationId: string; // Unique application number

  @ManyToOne(() => User, (user) => user.applications, { eager: true })
  @JoinColumn({ name: 'userId' })
  applicant: User;

  @Column()
  userId: string;

  @Column()
  pleAggregate: number; // PLE aggregate score

  @Column()
  pleNumber: string; // PLE number/reference

  @Column()
  dateOfBirth: Date;

  @Column()
  gender: string;

  @Column({ nullable: true })
  preferredCombination: string; // For Form 5

  @Column({
    type: 'enum',
    enum: ['Form 1', 'Form 5', 'Transfer'],
    default: 'Form 1',
  })
  applicationType: string;

  @Column()
  academicYear: string; // e.g., "2024"

  @Column({ nullable: true })
  birthCertificatePath: string;

  @Column({ nullable: true })
  pleResultSlipPath: string;

  @Column({
    type: 'enum',
    enum: ['pending', 'under_review', 'shortlisted', 'rejected', 'admitted', 'deferred'],
    default: 'pending',
  })
  status: string;

  @Column({ default: false })
  isPaymentVerified: boolean;

  @CreateDateColumn()
  submittedAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @OneToMany(() => Payment, (payment) => payment.application)
  payments: Payment[];

  @OneToMany(() => Shortlist, (shortlist) => shortlist.application)
  shortlistRecords: Shortlist[];

  @OneToMany(() => Communication, (comm) => comm.application)
  communications: Communication[];
}
