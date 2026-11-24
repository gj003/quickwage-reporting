import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity({ name: 'payroll_pay_group_component' })
export class PayrollPayGroupComponentEntity {
  @PrimaryGeneratedColumn('uuid', { name: 'payroll_pay_group_component_id' })
  payroll_pay_group_component_id: string;
  @Column({ type: 'uuid' }) organization_id: string;
  @Column({ type: 'uuid' }) payroll_pay_group_id: string;
  @Column({ type: 'uuid' }) payroll_salary_component_id: string;
  @Column({ type: 'boolean', default: true }) is_enabled: boolean;
  @Column({ type: 'boolean', default: false })
  is_present_in_salary_structure: boolean;
  @Column({ type: 'int', default: 0 }) display_sequence: number;
  @Column({ type: 'varchar', length: 30 }) component_category: string;
  @Column({ type: 'varchar', length: 20 }) component_frequency: string;
  @Column({ type: 'varchar', length: 20, default: 'FIXED' })
  calculation_type: string;
  @Column({ type: 'text', nullable: true }) calculation_expression?:
    string | null;
  @Column({ type: 'decimal', precision: 12, scale: 2, nullable: true })
  fixed_amount?: string | null;
  @Column({ type: 'decimal', precision: 12, scale: 4, nullable: true })
  percentage_value?: string | null;
  @Column({ type: 'uuid', nullable: true }) percentage_base_component_id?:
    string | null;
  @Column({ type: 'boolean', default: false }) use_annual_values: boolean;
  @Column({ type: 'boolean', default: false }) is_locked_in_structure: boolean;
  @Column({ type: 'boolean', default: false })
  is_flexible_benefit_plan: boolean;
  @Column({ type: 'boolean', default: false })
  pay_outside_regular_salary: boolean;
  @Column({ type: 'boolean', default: false })
  is_included_in_arrear_calculation: boolean;
  @Column({ type: 'boolean', default: false })
  mark_outside_salary_structure: boolean;
  @Column({ type: 'boolean', default: false })
  allow_employee_level_override: boolean;
  @Column({ type: 'boolean', default: false })
  is_value_not_impacted_by_lop: boolean;
  @Column({ type: 'boolean', default: false })
  is_earnings_deductions_sync_enabled: boolean;
  @Column({ type: 'boolean', default: false })
  hide_component_in_payslip: boolean;
  @Column({ type: 'boolean', default: false })
  adjust_lop_difference_against_special_allowance: boolean;
  @Column({ type: 'varchar', length: 50, default: 'active' }) status: string;
  @Column({ type: 'uuid', nullable: true }) created_by?: string | null;
  @Column({ type: 'uuid', nullable: true }) updated_by?: string | null;
  @Column({ type: 'uuid', nullable: true }) deleted_by?: string | null;
  @CreateDateColumn({ type: 'timestamptz' }) readonly created_at: Date;
  @UpdateDateColumn({ type: 'timestamptz' }) readonly updated_at: Date;
  @DeleteDateColumn({ type: 'timestamptz', nullable: true })
  readonly deleted_at?: Date | null;
}
