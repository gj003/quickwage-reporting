import type { CombinedPayslipSnapshotDTO } from '../../modules/payroll-settings/dto/combined-payslip.dto';
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

@Entity({ name: 'employee_payslip' })
@Index('idx_employee_payslip_run', ['payroll_run_id'], {
  where: '"deleted_at" IS NULL',
})
export class EmployeePayslipEntity extends SharedEntity {
  @PrimaryGeneratedColumn('uuid', { name: 'employee_payslip_id' })
  employee_payslip_id: string;

  @Column({ type: 'uuid' })
  user_id: string;

  @Column({ type: 'uuid' })
  company_id: string;

  @Column({ type: 'uuid', nullable: true })
  payroll_pay_group_id?: string | null;

  // REGULAR (default, monthly payslip) or FNF (full & final settlement
  // statement) -- distinguishes the "Payslip List" tab from the
  // "F&F Statements" tab.
  @Column({ type: 'varchar', length: 20, default: 'REGULAR' })
  payslip_type: string;

  // Null for combined monthly payslips; retained for separate FNF statements.
  @Column({ type: 'uuid', nullable: true })
  payroll_run_id?: string | null;

  @Column({ type: 'jsonb', nullable: true })
  combined_snapshot?: CombinedPayslipSnapshotDTO | null;

  @Column({ type: 'int' })
  year: number;

  @Column({ type: 'int' })
  month: number;

  @Column({ type: 'varchar', length: 50, nullable: true })
  month_label?: string | null;

  @Column({ type: 'text', nullable: true })
  s3_url?: string | null;

  @Column({ type: 'varchar', length: 20, default: 'generated' })
  status: string;

  @Column({ type: 'boolean', default: true })
  is_password_protected: boolean;

  @Column({ type: 'decimal', precision: 14, scale: 2, nullable: true })
  net_pay?: string | null;

  @Column({ type: 'boolean', default: false })
  is_released: boolean;

  @Column({ type: 'timestamptz', nullable: true })
  released_at?: Date | null;

  @Column({ type: 'uuid', nullable: true })
  released_by?: string | null;

  @Column({ type: 'varchar', length: 500, nullable: true })
  hold_reason?: string | null;

  @Column({ type: 'boolean', default: false })
  email_sent: boolean;

  @Column({ type: 'timestamptz', nullable: true })
  email_sent_at?: Date | null;

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
}
