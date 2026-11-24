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

@Entity({ name: 'employee_payroll_window' })
@Index(
  'uq_employee_payroll_window_active',
  ['company_id', 'employee_id', 'financial_year', 'window_type'],
  { unique: true, where: '"deleted_at" IS NULL' },
)
@Index('idx_employee_payroll_window_company', ['company_id'])
export class EmployeePayrollWindowEntity extends SharedEntity {
  @PrimaryGeneratedColumn('uuid', { name: 'employee_payroll_window_id' })
  readonly employee_payroll_window_id: string;
  @Column({ type: 'uuid' }) company_id: string;
  @Column({ type: 'uuid' }) employee_id: string;
  @Column({ type: 'varchar', length: 20 }) financial_year: string;
  @Column({ type: 'varchar', length: 30 }) window_type: string;
  @Column({ type: 'boolean', default: false }) is_locked: boolean;
  @Column({ type: 'date', nullable: true }) override_due_date?: string | null;
  @Column({ type: 'uuid', nullable: true }) created_by?: string | null;
  @Column({ type: 'uuid', nullable: true }) updated_by?: string | null;
  @ManyToOne(() => CompanyEntity, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'company_id', referencedColumnName: 'id' })
  company: CompanyEntity;
  @ManyToOne(() => UserEntity, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'employee_id', referencedColumnName: 'user_id' })
  employee: UserEntity;
}
