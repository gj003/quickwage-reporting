import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity({ name: 'payroll_pay_schedule' })
export class PayrollPayScheduleEntity {
  @PrimaryGeneratedColumn('uuid', { name: 'payroll_pay_schedule_id' })
  payroll_pay_schedule_id: string;

  @Column({ type: 'uuid' })
  organization_id: string;

  @Column({ type: 'uuid' })
  payroll_pay_group_id: string;

  @Column({ type: 'int' })
  start_month: number;

  @Column({ type: 'int' })
  start_year: number;

  @Column({ type: 'varchar', length: 50 })
  pay_period_end_type: string;

  @Column({ type: 'int', nullable: true })
  pay_period_end_day?: number | null;

  @Column({ type: 'varchar', length: 50 })
  pay_days_type: string;

  @Column({ type: 'int', nullable: true })
  fixed_pay_days?: number | null;

  @Column({ type: 'boolean', default: true })
  weekly_offs_paid: boolean;

  @Column({ type: 'boolean', default: true })
  holidays_paid: boolean;

  @Column({ type: 'varchar', length: 50, default: 'ACTUAL_DAYS' })
  lop_deduction_type: string;

  @Column({ type: 'boolean', default: true })
  attendance_cutoff_same_as_pay_period_end: boolean;

  @Column({ type: 'int', nullable: true })
  attendance_cutoff_day?: number | null;

  @Column({ type: 'boolean', default: false })
  consider_unpaid_leave_between_cutoff_and_period_end: boolean;

  @Column({ type: 'boolean', default: false })
  piece_remuneration_enabled: boolean;

  @Column({ type: 'boolean', default: false })
  annual_remuneration_enabled: boolean;

  @Column({ type: 'boolean', default: false })
  monthly_remuneration_enabled: boolean;

  @Column({ type: 'boolean', default: false })
  daily_remuneration_enabled: boolean;

  @Column({ type: 'boolean', default: false })
  hourly_remuneration_enabled: boolean;

  @Column({ type: 'varchar', length: 50, default: 'active' })
  status: string;

  @Column({ type: 'boolean', default: false })
  is_step_completed: boolean;

  @Column({ type: 'uuid', nullable: true })
  created_by?: string | null;

  @Column({ type: 'uuid', nullable: true })
  updated_by?: string | null;

  @Column({ type: 'uuid', nullable: true })
  deleted_by?: string | null;

  @CreateDateColumn({ type: 'timestamptz' })
  readonly created_at: Date;

  @UpdateDateColumn({ type: 'timestamptz' })
  readonly updated_at: Date;

  @DeleteDateColumn({ type: 'timestamptz', nullable: true })
  readonly deleted_at?: Date | null;
}
