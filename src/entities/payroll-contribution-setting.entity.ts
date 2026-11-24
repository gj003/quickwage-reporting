import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity({ name: 'payroll_contribution_setting' })
export class PayrollContributionSettingEntity {
  @PrimaryGeneratedColumn('uuid', { name: 'payroll_contribution_setting_id' })
  payroll_contribution_setting_id: string;
  @Column({ type: 'uuid' }) organization_id: string;
  @Column({ type: 'uuid' }) payroll_pay_group_id: string;
  @Column({ type: 'varchar', length: 20 }) contribution_type: string;
  @Column({ type: 'boolean', default: false }) is_enabled: boolean;
  @Column({ type: 'text', nullable: true }) employee_formula?: string | null;
  @Column({ type: 'text', nullable: true }) employer_formula?: string | null;
  @Column({ type: 'varchar', length: 100, nullable: true })
  wage_base_component?: string | null;
  @Column({ type: 'decimal', precision: 12, scale: 2, nullable: true })
  wage_limit_amount?: string | null;
  @Column({ type: 'decimal', precision: 12, scale: 4, nullable: true })
  contribution_rate?: string | null;
  @Column({ type: 'decimal', precision: 12, scale: 4, nullable: true })
  employer_rate?: string | null;
  @Column({ type: 'boolean', default: false }) is_override_allowed: boolean;
  @Column({ type: 'boolean', default: false }) opt_out_allowed: boolean;
  @Column({ type: 'boolean', default: true }) limit_to_statutory: boolean;
  @Column({ type: 'boolean', default: false }) prorate_by_joining_date: boolean;
  @Column({ type: 'boolean', default: false })
  employer_contribution_in_ctc: boolean;
  @Column({ type: 'boolean', default: false })
  other_charges_outside_ctc: boolean;
  @Column({ type: 'decimal', precision: 12, scale: 2, nullable: true })
  employer_monthly_limit?: string | null;
  @Column({ type: 'jsonb', nullable: true })
  type_settings?: Record<string, any> | null;
  @Column({ type: 'varchar', length: 50, default: 'active' }) status: string;
  @Column({ type: 'uuid', nullable: true }) created_by?: string | null;
  @Column({ type: 'uuid', nullable: true }) updated_by?: string | null;
  @Column({ type: 'uuid', nullable: true }) deleted_by?: string | null;
  @CreateDateColumn({ type: 'timestamptz' }) readonly created_at: Date;
  @UpdateDateColumn({ type: 'timestamptz' }) readonly updated_at: Date;
  @DeleteDateColumn({ type: 'timestamptz', nullable: true })
  readonly deleted_at?: Date | null;
}
