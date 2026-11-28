import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { SharedEntity } from './shared.entity';

@Entity('leave_accrual_run_logs')
export class LeaveAccrualRunLogEntity extends SharedEntity {
  @PrimaryGeneratedColumn('uuid')
  leave_accrual_run_log_id: string;

  @Column({ type: 'varchar', length: 100, unique: true })
  run_id: string;

  @Column({ type: 'varchar', length: 30 })
  mode: string;

  @Column({ type: 'varchar', length: 20, default: 'STARTED' })
  status: string;

  @Column({ type: 'varchar', length: 40, nullable: true })
  period_key: string | null;

  @Column({ type: 'int', default: 0 })
  scanned_users: number;

  @Column({ type: 'int', default: 0 })
  processed_types: number;

  @Column({ type: 'int', default: 0 })
  allocated_count: number;

  @Column({ type: 'int', default: 0 })
  skipped_count: number;

  @Column({ type: 'int', default: 0 })
  failed_count: number;

  @Column({ type: 'text', nullable: true })
  error_message: string | null;

  @Column({ type: 'timestamptz', nullable: true })
  started_at: Date | null;

  @Column({ type: 'timestamptz', nullable: true })
  completed_at: Date | null;
}
