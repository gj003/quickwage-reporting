import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
@Entity({ name: 'payroll_misc_setting' })
export class PayrollMiscSettingEntity {
  @PrimaryGeneratedColumn('uuid', { name: 'payroll_misc_setting_id' })
  payroll_misc_setting_id: string;
  @Column({ type: 'uuid' }) organization_id: string;
  @Column({ type: 'uuid' }) payroll_pay_group_id: string;
  @Column({ type: 'boolean', default: false }) separate_bonus_payment: boolean;
  @Column({ type: 'boolean', default: false })
  separate_expense_payment: boolean;
  @Column({ type: 'boolean', default: false })
  separate_cash_advance_payment: boolean;
  @Column({ type: 'boolean', default: true })
  round_monthly_component_value: boolean;
  @Column({ type: 'boolean', default: true })
  round_net_pay_to_nearest_digit: boolean;
  @Column({ type: 'boolean', default: false }) hide_my_pay_page: boolean;
  @Column({ type: 'boolean', default: false }) restrict_net_pay: boolean;
  @Column({ type: 'varchar', length: 30, default: 'MONTHLY' })
  hra_calculation_period: string;
  @Column({ type: 'boolean', default: false })
  consider_future_unpaid_bonus_for_tax_projection: boolean;
  @Column({ type: 'boolean', default: false })
  deduct_complete_tax_on_bonus_month_paid: boolean;
  @Column({ type: 'boolean', default: false })
  reporting_manager_can_hold_salary: boolean;
  @Column({ type: 'boolean', default: false })
  allow_employee_authorize_financial_changes: boolean;
  @Column({ type: 'varchar', length: 50, default: 'active' }) status: string;
  @Column({ type: 'uuid', nullable: true }) created_by?: string | null;
  @Column({ type: 'uuid', nullable: true }) updated_by?: string | null;
  @Column({ type: 'uuid', nullable: true }) deleted_by?: string | null;
  @CreateDateColumn({ type: 'timestamptz' }) readonly created_at: Date;
  @UpdateDateColumn({ type: 'timestamptz' }) readonly updated_at: Date;
  @DeleteDateColumn({ type: 'timestamptz', nullable: true })
  readonly deleted_at?: Date | null;
}
