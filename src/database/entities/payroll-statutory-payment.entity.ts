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

@Entity({ name: 'payroll_statutory_payments' })
@Index('idx_payroll_statutory_payments_company', ['company_id'])
export class PayrollStatutoryPaymentEntity extends SharedEntity {
  @PrimaryGeneratedColumn('uuid', { name: 'payroll_statutory_payment_id' })
  payroll_statutory_payment_id: string;

  @Column({ type: 'varchar', length: 30, unique: true })
  payment_code: string;

  @Column({ type: 'uuid' }) company_id: string;
  @Column({ type: 'uuid' }) pay_group_id: string;
  @Column({ type: 'date' }) run_start_date: string;
  @Column({ type: 'date' }) run_end_date: string;
  @Column({ type: 'varchar', length: 100, nullable: true })
  calculation_run_id?: string | null;

  @Column({ type: 'varchar', length: 20 }) statutory_type: string;
  @Column({ type: 'varchar', length: 120, nullable: true }) reference_id?:
    string | null;

  @Column({ type: 'numeric', default: 0 }) total_amount: number;
  @Column({ type: 'int', default: 0 }) total_employees: number;

  @Column({ type: 'varchar', length: 20, default: 'PENDING' })
  status: string;

  @Column({ type: 'timestamptz', nullable: true }) paid_at?: Date | null;
  @Column({ type: 'uuid', nullable: true }) paid_by?: string | null;
  @Column({ type: 'varchar', length: 120, nullable: true }) challan_reference?:
    string | null;

  @Column({ type: 'uuid', nullable: true }) created_by?: string | null;
  @Column({ type: 'uuid', nullable: true }) updated_by?: string | null;
  @Column({ type: 'uuid', nullable: true }) deleted_by?: string | null;

  @ManyToOne(() => CompanyEntity, (rel) => rel.id)
  @JoinColumn({ name: 'company_id' })
  company: CompanyEntity;

  @BeforeInsert()
  assignCode() {
    if (!this.payment_code) {
      this.payment_code = generatePrefixedCode('STAT_PAY');
    }
  }
}
