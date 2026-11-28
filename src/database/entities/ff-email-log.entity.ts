import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { BaseEntityColumns } from './base-entity-columns.entity';
import { FfDispatchJobEntity } from './ff-dispatch-job.entity';

@Entity({ name: 'ff_email_log' })
@Index('idx_ff_email_log_job', ['jobId'])
@Index('idx_ff_email_log_employee', ['employeeId'])
export class FfEmailLogEntity extends BaseEntityColumns {
  @PrimaryGeneratedColumn('uuid', { name: 'ff_email_log_id' })
  ffEmailLogId: string;

  @Column({ name: 'job_id', type: 'uuid' })
  jobId: string;

  @Column({ name: 'employee_id', type: 'uuid' })
  employeeId: string;

  @Column({ type: 'varchar', length: 255 })
  email: string;

  @Column({ type: 'varchar', length: 30 })
  status: string;

  @Column({ name: 'error_message', type: 'text', nullable: true })
  errorMessage?: string | null;

  @Column({ name: 'sent_at', type: 'timestamptz', nullable: true })
  sentAt?: Date | null;

  @Column({ name: 'delivered_at', type: 'timestamptz', nullable: true })
  deliveredAt?: Date | null;

  @Column({ name: 'opened_at', type: 'timestamptz', nullable: true })
  openedAt?: Date | null;

  @ManyToOne(() => FfDispatchJobEntity)
  @JoinColumn({ name: 'job_id', referencedColumnName: 'ffDispatchJobId' })
  job: FfDispatchJobEntity;
}
