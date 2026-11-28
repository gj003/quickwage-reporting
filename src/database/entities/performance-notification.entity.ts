// src/database/entities/performance-notification.entity.ts

import { Column, Entity, Index, PrimaryGeneratedColumn } from 'typeorm';
import {
  PerformanceNotificationStatus,
  PerformanceNotificationTemplateSource,
} from 'src/common/enum';
import { SharedEntity } from './shared.entity';

/**
 * One performance notification to one person — or, when nobody was told, one
 * row saying why (the trigger is off, or there was nobody to tell).
 *
 * Holds which template was used, never the email itself. The unique index
 * means the same notification about the same item reaches the same person at
 * most once a day, however often the event fires.
 */
@Entity('performance_notifications')
@Index('idx_performance_notifications_company_day', ['company_id', 'notify_on'])
@Index('idx_performance_notifications_entity', ['entity_id'])
@Index('idx_performance_notifications_recipient', ['recipient_user_id'])
@Index(
  'uq_performance_notifications_once_a_day',
  ['company_id', 'trigger_key', 'entity_id', 'recipient_user_id', 'notify_on'],
  {
    unique: true,
    where: '"recipient_user_id" IS NOT NULL AND "deleted_at" IS NULL',
  },
)
export class PerformanceNotificationEntity extends SharedEntity {
  @PrimaryGeneratedColumn('uuid')
  performance_notifications_id: string;

  @Column({ type: 'uuid' })
  company_id: string;

  @Column({ type: 'varchar', length: 80 })
  trigger_key: string;

  @Column({ type: 'varchar', length: 40 })
  entity_type: string;

  @Column({ type: 'uuid' })
  entity_id: string;

  @Column({ type: 'uuid', nullable: true })
  cycle_id?: string | null;

  /** Null on a DISABLED or NO_RECIPIENT row. */
  @Column({ type: 'uuid', nullable: true })
  recipient_user_id?: string | null;

  @Column({ type: 'date' })
  notify_on: string;

  @Column({ type: 'varchar', length: 20 })
  status: PerformanceNotificationStatus;

  @Column({ type: 'varchar', length: 10, nullable: true })
  template_source?: PerformanceNotificationTemplateSource | null;

  @Column({ type: 'varchar', length: 300, nullable: true })
  error?: string | null;
}
