import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
@Entity({ name: 'payroll_payslip_setting' })
export class PayrollPayslipSettingEntity {
  @PrimaryGeneratedColumn('uuid', { name: 'payroll_payslip_setting_id' })
  payroll_payslip_setting_id: string;
  @Column({ type: 'uuid' }) organization_id: string;
  @Column({ type: 'uuid' }) payroll_pay_group_id: string;
  @Column({ type: 'boolean', default: false })
  password_protection_enabled: boolean;
  @Column({ type: 'varchar', length: 100, default: 'default' })
  payslip_template: string;
  @Column({ type: 'varchar', length: 20, default: 'LEFT' })
  company_logo_alignment: string;
  @Column({ type: 'varchar', length: 20, default: 'FULL' })
  address_visibility: string;
  @Column({ type: 'boolean', default: true }) append_tax_summary: boolean;
  @Column({ type: 'boolean', default: false })
  include_additional_salary_column: boolean;
  @Column({ type: 'boolean', default: true }) exclude_na_fields: boolean;
  @Column({ type: 'boolean', default: true }) include_loan_details: boolean;
  @Column({ type: 'boolean', default: true }) include_leave_summary: boolean;
  @Column({ type: 'boolean', default: true }) include_arrear_breakup: boolean;
  @Column({ type: 'boolean', default: false })
  display_imported_salary_payslip: boolean;
  @Column({ type: 'boolean', default: false })
  include_allowances_outside_ctc: boolean;
  @Column({ type: 'boolean', default: false }) include_overtime_hours: boolean;
  @Column({ type: 'boolean', default: true }) default_footer_enabled: boolean;
  @Column({ type: 'text', nullable: true }) default_footer_text?: string | null;
  @Column({ type: 'boolean', default: false })
  additional_footer_enabled: boolean;
  @Column({ type: 'text', nullable: true }) additional_footer_text?:
    string | null;
  @Column({ type: 'jsonb', default: () => "'[]'" }) payslip_fields: Array<
    Record<string, unknown>
  >;
  @Column({ type: 'varchar', length: 50, default: 'active' }) status: string;
  @Column({ type: 'uuid', nullable: true }) created_by?: string | null;
  @Column({ type: 'uuid', nullable: true }) updated_by?: string | null;
  @Column({ type: 'uuid', nullable: true }) deleted_by?: string | null;
  @CreateDateColumn({ type: 'timestamptz' }) readonly created_at: Date;
  @UpdateDateColumn({ type: 'timestamptz' }) readonly updated_at: Date;
  @DeleteDateColumn({ type: 'timestamptz', nullable: true })
  readonly deleted_at?: Date | null;
}
