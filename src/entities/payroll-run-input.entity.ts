import {
  BeforeInsert,
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { randomUUID } from 'crypto';
import { SharedEntity } from './shared.entity';
import { UserEntity } from './user.entity';
import { CompanyEntity } from './company.entity';
import { PayrollPayGroupEntity } from './payroll-pay-group.entity';

@Index('idx_payroll_run_input_company_period_section_employee', [
  'company_id',
  'pay_period',
  'section',
  'employee_id',
])
@Index('idx_payroll_run_input_company_payroll_run_section', [
  'company_id',
  'payroll_run_id',
  'section',
])
@Entity({ name: 'payroll_run_input' })
export class PayrollRunInputEntity extends SharedEntity {
  @PrimaryGeneratedColumn('uuid', { name: 'payroll_run_input_id' })
  payroll_run_input_id: string;

  @Column({ type: 'varchar', length: 30, unique: true })
  payroll_run_input_code: string;

  @Column({ type: 'uuid' }) organization_id: string;
  @Column({ type: 'uuid', nullable: true }) company_id?: string | null;
  @Column({ type: 'uuid' }) pay_group_id: string;
  @Column({ type: 'varchar', length: 80 }) section: string;
  @Column({ type: 'varchar', length: 80, nullable: true }) payroll_run_id?:
    string | null;
  @Column({ type: 'uuid', nullable: true }) employee_id?: string | null;
  @Column({ type: 'varchar', length: 60, nullable: true }) employee_number?:
    string | null;
  @Column({ type: 'varchar', length: 200, nullable: true }) employee_name?:
    string | null;
  @Column({ type: 'date' }) run_start_date: string;
  @Column({ type: 'date' }) run_end_date: string;
  @Column({ type: 'varchar', length: 30 }) pay_period: string;
  @Column({ type: 'numeric', nullable: true }) amount?: number | null;
  @Column({ type: 'varchar', length: 100, nullable: true }) input_type?:
    string | null;
  @Column({ type: 'varchar', length: 100, nullable: true }) pay_action?:
    string | null;
  @Column({ type: 'varchar', length: 1000, nullable: true }) comment?:
    string | null;
  @Column({ type: 'jsonb', nullable: true }) details?: Record<
    string,
    any
  > | null;
  @Column({ type: 'varchar', length: 40, default: 'ACTIVE' }) status: string;
  @Column({ type: 'uuid', nullable: true }) created_by?: string | null;
  @Column({ type: 'uuid', nullable: true }) updated_by?: string | null;
  @Column({ type: 'uuid', nullable: true }) deleted_by?: string | null;

  @ManyToOne(() => CompanyEntity, { nullable: true })
  @JoinColumn({ name: 'company_id', referencedColumnName: 'id' })
  company?: CompanyEntity | null;

  @ManyToOne(() => PayrollPayGroupEntity, { nullable: true })
  @JoinColumn({
    name: 'pay_group_id',
    referencedColumnName: 'payroll_pay_group_id',
  })
  pay_group?: PayrollPayGroupEntity | null;

  @ManyToOne(() => UserEntity, { nullable: true })
  @JoinColumn({ name: 'employee_id', referencedColumnName: 'user_id' })
  employee?: UserEntity | null;

  @BeforeInsert()
  assignCode() {
    if (!this.payroll_run_input_code) {
      // payroll_run_input_code is UNIQUE across the whole table (every
      // company, section and run period share it, with no deleted_at
      // exclusion, so the space never shrinks). A random N-digit numeric
      // code is drawn from a bounded space and inevitably collides once the
      // table crosses roughly sqrt(10^N) rows -- this already happened once
      // at 4 digits (10,000 combinations) and was "fixed" by widening to 10
      // digits (10 billion combinations), which only raised the row count
      // needed to hit the same wall rather than removing it. Derive the
      // code from a fresh UUID instead: 20 hex characters is a 16^20
      // keyspace, which is not going to collide in practice at any table
      // size this system will ever reach, and fits the varchar(30) column
      // exactly ("PAY_INPUT_" + 20 chars = 30 chars).
      this.payroll_run_input_code = `PAY_INPUT_${randomUUID().replace(/-/g, '').toUpperCase().slice(0, 20)}`;
    }
  }
}
