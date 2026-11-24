import {
  BeforeInsert,
  Column,
  Entity,
  Index,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { BaseEntityColumns } from './base-entity-columns.entity';
import { generatePrefixedCode } from 'src/common/utility';

@Entity({ name: 'helpdesk_report_schedules' })
@Index('idx_helpdesk_report_schedules_org', ['organizationId'])
export class HelpdeskReportScheduleEntity extends BaseEntityColumns {
  @PrimaryGeneratedColumn('uuid', { name: 'helpdesk_report_schedule_id' })
  helpdeskReportScheduleId: string;

  @Column({ type: 'uuid', name: 'organization_id' })
  organizationId: string;

  @Column({ type: 'varchar', name: 'schedule_code', length: 30, unique: true })
  scheduleCode: string;

  @Column({ type: 'varchar', name: 'report_type' })
  reportType: string;

  @Column({ type: 'jsonb', name: 'saved_filters', nullable: true })
  savedFilters?: Record<string, any> | null;

  @Column({ type: 'varchar' })
  frequency: string;

  @Column({ type: 'varchar', nullable: true })
  cron?: string | null;

  @Column({ type: 'varchar', array: true, default: '{}' })
  recipients: string[];

  @Column({ type: 'boolean', name: 'is_active', default: true })
  isActive: boolean;

  @Column({ type: 'uuid', name: 'created_by_user_id' })
  createdByUserId: string;

  @Column({ type: 'timestamptz', name: 'last_run_at', nullable: true })
  lastRunAt?: Date | null;

  @Column({ type: 'timestamptz', name: 'next_run_at', nullable: true })
  nextRunAt?: Date | null;

  @Column({ type: 'varchar', default: 'CSV' })
  format: string;

  @BeforeInsert()
  assignCode(): void {
    if (!this.scheduleCode) {
      this.scheduleCode = generatePrefixedCode('HDRPT');
    }
  }
}
