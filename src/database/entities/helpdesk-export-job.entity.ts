import {
  BeforeInsert,
  Column,
  Entity,
  Index,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { BaseEntityColumns } from 'src/database/entities/base-entity-columns.entity';
import { generatePrefixedCode } from 'src/common/utility';

@Entity({ name: 'helpdesk_export_jobs' })
@Index('idx_helpdesk_export_jobs_status', ['status'])
@Index('idx_helpdesk_export_jobs_created_at', ['created_at'])
export class HelpdeskExportJobEntity extends BaseEntityColumns {
  @PrimaryGeneratedColumn('uuid', { name: 'helpdesk_export_job_id' })
  helpdeskExportJobId: string;

  @Column({ type: 'varchar', name: 'export_code', unique: true })
  exportCode: string;

  @Column({ type: 'uuid', name: 'requested_by_employee_id' })
  requestedByEmployeeId: string;

  @Column({ type: 'jsonb', name: 'filters_json', default: () => "'{}'" })
  filtersJson: Record<string, unknown>;

  @Column({ type: 'varchar' })
  format: string;

  @Column({ type: 'varchar', name: 'delivery_method' })
  deliveryMethod: string;

  @Column({ type: 'varchar' })
  status: string;

  @Column({ type: 'varchar', name: 'file_path', nullable: true })
  filePath?: string | null;

  @Column({ type: 'timestamptz', name: 'scheduled_at', nullable: true })
  scheduledAt?: Date | null;

  @Column({ type: 'timestamptz', name: 'processed_at', nullable: true })
  processedAt?: Date | null;

  @BeforeInsert()
  assignExportCode(): void {
    if (!this.exportCode) {
      this.exportCode = generatePrefixedCode('HDRPT');
    }
  }
}
