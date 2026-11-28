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
import { PayrollPayGroupEntity } from './payroll-pay-group.entity';
@Entity({ name: 'payroll_statutory_return' })
@Index('idx_payroll_statutory_return_company', ['company_id'])
@Index(
  'idx_payroll_statutory_return_period',
  ['company_id', 'financial_year', 'quarter'],
  { where: '"deleted_at" IS NULL' },
)
export class PayrollStatutoryReturnEntity extends SharedEntity {
  @PrimaryGeneratedColumn('uuid', { name: 'payroll_statutory_return_id' })
  readonly payroll_statutory_return_id: string;
  @Column({ type: 'uuid' }) company_id: string;
  @Column({ type: 'uuid', nullable: true }) pay_group_id?: string | null;
  @Column({ type: 'varchar', length: 20 }) financial_year: string;
  @Column({ type: 'varchar', length: 5 }) quarter: string;
  @Column({ type: 'varchar', length: 30, default: 'VALIDATED' }) status: string;
  @Column({ type: 'jsonb', default: () => "'{}'::jsonb" }) summary: Record<
    string,
    unknown
  >;
  @Column({ type: 'varchar', length: 100, nullable: true }) file_document_id?:
    string | null;
  @Column({ type: 'text', nullable: true }) file_storage_url?: string | null;
  @Column({ type: 'boolean', default: false }) include_nil_tds_return: boolean;
  @Column({ type: 'boolean', default: false })
  exclude_zero_gross_earning: boolean;
  @Column({ type: 'varchar', length: 50, nullable: true }) deductor_type?:
    string | null;
  @Column({ type: 'varchar', length: 60, nullable: true })
  payment_section_code?: string | null;
  @Column({ type: 'varchar', length: 60, nullable: true })
  previous_token_number?: string | null;
  @Column({ type: 'varchar', length: 100, nullable: true })
  csi_file_document_id?: string | null;
  @Column({ type: 'text', nullable: true }) csi_file_storage_url?:
    string | null;
  @Column({ type: 'jsonb', default: () => "'{}'::jsonb" })
  deductor_details: Record<string, unknown>;
  @Column({ type: 'jsonb', default: () => "'{}'::jsonb" })
  responsible_person_details: Record<string, unknown>;
  @Column({ type: 'uuid', nullable: true }) created_by?: string | null;
  @Column({ type: 'uuid', nullable: true }) updated_by?: string | null;
  @ManyToOne(() => CompanyEntity, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'company_id', referencedColumnName: 'id' })
  company: CompanyEntity;
  @ManyToOne(() => PayrollPayGroupEntity, {
    nullable: true,
    onDelete: 'SET NULL',
  })
  @JoinColumn({
    name: 'pay_group_id',
    referencedColumnName: 'payroll_pay_group_id',
  })
  pay_group?: PayrollPayGroupEntity | null;
}
