import { Column, Entity, Index, PrimaryGeneratedColumn } from 'typeorm';
import { BaseEntityColumns } from './base-entity-columns.entity';

@Entity({ name: 'payroll_import_jobs' })
@Index('idx_payroll_import_jobs_org_status', ['organization_id', 'status'])
@Index('idx_payroll_import_jobs_created_at', ['created_at'])
export class PayrollImportJobEntity extends BaseEntityColumns {
  @PrimaryGeneratedColumn('uuid', { name: 'payroll_import_job_id' })
  payroll_import_job_id: string;

  @Column({ type: 'uuid' })
  organization_id: string;

  @Column({ type: 'uuid' })
  requested_by: string;

  @Column({ type: 'varchar' })
  import_type: string;

  @Column({ type: 'varchar' })
  status: string;

  @Column({ type: 'text' })
  source_s3_url: string;

  @Column({ type: 'integer', default: 0 })
  total_rows: number;

  @Column({ type: 'jsonb', default: () => "'[]'" })
  parsed_rows: Record<string, any>[];

  @Column({ type: 'jsonb', nullable: true })
  context?: Record<string, any> | null;

  @Column({ type: 'jsonb', nullable: true })
  result?: Record<string, any> | null;

  @Column({ type: 'text', nullable: true })
  error_message?: string | null;

  @Column({ type: 'timestamptz', nullable: true })
  queued_at?: Date | null;

  @Column({ type: 'timestamptz', nullable: true })
  started_at?: Date | null;

  @Column({ type: 'timestamptz', nullable: true })
  completed_at?: Date | null;
}
