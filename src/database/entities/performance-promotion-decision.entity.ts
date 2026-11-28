// src/database/entities/performance-promotion-decision.entity.ts

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
import { ManagerReviewEntity } from './manager-review.entity';
import { PromotionDecisionOutcome, PromotionReadiness } from 'src/common/enum';

/**
 * HR's decision on a manager's promotion recommendation.
 *
 * Keeps a copy of the recommendation it answered — readiness and the
 * designations either side — because the recommendation lives on the manager
 * review, and a reopened review can change it. A decision whose copy no
 * longer matches the review is out of date, and HR decides again; rows are
 * never overwritten, so the history of decisions survives.
 *
 * An approval is a record with an effective date; PromotionApplicationService
 * moves it onto the job record when that date arrives.
 */
@Entity('performance_promotion_decisions')
@Index('idx_promotion_decisions_review', ['manager_review_id', 'decided_at'])
@Index('idx_promotion_decisions_cycle', ['cycle_id'])
export class PerformancePromotionDecisionEntity extends SharedEntity {
  @PrimaryGeneratedColumn('uuid')
  performance_promotion_decisions_id: string;

  @Column({ type: 'uuid' })
  company_id: string;

  @Column({ type: 'uuid' })
  cycle_id: string;

  @Column({ type: 'uuid' })
  employee_user_id: string;

  @Column({ type: 'uuid' })
  manager_review_id: string;

  @Column({ type: 'varchar', length: 20 })
  readiness: PromotionReadiness;

  /** The employee's designation when HR decided. Null if none was on record. */
  @Column({ type: 'int', nullable: true })
  current_designation_id?: number | null;

  @Column({ type: 'int' })
  proposed_designation_id: number;

  @Column({ type: 'varchar', length: 20 })
  decision: PromotionDecisionOutcome;

  /** Required for an approval. */
  @Column({ type: 'date', nullable: true })
  effective_date?: string | null;

  @Column({ type: 'text' })
  note: string;

  @Column({ type: 'uuid' })
  decided_by: string;

  @Column({ type: 'timestamptz' })
  decided_at: Date;

  @ManyToOne(() => ReviewCycleEntity, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'cycle_id' })
  cycle?: ReviewCycleEntity;

  @ManyToOne(() => ManagerReviewEntity, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'manager_review_id' })
  manager_review?: ManagerReviewEntity;
}
