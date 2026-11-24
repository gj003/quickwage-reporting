import { Column, Entity, Index, PrimaryGeneratedColumn } from 'typeorm';
import { SharedEntity } from './shared.entity';

@Entity({ name: 'payroll_accounting_sync_history' })
@Index('idx_payroll_accounting_sync_history_company_provider', [
  'company_id',
  'provider',
  'created_at',
])
export class PayrollAccountingSyncHistoryEntity extends SharedEntity {
  @PrimaryGeneratedColumn('uuid', {
    name: 'payroll_accounting_sync_history_id',
  })
  readonly payroll_accounting_sync_history_id: string;
  @Column({ type: 'uuid' }) company_id: string;
  @Column({ type: 'varchar', length: 30 }) provider: string;
  @Column({ type: 'varchar', length: 30 }) operation: string;
  @Column({ type: 'varchar', length: 20 }) status: string;
  @Column({ type: 'integer', default: 0 }) record_count: number;
  @Column({ type: 'uuid', nullable: true }) voucher_id?: string | null;
  @Column({ type: 'varchar', length: 255, nullable: true })
  external_reference?: string | null;
  @Column({ type: 'text', nullable: true }) error_message?: string | null;
  @Column({ type: 'uuid', nullable: true }) created_by?: string | null;
}
