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
import { PayrollTdsChallanEntity } from './payroll-tds-challan.entity';
import { UserEntity } from './user.entity';

@Entity({ name: 'payroll_tds_challan_employee' })
@Index('idx_payroll_tds_challan_employee_company', ['company_id'])
@Index('idx_payroll_tds_challan_employee_challan', ['payroll_tds_challan_id'])
@Index(
  'uq_payroll_tds_challan_employee_active',
  ['company_id', 'payroll_tds_challan_id', 'employee_id'],
  { unique: true, where: '"deleted_at" IS NULL' },
)
export class PayrollTdsChallanEmployeeEntity extends SharedEntity {
  @PrimaryGeneratedColumn('uuid', { name: 'payroll_tds_challan_employee_id' })
  readonly payroll_tds_challan_employee_id: string;
  @Column({ type: 'uuid' }) company_id: string;
  @Column({ type: 'uuid' }) payroll_tds_challan_id: string;
  @Column({ type: 'uuid' }) employee_id: string;
  @Column({ type: 'decimal', precision: 16, scale: 2, default: 0 })
  income_tax: string;
  @Column({ type: 'decimal', precision: 16, scale: 2, default: 0 })
  surcharge: string;
  @Column({ type: 'decimal', precision: 16, scale: 2, default: 0 })
  education_cess: string;
  @Column({ type: 'uuid', nullable: true }) created_by?: string | null;
  @Column({ type: 'uuid', nullable: true }) updated_by?: string | null;
  @ManyToOne(() => CompanyEntity, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'company_id', referencedColumnName: 'id' })
  company: CompanyEntity;
  @ManyToOne(() => PayrollTdsChallanEntity, { onDelete: 'CASCADE' })
  @JoinColumn({
    name: 'payroll_tds_challan_id',
    referencedColumnName: 'payroll_tds_challan_id',
  })
  challan: PayrollTdsChallanEntity;
  @ManyToOne(() => UserEntity, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'employee_id', referencedColumnName: 'user_id' })
  employee: UserEntity;
}
