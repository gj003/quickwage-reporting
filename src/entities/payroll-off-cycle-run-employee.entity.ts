import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { SharedEntity } from './shared.entity';
import { CompanyEntity } from './company.entity';
import { PayrollRunEntity } from './payroll-run.entity';
import { UserEntity } from './user.entity';

// Persists the "Select Employees" step of the off-cycle payroll wizard: which
// employees were chosen for a given off-cycle payroll_run. Every run-payroll/*
// section endpoint scopes its data to this set (via payroll_run_id) once a
// run id is passed, instead of the whole pay group. Deselecting an employee
// is a soft-delete of their row here, never a hard delete.
@Entity({ name: 'payroll_off_cycle_run_employees' })
@Index('idx_payroll_off_cycle_run_employees_company', ['company_id'])
@Index('idx_payroll_off_cycle_run_employees_run', ['payroll_run_id'], {
  where: '"deleted_at" IS NULL',
})
@Index(
  'uq_payroll_off_cycle_run_employees_run_employee',
  ['payroll_run_id', 'employee_id'],
  { unique: true, where: '"deleted_at" IS NULL' },
)
export class PayrollOffCycleRunEmployeeEntity extends SharedEntity {
  @PrimaryGeneratedColumn('uuid', {
    name: 'payroll_off_cycle_run_employee_id',
  })
  readonly payroll_off_cycle_run_employee_id: string;

  @Column({ type: 'uuid' })
  company_id: string;

  @Column({ type: 'uuid' })
  payroll_run_id: string;

  @Column({ type: 'uuid' })
  employee_id: string;

  @Column({ type: 'uuid', nullable: true })
  created_by?: string | null;

  @Column({ type: 'uuid', nullable: true })
  deleted_by?: string | null;

  @ManyToOne(() => CompanyEntity, { nullable: false, onDelete: 'CASCADE' })
  @JoinColumn({ name: 'company_id', referencedColumnName: 'id' })
  company: CompanyEntity;

  @ManyToOne(() => PayrollRunEntity, { nullable: false, onDelete: 'CASCADE' })
  @JoinColumn({
    name: 'payroll_run_id',
    referencedColumnName: 'payroll_run_id',
  })
  payroll_run: PayrollRunEntity;

  @ManyToOne(() => UserEntity, { nullable: false, onDelete: 'CASCADE' })
  @JoinColumn({ name: 'employee_id', referencedColumnName: 'user_id' })
  employee: UserEntity;
}
