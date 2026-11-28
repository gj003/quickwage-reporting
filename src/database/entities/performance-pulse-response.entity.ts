// src/database/entities/performance-pulse-response.entity.ts

import { Column, Entity, Index, PrimaryGeneratedColumn } from 'typeorm';

export type PulseAnswerValue = number | string | string[];

/**
 * One set of answers to a pulse.
 *
 * On an anonymous pulse this row carries no person: no user, no receipt, and
 * no timestamp — deliberately not a SharedEntity, whose created_at would
 * record the moment of answering and let the row be matched to its receipt.
 * Department and manager are kept only so results can be broken down, and
 * are only ever reported for groups above the pulse's minimum size.
 */
@Entity('performance_pulse_responses')
@Index('idx_pulse_responses_pulse', ['pulse_id'])
export class PerformancePulseResponseEntity {
  @PrimaryGeneratedColumn('uuid')
  performance_pulse_responses_id: string;

  @Column({ type: 'uuid' })
  pulse_id: string;

  @Column({ type: 'uuid' })
  company_id: string;

  /** Named pulses only. Always null on an anonymous pulse. */
  @Column({ type: 'uuid', nullable: true })
  respondent_user_id?: string | null;

  @Column({ type: 'int', nullable: true })
  department_id?: number | null;

  @Column({ type: 'uuid', nullable: true })
  manager_user_id?: string | null;

  /** Question id → answer. */
  @Column({ type: 'jsonb' })
  answers: Record<string, PulseAnswerValue>;

  @Column({ type: 'date' })
  submitted_on: string;
}
