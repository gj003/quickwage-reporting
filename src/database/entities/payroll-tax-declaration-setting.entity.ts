import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
@Entity({ name: 'payroll_tax_declaration_setting' })
export class PayrollTaxDeclarationSettingEntity {
  @PrimaryGeneratedColumn('uuid', {
    name: 'payroll_tax_declaration_setting_id',
  })
  payroll_tax_declaration_setting_id: string;
  @Column({ type: 'uuid' }) organization_id: string;
  @Column({ type: 'uuid' }) payroll_pay_group_id: string;
  @Column({ type: 'int', default: 1 }) monthly_start_day: number;
  @Column({ type: 'int', default: 22 }) monthly_end_day: number;
  @Column({ type: 'int', default: 1 }) financial_year_cutoff_month: number;
  @Column({ type: 'int', default: 22 }) financial_year_cutoff_day: number;
  @Column({ type: 'int', default: 1 }) proof_submission_month: number;
  @Column({ type: 'int', default: 22 }) proof_submission_day: number;
  @Column({ type: 'varchar', length: 30, default: 'EARLIER_OF_BOTH' })
  joining_after_cutoff_rule: string;
  @Column({ type: 'int', default: 30 }) joining_after_cutoff_days: number;
  @Column({ type: 'int', nullable: true }) joining_after_cutoff_month?:
    number | null;
  @Column({ type: 'int', nullable: true }) joining_after_cutoff_day?:
    number | null;
  @Column({ type: 'boolean', default: true })
  require_approval_before_cutoff: boolean;
  @Column({ type: 'boolean', default: true })
  require_approval_after_cutoff: boolean;
  @Column({ type: 'boolean', default: true }) reminder_emails_enabled: boolean;
  @Column({ type: 'varchar', length: 50, default: 'active' }) status: string;
  @Column({ type: 'uuid', nullable: true }) created_by?: string | null;
  @Column({ type: 'uuid', nullable: true }) updated_by?: string | null;
  @Column({ type: 'uuid', nullable: true }) deleted_by?: string | null;
  @CreateDateColumn({ type: 'timestamptz' }) readonly created_at: Date;
  @UpdateDateColumn({ type: 'timestamptz' }) readonly updated_at: Date;
  @DeleteDateColumn({ type: 'timestamptz', nullable: true })
  readonly deleted_at?: Date | null;
}
