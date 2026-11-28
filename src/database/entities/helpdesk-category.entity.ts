import {
  BeforeInsert,
  Column,
  Entity,
  Index,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { BaseEntityColumns } from './base-entity-columns.entity';
import { generatePrefixedCode } from 'src/common/utility';

@Entity({ name: 'helpdesk_categories' })
@Index('idx_helpdesk_categories_org', ['organizationId'])
export class HelpdeskCategoryEntity extends BaseEntityColumns {
  @PrimaryGeneratedColumn('uuid', { name: 'helpdesk_category_id' })
  helpdeskCategoryId: string;

  @Column({ type: 'uuid', name: 'organization_id' })
  organizationId: string;

  @Column({ type: 'varchar', name: 'category_code', length: 30, unique: true })
  categoryCode: string;

  @Column({ type: 'varchar', length: 120 })
  name: string;

  @Column({ type: 'text', nullable: true })
  description?: string | null;

  @Column({ type: 'varchar', name: 'default_priority', default: 'MEDIUM' })
  defaultPriority: string;

  @Column({ type: 'boolean', name: 'is_active', default: true })
  isActive: boolean;

  @Column({ type: 'uuid', name: 'business_hour_id', nullable: true })
  businessHourId?: string | null;

  @Column({ type: 'uuid', name: 'category_head_employee_id', nullable: true })
  categoryHeadEmployeeId?: string | null;

  @Column({ type: 'jsonb', name: 'audience', default: () => "'{}'::jsonb" })
  audience: Record<string, any>;

  @Column({ type: 'jsonb', name: 'assignees', default: () => "'[]'::jsonb" })
  assignees: Array<Record<string, any>>;

  @Column({
    type: 'jsonb',
    name: 'sub_categories',
    default: () => "'[]'::jsonb",
  })
  subCategories: Array<Record<string, any>>;

  @Column({
    type: 'boolean',
    name: 'split_category_enabled',
    default: false,
  })
  splitCategoryEnabled: boolean;

  @Column({
    type: 'boolean',
    name: 'ticket_prioritization_enabled',
    default: false,
  })
  ticketPrioritizationEnabled: boolean;

  @Column({
    type: 'jsonb',
    name: 'priority_settings',
    default: () => "'[]'::jsonb",
  })
  prioritySettings: Array<Record<string, any>>;

  @Column({
    type: 'jsonb',
    name: 'escalation',
    default: () => "'{}'::jsonb",
  })
  escalation: Record<string, any>;

  @Column({ type: 'boolean', name: 'on_hold_enabled', default: false })
  onHoldEnabled: boolean;

  @Column({ type: 'boolean', name: 'reopen_enabled', default: false })
  reopenEnabled: boolean;

  @Column({ type: 'int', name: 'first_response_target', default: 24 })
  firstResponseTarget: number;

  @Column({ type: 'int', name: 'resolution_target', default: 72 })
  resolutionTarget: number;

  @Column({ type: 'varchar', name: 'sla_unit', default: 'HOURS' })
  slaUnit: string;

  @BeforeInsert()
  assignCode(): void {
    if (!this.categoryCode) {
      this.categoryCode = generatePrefixedCode('HDCAT');
    }
  }
}
