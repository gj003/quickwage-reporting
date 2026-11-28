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
import { PayrollRunEntity } from './payroll-run.entity';

@Entity({ name: 'payroll_payment_batches' })
@Index('idx_payroll_payment_batches_company', ['company_id'])
@Index('idx_payroll_payment_batches_run', ['payroll_run_id'], {
  where: '"deleted_at" IS NULL',
})
export class PayrollPaymentBatchEntity extends SharedEntity {
  @PrimaryGeneratedColumn('uuid', { name: 'payroll_payment_batch_id' })
  payroll_payment_batch_id: string;

  @Column({ type: 'varchar', length: 30, unique: true })
  batch_code: string;

  @Column({ type: 'uuid' }) company_id: string;
  @Column({ type: 'uuid' }) pay_group_id: string;
  @Column({ type: 'date' }) run_start_date: string;
  @Column({ type: 'date' }) run_end_date: string;
  // Set only for batches created off an off-cycle payroll run; null for the
  // regular monthly cycle's batches.
  @Column({ type: 'uuid', nullable: true }) payroll_run_id?: string | null;

  @Column({ type: 'varchar', length: 150 }) batch_name: string;
  @Column({ type: 'text', nullable: true }) description?: string | null;

  @Column({ type: 'varchar', length: 30, default: 'BANK_TRANSFER' })
  payment_mode: string;

  @Column({ type: 'varchar', length: 60, nullable: true }) account_number?:
    string | null;
  @Column({ type: 'varchar', length: 150, nullable: true }) bank_name?:
    string | null;
  @Column({ type: 'varchar', length: 30, nullable: true }) ifsc_code?:
    string | null;

  @Column({ type: 'numeric', default: 0 }) total_amount: number;
  @Column({ type: 'int', default: 0 }) total_employees: number;

  @Column({ type: 'varchar', length: 20, default: 'NOT_PAID' })
  status: string;

  @Column({ type: 'timestamptz', nullable: true }) paid_at?: Date | null;
  @Column({ type: 'uuid', nullable: true }) paid_by?: string | null;

  @Column({ type: 'boolean', default: false }) is_default: boolean;

  @Column({ type: 'uuid', nullable: true }) created_by?: string | null;
  @Column({ type: 'uuid', nullable: true }) updated_by?: string | null;
  @Column({ type: 'uuid', nullable: true }) deleted_by?: string | null;

  @ManyToOne(() => CompanyEntity, (rel) => rel.id)
  @JoinColumn({ name: 'company_id' })
  company: CompanyEntity;

  @ManyToOne(() => PayrollRunEntity, { nullable: true, onDelete: 'SET NULL' })
  @JoinColumn({
    name: 'payroll_run_id',
    referencedColumnName: 'payroll_run_id',
  })
  payroll_run?: PayrollRunEntity | null;

  @BeforeInsert()
  assignCode() {
    if (!this.batch_code) {
      this.batch_code = generatePrefixedCode('BATCH');
    }
  }
}
