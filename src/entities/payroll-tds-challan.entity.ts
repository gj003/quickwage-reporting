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
import { PayrollPayGroupEntity } from './payroll-pay-group.entity';

@Entity({ name: 'payroll_tds_challan' })
@Index('idx_payroll_tds_challan_company', ['company_id'])
@Index(
  'idx_payroll_tds_challan_period',
  ['company_id', 'financial_year', 'payroll_month'],
  { where: '"deleted_at" IS NULL' },
)
export class PayrollTdsChallanEntity extends SharedEntity {
  @PrimaryGeneratedColumn('uuid', { name: 'payroll_tds_challan_id' })
  readonly payroll_tds_challan_id: string;
  @Column({ type: 'varchar', length: 30 }) challan_code: string;
  @Column({ type: 'uuid' }) company_id: string;
  @Column({ type: 'uuid', nullable: true }) pay_group_id?: string | null;
  @Column({ type: 'varchar', length: 7 }) payroll_month: string;
  @Column({ type: 'varchar', length: 20 }) financial_year: string;
  @Column({ type: 'varchar', length: 40 }) minor_head_code: string;
  @Column({ type: 'date' }) tax_deducted_on: string;
  @Column({ type: 'varchar', length: 60, nullable: true }) challan_serial_no?:
    string | null;
  @Column({ type: 'date', nullable: true }) payment_date?: string | null;
  @Column({ type: 'varchar', length: 30, nullable: true }) bsr_branch_code?:
    string | null;
  @Column({ type: 'varchar', length: 255, nullable: true }) bank_name?:
    string | null;
  @Column({ type: 'decimal', precision: 16, scale: 2, default: 0 })
  income_tax: string;
  @Column({ type: 'decimal', precision: 16, scale: 2, default: 0 })
  surcharge: string;
  @Column({ type: 'decimal', precision: 16, scale: 2, default: 0 })
  education_cess: string;
  @Column({ type: 'decimal', precision: 16, scale: 2, default: 0 })
  interest: string;
  @Column({ type: 'decimal', precision: 16, scale: 2, default: 0 })
  penalty: string;
  @Column({ type: 'decimal', precision: 16, scale: 2, default: 0 })
  others: string;
  @Column({ type: 'decimal', precision: 16, scale: 2, default: 0 })
  total_amount: string;
  @Column({ type: 'varchar', length: 20, default: 'ACTIVE' }) status: string;
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
  @BeforeInsert() assignCode() {
    if (!this.challan_code) this.challan_code = generatePrefixedCode('TDS_CH');
  }
}
