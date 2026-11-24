import {
  BeforeInsert,
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { generatePrefixedCode } from 'src/common/utility';
import { SharedEntity } from './shared.entity';
import { CompanyEntity } from './company.entity';
import { LegalEntity } from './legal_entity.entity';
import { PayrollPayGroupEntity } from './payroll-pay-group.entity';
import { UserEntity } from './user.entity';

@Entity({ name: 'payroll_run' })
@Index('idx_payroll_run_company', ['company_id'])
@Index(
  'idx_payroll_run_company_status_period',
  ['company_id', 'status', 'run_start_date', 'run_end_date'],
  { where: '"deleted_at" IS NULL' },
)
@Index(
  'idx_payroll_run_company_pay_group_period',
  ['company_id', 'pay_group_id', 'run_start_date', 'run_end_date'],
  { where: '"deleted_at" IS NULL' },
)
@Index('uq_payroll_run_company_code', ['company_id', 'payroll_run_code'], {
  unique: true,
  where: '"deleted_at" IS NULL',
})
@Index(
  'uq_payroll_run_active_period_type',
  ['company_id', 'pay_group_id', 'run_start_date', 'run_end_date', 'run_type'],
  {
    // Only REGULAR runs are limited to one active run per period -- an
    // OFF_CYCLE pay group can legitimately have several off-cycle runs
    // (e.g. two separate off-cycle batches) inside the same calendar month.
    unique: true,
    where:
      '"deleted_at" IS NULL AND "status" <> \'CANCELLED\' AND "run_type" = \'REGULAR\'',
  },
)
export class PayrollRunEntity extends SharedEntity {
  @PrimaryGeneratedColumn('uuid', { name: 'payroll_run_id' })
  readonly payroll_run_id: string;

  @Column({ type: 'varchar', length: 50 })
  payroll_run_code: string;

  @Column({ type: 'uuid' })
  company_id: string;

  @Column({ type: 'uuid' })
  pay_group_id: string;

  @Column({ type: 'uuid' })
  legal_entity_id: string;

  @Column({ type: 'date' })
  run_start_date: string;

  @Column({ type: 'date' })
  run_end_date: string;

  @Column({ type: 'varchar', length: 30, default: 'REGULAR' })
  run_type: string;

  @Column({ type: 'varchar', length: 30, default: 'DRAFT' })
  status: string;

  @Column({ type: 'varchar', length: 500, nullable: true })
  cancellation_reason?: string | null;

  // Off-cycle-run-only fields (null for REGULAR runs). Populated by the
  // off-cycle payroll wizard's "Off-cycle details" step.
  @Column({ type: 'varchar', length: 150, nullable: true })
  off_cycle_name?: string | null;

  @Column({ type: 'date', nullable: true })
  due_date?: string | null;

  // Categories selected in the "Off-cycle details" modal, e.g.
  // ['PENDING_SALARIES', 'PENDING_BONUSES']. Plain jsonb array of strings,
  // not a DB enum type -- validated against OffCycleRunCategory in the DTO.
  @Column({ type: 'jsonb', nullable: true })
  categories?: string[] | null;

  // Denormalized count of payroll_off_cycle_run_employees rows, kept in
  // sync whenever the "Select Employees" step is saved, so list/summary
  // reads don't need a COUNT(*) join every time.
  @Column({ type: 'int', default: 0 })
  total_employees_selected: number;

  @Column({ type: 'uuid', nullable: true })
  initiated_by?: string | null;

  @Column({ type: 'uuid', nullable: true })
  updated_by?: string | null;

  @Column({ type: 'uuid', nullable: true })
  deleted_by?: string | null;

  @ManyToOne(() => CompanyEntity, { nullable: false, onDelete: 'CASCADE' })
  @JoinColumn({ name: 'company_id', referencedColumnName: 'id' })
  company: CompanyEntity;

  @ManyToOne(() => PayrollPayGroupEntity, {
    nullable: false,
    onDelete: 'RESTRICT',
  })
  @JoinColumn({
    name: 'pay_group_id',
    referencedColumnName: 'payroll_pay_group_id',
  })
  pay_group: PayrollPayGroupEntity;

  @ManyToOne(() => LegalEntity, { nullable: false, onDelete: 'RESTRICT' })
  @JoinColumn({
    name: 'legal_entity_id',
    referencedColumnName: 'legal_entity_id',
  })
  legal_entity: LegalEntity;

  @ManyToOne(() => UserEntity, { nullable: true, onDelete: 'SET NULL' })
  @JoinColumn({ name: 'initiated_by', referencedColumnName: 'user_id' })
  initiator?: UserEntity | null;

  @BeforeInsert()
  assignCode(): void {
    if (!this.payroll_run_code) {
      this.payroll_run_code = generatePrefixedCode('PAY_RUN');
    }
  }
}
