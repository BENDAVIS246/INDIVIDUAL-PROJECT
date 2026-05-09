import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, OneToMany } from 'typeorm';
import { Application } from './Application';

@Entity('users')
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ unique: true })
  email: string;

  @Column()
  password: string;

  @Column()
  firstName: string;

  @Column()
  lastName: string;

  @Column({
    type: 'enum',
    enum: ['admin', 'admissions_officer', 'accounts_staff', 'head_teacher', 'applicant'],
    default: 'applicant',
  })
  role: string;

  @Column({ default: true })
  isActive: boolean;

  @Column({ nullable: true })
  phoneNumber: string;

  @Column({ nullable: true })
  profileImage: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @OneToMany(() => Application, (app) => app.applicant)
  applications: Application[];
}
