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

@Entity({ name: 'payroll_run_locks' })
@Index('idx_payroll_run_locks_company', ['company_id'])
export class PayrollRunLockEntity extends SharedEntity {
  @PrimaryGeneratedColumn('uuid', { name: 'payroll_run_lock_id' })
  payroll_run_lock_id: string;

  @Column({ type: 'varchar', length: 30, unique: true })
  lock_code: string;

  @Column({ type: 'uuid' }) company_id: string;
  @Column({ type: 'uuid' }) pay_group_id: string;
  @Column({ type: 'date' }) run_start_date: string;
  @Column({ type: 'date' }) run_end_date: string;
  @Column({ type: 'varchar', length: 100, nullable: true })
  calculation_run_id?: string | null;

  @Column({ type: 'varchar', length: 30, default: 'LOCKED' })
  status: string;

  @Column({ type: 'timestamptz', nullable: true }) locked_at?: Date | null;
  @Column({ type: 'uuid', nullable: true }) locked_by?: string | null;

  @Column({ type: 'timestamptz', nullable: true }) rolled_back_at?: Date | null;
  @Column({ type: 'uuid', nullable: true }) rolled_back_by?: string | null;
  @Column({ type: 'text', nullable: true }) rollback_reason?: string | null;
  @Column({ type: 'varchar', length: 20, nullable: true }) rollback_scope?:
    string | null;
  @Column({ type: 'jsonb', nullable: true }) rollback_employee_ids?:
    string[] | null;

  @Column({ type: 'uuid', nullable: true }) created_by?: string | null;
  @Column({ type: 'uuid', nullable: true }) updated_by?: string | null;
  @Column({ type: 'uuid', nullable: true }) deleted_by?: string | null;

  @ManyToOne(() => CompanyEntity, (rel) => rel.id)
  @JoinColumn({ name: 'company_id' })
  company: CompanyEntity;

  @BeforeInsert()
  assignCode() {
    if (!this.lock_code) {
      this.lock_code = generatePrefixedCode('LOCK');
    }
  }
}
