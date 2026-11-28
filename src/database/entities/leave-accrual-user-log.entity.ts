import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { SharedEntity } from './shared.entity';

@Entity('leave_accrual_user_logs')
export class LeaveAccrualUserLogEntity extends SharedEntity {
  @PrimaryGeneratedColumn('uuid')
  leave_accrual_user_log_id: string;

  @Column({ type: 'varchar', length: 100 })
  run_id: string;

  @Column({ type: 'varchar', length: 30 })
  mode: string;

  @Column({ type: 'varchar', length: 100, nullable: true })
  user_id: string | null;

  @Column({ type: 'int', nullable: true })
  leave_plan_leave_type_id: number | null;

  @Column({ type: 'varchar', length: 40, nullable: true })
  period_key: string | null;

  @Column({ type: 'varchar', length: 20 })
  status: string;

  @Column({ type: 'numeric', precision: 10, scale: 2, nullable: true })
  allocated_days: string | null;

  @Column({ type: 'numeric', precision: 10, scale: 2, nullable: true })
  balance_before: string | null;

  @Column({ type: 'numeric', precision: 10, scale: 2, nullable: true })
  balance_after: string | null;

  @Column({ type: 'text', nullable: true })
  reason: string | null;
}
