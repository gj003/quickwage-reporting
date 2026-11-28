// src/database/entities/performance-pulse-receipt.entity.ts

import { Column, Entity, Index, PrimaryGeneratedColumn } from 'typeorm';
import { SharedEntity } from './shared.entity';

/**
 * One person asked to answer one pulse: whether they have, and when they
 * were last reminded. Holds no answers — those are in the response table,
 * unlinked. Department and manager are copied at launch so completion is
 * reported against the organisation as it was.
 *
 * Dates are kept to the day so a receipt cannot be matched to a response by
 * the moment it was written.
 */
@Entity('performance_pulse_receipts')
@Index('idx_pulse_receipts_user', ['user_id'])
export class PerformancePulseReceiptEntity extends SharedEntity {
  @PrimaryGeneratedColumn('uuid')
  performance_pulse_receipts_id: string;

  @Column({ type: 'uuid' })
  pulse_id: string;

  @Column({ type: 'uuid' })
  company_id: string;

  @Column({ type: 'uuid' })
  user_id: string;

  @Column({ type: 'int', nullable: true })
  department_id?: number | null;

  @Column({ type: 'uuid', nullable: true })
  manager_user_id?: string | null;

  @Column({ type: 'date', nullable: true })
  responded_on?: string | null;

  @Column({ type: 'int', default: 0 })
  reminder_count: number;

  @Column({ type: 'date', nullable: true })
  last_reminded_on?: string | null;
}
