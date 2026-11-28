// src/database/entities/performance-pip-decision.entity.ts

import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { SharedEntity } from './shared.entity';
import { ReviewCycleEntity } from './review-cycle.entity';
import { PerformanceFinalRatingEntity } from './performance-final-rating.entity';
import { PerformanceRatingCode, PipCandidateDecision } from 'src/common/enum';

/**
 * What HR decided about a released rating at or below the cycle's PIP
 * threshold — start a PIP, or not, and why.
 *
 * Tied to one *release* of the rating (`release_count`), not to the rating
 * row: if the rating is revoked and released again it is a new number, and a
 * dismissal of the old one must not quietly carry over to it.
 */
@Entity('performance_pip_decisions')
@Index('idx_pip_decisions_cycle', ['cycle_id'])
export class PerformancePipDecisionEntity extends SharedEntity {
  @PrimaryGeneratedColumn('uuid')
  performance_pip_decisions_id: string;

  @Column({ type: 'uuid' })
  company_id: string;

  @Column({ type: 'uuid' })
  cycle_id: string;

  @Column({ type: 'uuid' })
  employee_user_id: string;

  @Column({ type: 'uuid' })
  final_rating_id: string;

  @Column({ type: 'int' })
  release_count: number;

  /** The rating the decision was made about, as released. */
  @Column({ type: 'varchar', length: 20 })
  rating_code: PerformanceRatingCode;

  @Column({ type: 'varchar', length: 20 })
  decision: PipCandidateDecision;

  /** Set when a PIP was started. Cleared if that PIP is later deleted. */
  @Column({ type: 'uuid', nullable: true })
  pip_id?: string | null;

  @Column({ type: 'text', nullable: true })
  note?: string | null;

  @Column({ type: 'uuid' })
  decided_by: string;

  @Column({ type: 'timestamptz' })
  decided_at: Date;

  @ManyToOne(() => ReviewCycleEntity, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'cycle_id' })
  cycle?: ReviewCycleEntity;

  @ManyToOne(() => PerformanceFinalRatingEntity, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'final_rating_id' })
  final_rating?: PerformanceFinalRatingEntity;
}
