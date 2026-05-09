import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  ManyToOne,
  JoinColumn,
  Index,
} from 'typeorm';
import { Application } from './Application';

@Entity('communications')
@Index(['applicationId', 'type'])
export class Communication {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => Application, (app) => app.communications, { eager: true })
  @JoinColumn({ name: 'applicationId' })
  application: Application;

  @Column()
  applicationId: string;

  @Column()
  recipientEmail: string;

  @Column({ nullable: true })
  recipientPhone: string;

  @Column({
    type: 'enum',
    enum: ['email', 'sms', 'both'],
  })
  type: string;

  @Column({
    type: 'enum',
    enum: [
      'application_received',
      'payment_confirmation',
      'shortlisting_notification',
      'interview_schedule',
      'admission_offer',
      'rejection_notice',
      'reporting_instructions',
      'custom',
    ],
  })
  messageType: string;

  @Column()
  subject: string;

  @Column('text')
  body: string;

  @Column({
    type: 'enum',
    enum: ['pending', 'sent', 'failed', 'read'],
    default: 'pending',
  })
  status: string;

  @Column({ nullable: true })
  failureReason: string;

  @CreateDateColumn()
  sentAt: Date;

  @CreateDateColumn()
  createdAt: Date;
}
