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

@Entity('payments')
@Index(['applicationId', 'status'])
export class Payment {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ unique: true })
  transactionId: string;

  @ManyToOne(() => Application, (app) => app.payments, { eager: true })
  @JoinColumn({ name: 'applicationId' })
  application: Application;

  @Column()
  applicationId: string;

  @Column('decimal', { precision: 10, scale: 2 })
  amount: number;

  @Column({
    type: 'enum',
    enum: ['MTN', 'Airtel', 'Stripe', 'Bank Transfer'],
  })
  paymentMethod: string;

  @Column()
  phone: string;

  @Column({
    type: 'enum',
    enum: ['pending', 'processing', 'completed', 'failed', 'refunded'],
    default: 'pending',
  })
  status: string;

  @Column({ nullable: true })
  receiptNumber: string;

  @Column({ nullable: true })
  receiptUrl: string; // URL to digital receipt

  @Column({ nullable: true })
  externalTransactionId: string; // ID from payment gateway

  @Column({ nullable: true })
  failureReason: string;

  @CreateDateColumn()
  initiatedAt: Date;

  @Column({ nullable: true })
  completedAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
