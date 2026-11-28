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
import { UserEntity } from './user.entity';
import { PayrollRunEntity } from './payroll-run.entity';
import { PayrollPayGroupEntity } from './payroll-pay-group.entity';

@Entity({ name: 'employee_bonus' })
@Index(
  'idx_employee_bonus_company_employee_payment',
  ['company_id', 'user_id', 'payment_status'],
  { where: '"deleted_at" IS NULL' },
)
@Index(
  'idx_employee_bonus_company_filters',
  ['company_id', 'payment_status', 'payout_due_on'],
  { where: '"deleted_at" IS NULL' },
)
@Index('idx_employee_bonus_payroll_run', ['company_id', 'payroll_run_id'], {
  where: '"deleted_at" IS NULL',
})
export class EmployeeBonusEntity extends SharedEntity {
  @PrimaryGeneratedColumn('uuid', { name: 'employee_bonus_id' })
  employee_bonus_id: string;

  @Column({ type: 'uuid' })
  user_id: string;

  @Column({ type: 'uuid' })
  company_id: string;

  @Column({ type: 'varchar', length: 100 })
  bonus_type: string;

  @Column({ type: 'decimal', precision: 14, scale: 2 })
  bonus_amount: string;

  @Column({ type: 'varchar', length: 10, default: 'INR', nullable: true })
  currency?: string | null;

  @Column({ type: 'varchar', length: 30, default: 'PENDING' })
  payment_status: string;

  @Column({ type: 'date', nullable: true })
  payout_due_on?: string | null;

  @Column({ type: 'date', nullable: true })
  paid_on?: string | null;

  @Column({ type: 'boolean', default: false })
  include_in_tax_calculation: boolean;

  @Column({ type: 'uuid', nullable: true })
  payroll_run_id?: string | null;

  @Column({ type: 'uuid', nullable: true })
  payroll_pay_group_id?: string | null;

  @Column({ type: 'text', nullable: true })
  note?: string | null;

  @Column({ type: 'varchar', length: 20, default: 'active' })
  status: string;

  @Column({ type: 'uuid', nullable: true })
  created_by?: string | null;

  @Column({ type: 'uuid', nullable: true })
  updated_by?: string | null;

  @ManyToOne(() => UserEntity, (rel) => rel.user_id, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'user_id' })
  user: UserEntity;

  @ManyToOne(() => CompanyEntity, (rel) => rel.id, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'company_id' })
  company: CompanyEntity;

  @ManyToOne(() => PayrollRunEntity, { nullable: true, onDelete: 'SET NULL' })
  @JoinColumn({
    name: 'payroll_run_id',
    referencedColumnName: 'payroll_run_id',
  })
  payroll_run?: PayrollRunEntity | null;

  @ManyToOne(() => PayrollPayGroupEntity, {
    nullable: true,
    onDelete: 'SET NULL',
  })
  @JoinColumn({
    name: 'payroll_pay_group_id',
    referencedColumnName: 'payroll_pay_group_id',
  })
  payroll_pay_group?: PayrollPayGroupEntity | null;
}
