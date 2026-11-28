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
import { PayrollPayGroupEntity } from './payroll-pay-group.entity';
import { PayrollSalaryStructureEntity } from './payroll-salary-structure.entity';

@Entity({ name: 'employee_salary_revision' })
@Index(
  'idx_salary_revision_company_employee_status',
  ['company_id', 'user_id', 'status'],
  { where: '"deleted_at" IS NULL' },
)
@Index(
  'idx_salary_revision_company_effective',
  ['company_id', 'effective_from'],
  { where: '"deleted_at" IS NULL' },
)
export class EmployeeSalaryRevisionEntity extends SharedEntity {
  @PrimaryGeneratedColumn('uuid', { name: 'employee_salary_revision_id' })
  employee_salary_revision_id: string;

  @Column({ type: 'uuid' })
  user_id: string;

  @Column({ type: 'uuid' })
  company_id: string;

  @Column({ type: 'uuid', nullable: true })
  payroll_pay_group_id?: string | null;

  @Column({ type: 'decimal', precision: 14, scale: 2 })
  regular_salary: string;

  @Column({ type: 'decimal', precision: 14, scale: 2, nullable: true })
  bonus_amount?: string | null;

  @Column({ type: 'varchar', length: 10, default: 'INR', nullable: true })
  currency?: string | null;

  @Column({ type: 'int', default: 2 })
  precision: number;

  @Column({ type: 'varchar', length: 255, nullable: true })
  legal_entity_name?: string | null;

  @Column({ type: 'varchar', length: 255, nullable: true })
  pay_group?: string | null;

  @Column({ type: 'varchar', length: 255, nullable: true })
  salary_configuration_name?: string | null;

  @Column({ type: 'varchar', length: 30, default: 'PENDING' })
  approval_status: string;

  @Column({ type: 'jsonb', nullable: true })
  salary_breakup?: Record<string, any> | null;

  @Column({ type: 'varchar', length: 30, default: 'Annual', nullable: true })
  remuneration_type?: string | null;

  @Column({ type: 'varchar', length: 30, default: 'Monthly', nullable: true })
  pay_cycle?: string | null;

  @Column({ type: 'date' })
  effective_from: string;

  @Column({ type: 'varchar', length: 50, nullable: true })
  salary_structure_type?: string | null;

  @Column({ type: 'uuid', nullable: true })
  payroll_salary_structure_id?: string | null;

  @Column({ type: 'boolean', default: false })
  pf_eligible: boolean;

  @Column({ type: 'boolean', default: false })
  esi_eligible: boolean;

  @Column({ type: 'boolean', default: false })
  lwf_eligible: boolean;

  @Column({ type: 'boolean', default: true })
  is_payroll_enabled: boolean;

  @Column({ type: 'text', nullable: true })
  note?: string | null;

  @Column({ type: 'boolean', default: false })
  is_note_private: boolean;

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

  @ManyToOne(() => PayrollPayGroupEntity, {
    nullable: true,
    onDelete: 'SET NULL',
  })
  @JoinColumn({
    name: 'payroll_pay_group_id',
    referencedColumnName: 'payroll_pay_group_id',
  })
  payroll_pay_group?: PayrollPayGroupEntity | null;

  @ManyToOne(() => PayrollSalaryStructureEntity, {
    nullable: true,
    onDelete: 'SET NULL',
  })
  @JoinColumn({
    name: 'payroll_salary_structure_id',
    referencedColumnName: 'payroll_salary_structure_id',
  })
  salary_structure?: PayrollSalaryStructureEntity | null;
}
