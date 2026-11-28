// src/database/entities/performance-pulse-survey.entity.ts

import { Column, Entity, Index, PrimaryGeneratedColumn } from 'typeorm';
import { SharedEntity } from './shared.entity';
import {
  PulseAudienceType,
  PulseQuestionType,
  PulseSurveyStatus,
} from 'src/common/enum';

/** A question as stored: numbered q1…qn, frozen once the pulse launches. */
export interface PulseQuestion {
  id: string;
  type: PulseQuestionType;
  prompt: string;
  required: boolean;
  scale_min?: number | null;
  scale_max?: number | null;
  options?: string[] | null;
}

/**
 * A short survey HR runs, usually during a review cycle.
 *
 * Who was asked and whether they answered lives in receipts; what they said
 * lives in responses, with nothing joining the two on an anonymous pulse.
 */
@Entity('performance_pulse_surveys')
@Index('idx_pulse_surveys_company_status', ['company_id', 'status'])
export class PerformancePulseSurveyEntity extends SharedEntity {
  @PrimaryGeneratedColumn('uuid')
  performance_pulse_surveys_id: string;

  @Column({ type: 'uuid' })
  company_id: string;

  /** The review cycle it belongs to, if any; required for a cycle audience. */
  @Column({ type: 'uuid', nullable: true })
  cycle_id?: string | null;

  @Column({ type: 'varchar', length: 200 })
  title: string;

  @Column({ type: 'text', nullable: true })
  intro?: string | null;

  @Column({ type: 'boolean', default: true })
  is_anonymous: boolean;

  /** No group smaller than this is reported on an anonymous pulse. */
  @Column({ type: 'int', default: 5 })
  min_group_size: number;

  @Column({ type: 'varchar', length: 20 })
  audience_type: PulseAudienceType;

  @Column({ type: 'jsonb', nullable: true })
  department_ids?: number[] | null;

  @Column({ type: 'jsonb' })
  questions: PulseQuestion[];

  @Column({
    type: 'varchar',
    length: 20,
    default: PulseSurveyStatus.DRAFT,
  })
  status: PulseSurveyStatus;

  @Column({ type: 'date', nullable: true })
  opens_on?: string | null;

  @Column({ type: 'date' })
  closes_on: string;

  @Column({ type: 'timestamptz', nullable: true })
  launched_at?: Date | null;

  @Column({ type: 'uuid', nullable: true })
  launched_by?: string | null;

  @Column({ type: 'timestamptz', nullable: true })
  closed_at?: Date | null;

  @Column({ type: 'uuid', nullable: true })
  closed_by?: string | null;

  /** How many people it was sent to at launch. */
  @Column({ type: 'int', default: 0 })
  invited_count: number;

  @Column({ type: 'uuid' })
  created_by: string;

  @Column({ type: 'int', default: 1 })
  version: number;
}
