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
import { PayrollRunEntity } from './payroll-run.entity';

@Entity({ name: 'payroll_journal_voucher' })
@Index('idx_payroll_journal_voucher_company', ['company_id'])
@Index(
  'idx_payroll_journal_voucher_legal_period',
  ['company_id', 'legal_entity_id', 'payroll_month'],
  { where: '"deleted_at" IS NULL' },
)
export class PayrollJournalVoucherEntity extends SharedEntity {
  @PrimaryGeneratedColumn('uuid', { name: 'payroll_journal_voucher_id' })
  readonly payroll_journal_voucher_id: string;
  @Column({ type: 'varchar', length: 50 }) voucher_code: string;
  @Column({ type: 'uuid' }) company_id: string;
  @Column({ type: 'uuid' }) legal_entity_id: string;
  @Column({ type: 'uuid' }) payroll_run_id: string;
  @Column({ type: 'varchar', length: 7 }) payroll_month: string;
  @Column({ type: 'varchar', length: 20 }) financial_year: string;
  @Column({ type: 'varchar', length: 20, default: 'TALLY' }) provider: string;
  @Column({ type: 'boolean', default: true }) is_current: boolean;
  @Column({ type: 'integer', default: 1 }) generation_number: number;
  @Column({ type: 'varchar', length: 30, default: 'GENERATED' }) status: string;
  @Column({ type: 'timestamptz', nullable: true }) archived_at?: Date | null;
  @Column({ type: 'uuid', nullable: true }) archived_by?: string | null;
  @Column({ type: 'varchar', length: 120, nullable: true })
  zoho_journal_id?: string | null;
  @Column({ type: 'varchar', length: 120, nullable: true })
  zoho_journal_number?: string | null;
  @Column({ type: 'decimal', precision: 16, scale: 2 }) total_debit: string;
  @Column({ type: 'decimal', precision: 16, scale: 2 }) total_credit: string;
  @Column({ type: 'decimal', precision: 16, scale: 2, default: 0 })
  difference: string;
  @Column({ type: 'boolean', default: false }) is_balanced: boolean;
  @Column({ type: 'boolean', default: true }) mapping_valid: boolean;
  @Column({ type: 'jsonb', default: () => "'[]'::jsonb" })
  unmapped_components: Array<Record<string, unknown>>;
  @Column({ type: 'timestamptz', nullable: true }) generated_at?: Date | null;
  @Column({ type: 'timestamptz', nullable: true })
  source_payroll_locked_at?: Date | null;
  @Column({ type: 'timestamptz', nullable: true })
  source_payroll_finalized_at?: Date | null;
  @Column({ type: 'jsonb', default: () => "'[]'::jsonb" }) entries: Array<
    Record<string, unknown>
  >;
  @Column({ type: 'uuid', nullable: true }) created_by?: string | null;
  @Column({ type: 'uuid', nullable: true }) updated_by?: string | null;
  @ManyToOne(() => CompanyEntity, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'company_id', referencedColumnName: 'id' })
  company: CompanyEntity;
  @ManyToOne(() => LegalEntity, { onDelete: 'RESTRICT' })
  @JoinColumn({
    name: 'legal_entity_id',
    referencedColumnName: 'legal_entity_id',
  })
  legal_entity: LegalEntity;
  @ManyToOne(() => PayrollRunEntity, { onDelete: 'RESTRICT' })
  @JoinColumn({
    name: 'payroll_run_id',
    referencedColumnName: 'payroll_run_id',
  })
  payroll_run: PayrollRunEntity;
  @BeforeInsert() assignCode() {
    if (!this.voucher_code) this.voucher_code = generatePrefixedCode('PAY_JV');
  }
}
