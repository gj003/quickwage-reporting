import {
  BeforeInsert,
  Column,
  Entity,
  Index,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { BaseEntityColumns } from './base-entity-columns.entity';
import { generatePrefixedCode } from 'src/common/utility';

@Entity({ name: 'helpdesk_business_hours' })
@Index('idx_helpdesk_business_hours_org', ['organizationId'])
export class HelpdeskBusinessHourEntity extends BaseEntityColumns {
  @PrimaryGeneratedColumn('uuid', { name: 'helpdesk_business_hour_id' })
  helpdeskBusinessHourId: string;

  @Column({ type: 'uuid', name: 'organization_id' })
  organizationId: string;

  @Column({
    type: 'varchar',
    name: 'business_hour_code',
    length: 30,
    unique: true,
  })
  businessHourCode: string;

  @Column({ type: 'varchar', length: 120 })
  name: string;

  @Column({ type: 'varchar', default: 'UTC' })
  timezone: string;

  @Column({ type: 'boolean', name: 'is_default', default: false })
  isDefault: boolean;

  @Column({ type: 'boolean', name: 'is_24x7', default: true })
  is24x7: boolean;

  @Column({ type: 'jsonb', name: 'weekly_schedule', nullable: true })
  weeklySchedule?: Record<
    string,
    { start: string; end: string; is_off: boolean }
  > | null;

  @Column({ type: 'jsonb', name: 'holidays', nullable: true })
  holidays?: Array<{ date: string; label: string }> | null;

  @Column({ type: 'boolean', name: 'is_active', default: true })
  isActive: boolean;

  @BeforeInsert()
  assignCode(): void {
    if (!this.businessHourCode) {
      this.businessHourCode = generatePrefixedCode('HDBH');
    }
  }
}
