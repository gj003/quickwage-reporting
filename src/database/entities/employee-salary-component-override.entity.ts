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
import { PayrollSalaryComponentEntity } from './payroll-salary-component.entity';
import { PayrollSalaryStructureEntity } from './payroll-salary-structure.entity';

@Entity({ name: 'employee_salary_component_override' })
@Index('idx_salary_component_override_company', ['company_id'])
@Index(
  'idx_salary_component_override_employee_period',
  ['company_id', 'user_id', 'effective_from', 'effective_to'],
  { where: '"deleted_at" IS NULL' },
)
@Index(
  'idx_salary_component_override_component_period',
  ['company_id', 'payroll_salary_component_id', 'effective_from'],
  { where: '"deleted_at" IS NULL' },
)
export class EmployeeSalaryComponentOverrideEntity extends SharedEntity {
  @PrimaryGeneratedColumn('uuid', {
    name: 'employee_salary_component_override_id',
  })
  readonly employee_salary_component_override_id: string;

  @Column({ type: 'uuid' }) company_id: string;
  @Column({ type: 'uuid' }) user_id: string;
  @Column({ type: 'uuid' }) payroll_salary_structure_id: string;
  @Column({ type: 'uuid' }) payroll_salary_component_id: string;
  @Column({ type: 'decimal', precision: 14, scale: 2 }) amount: string;
  @Column({ type: 'date' }) effective_from: string;
  @Column({ type: 'date', nullable: true }) effective_to?: string | null;
  @Column({ type: 'varchar', length: 30, default: 'ACTIVE' }) status: string;
  @Column({ type: 'varchar', length: 1000, nullable: true }) note?:
    string | null;
  @Column({ type: 'uuid', nullable: true }) created_by?: string | null;
  @Column({ type: 'uuid', nullable: true }) updated_by?: string | null;

  @ManyToOne(() => CompanyEntity, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'company_id', referencedColumnName: 'id' })
  company: CompanyEntity;

  @ManyToOne(() => UserEntity, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'user_id', referencedColumnName: 'user_id' })
  employee: UserEntity;

  @ManyToOne(() => PayrollSalaryStructureEntity, { onDelete: 'RESTRICT' })
  @JoinColumn({
    name: 'payroll_salary_structure_id',
    referencedColumnName: 'payroll_salary_structure_id',
  })
  salary_structure: PayrollSalaryStructureEntity;

  @ManyToOne(() => PayrollSalaryComponentEntity, { onDelete: 'RESTRICT' })
  @JoinColumn({
    name: 'payroll_salary_component_id',
    referencedColumnName: 'payroll_salary_component_id',
  })
  salary_component: PayrollSalaryComponentEntity;
}
