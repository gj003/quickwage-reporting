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
import { PayrollRunEntity } from './payroll-run.entity';

@Entity({ name: 'payroll_run_step_status' })
@Index('idx_payroll_run_step_status_company', ['company_id'])
@Index('IDX_payroll_run_step_status_scope', [
  'company_id',
  'pay_group_id',
  'run_start_date',
  'run_end_date',
])
export class PayrollRunStepStatusEntity extends SharedEntity {
  @PrimaryGeneratedColumn('uuid', { name: 'payroll_run_step_status_id' })
  payroll_run_step_status_id: string;

  @Column({ type: 'uuid' }) company_id: string;
  @Column({ type: 'uuid' }) pay_group_id: string;
  @Column({ type: 'date' }) run_start_date: string;
  @Column({ type: 'date' }) run_end_date: string;
  // Set only when this step status belongs to a specific off-cycle payroll
  // run, so an off-cycle run's wizard steps track completion independently
  // of the regular monthly cycle even when their periods overlap.
  @Column({ type: 'uuid', nullable: true }) payroll_run_id?: string | null;
  @Column({ type: 'varchar', length: 60 }) step_key: string;
  @Column({ type: 'varchar', length: 20, default: 'COMPLETED' }) status: string;
  @Column({ type: 'timestamptz', nullable: true }) completed_at?: Date | null;
  @Column({ type: 'uuid', nullable: true }) completed_by?: string | null;
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
}
