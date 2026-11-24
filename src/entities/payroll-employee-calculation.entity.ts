import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { SharedEntity } from './shared.entity';
import { PayrollRunEntity } from './payroll-run.entity';

@Entity({ name: 'payroll_employee_calculations' })
@Index('idx_payroll_employee_calculations_run', ['payroll_run_id'], {
  where: '"deleted_at" IS NULL',
})
export class PayrollEmployeeCalculationEntity extends SharedEntity {
  @PrimaryGeneratedColumn('uuid', { name: 'payroll_employee_calculation_id' })
  payroll_employee_calculation_id: string;

  @Column({ type: 'uuid' }) organization_id: string;
  @Column({ type: 'uuid' }) employee_id: string;
  @Column({ type: 'uuid' }) pay_group_id: string;
  @Column({ type: 'varchar', length: 100 }) calculation_run_id: string;
  // Set only for rows calculated as part of an off-cycle payroll run; null
  // for the regular monthly cycle. Lets statutory review, payslips, payment
  // batches and the outside-components report scope themselves to a
  // specific off-cycle run instead of the whole pay group + period.
  @Column({ type: 'uuid', nullable: true }) payroll_run_id?: string | null;
  @Column({ type: 'uuid', nullable: true }) approval_request_id?: string | null;
  @Column({ type: 'date' }) run_start_date: string;
  @Column({ type: 'date' }) run_end_date: string;
  @Column({ type: 'int' }) payroll_month: number;
  @Column({ type: 'int' }) payroll_year: number;
  @Column({ type: 'varchar', length: 30 }) payroll_type: string;
  @Column({ type: 'numeric', default: 0 }) gross_earnings: number;
  @Column({ type: 'numeric', default: 0 }) total_deductions: number;
  @Column({ type: 'numeric', default: 0 }) net_pay: number;
  @Column({ type: 'numeric', default: 0 }) employer_contributions: number;
  @Column({ type: 'jsonb', nullable: true }) component_breakup?:
    Record<string, any>[] | null;
  @Column({ type: 'jsonb', nullable: true }) calculation_json?: Record<
    string,
    any
  > | null;
  @Column({ type: 'varchar', length: 40, default: 'CALCULATED' })
  status: string;
  @Column({ type: 'timestamptz', nullable: true }) locked_at?: Date | null;
  @Column({ type: 'uuid', nullable: true }) locked_by?: string | null;
  @Column({ type: 'uuid', nullable: true }) created_by?: string | null;
  @Column({ type: 'uuid', nullable: true }) updated_by?: string | null;

  @ManyToOne(() => PayrollRunEntity, { nullable: true, onDelete: 'SET NULL' })
  @JoinColumn({
    name: 'payroll_run_id',
    referencedColumnName: 'payroll_run_id',
  })
  payroll_run?: PayrollRunEntity | null;
}
