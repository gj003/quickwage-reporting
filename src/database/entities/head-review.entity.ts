// src/database/entities/head-review.entity.ts

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
import {
  HeadReviewStatus,
  PerformanceRatingCode,
  ReviewerAssociationType,
} from 'src/common/enum';

/**
 * A department head's or business head's review of one employee in one cycle.
 *
 * Kept apart from `manager_reviews`, which holds exactly one row per employee
 * per cycle and feeds calibration; a head review is an additional opinion and
 * never replaces the manager's rating.
 */
@Entity('head_reviews')
@Index(
  'uq_head_reviews_cycle_employee_type',
  ['performance_review_cycles_id', 'employee_user_id', 'reviewer_type'],
  { unique: true, where: '"deleted_at" IS NULL' },
)
@Index('idx_head_reviews_reviewer', ['reviewer_user_id'])
export class HeadReviewEntity extends SharedEntity {
  @PrimaryGeneratedColumn('uuid')
  head_reviews_id: string;

  @Column({ type: 'uuid' })
  company_id: string;

  @Column({ type: 'uuid' })
  performance_review_cycles_id: string;

  @Column({ type: 'uuid' })
  employee_user_id: string;

  @Column({ type: 'uuid' })
  reviewer_user_id: string;

  /** DEPARTMENT_HEAD or BUSINESS_HEAD. */
  @Column({ type: 'varchar', length: 50 })
  reviewer_type: ReviewerAssociationType;

  @Column({ type: 'varchar', length: 30, nullable: true })
  overall_rating?: PerformanceRatingCode | null;

  @Column({ type: 'text', nullable: true })
  comment?: string | null;

  @Column({ type: 'date', nullable: true })
  due_date?: string | null;

  @Column({ type: 'varchar', length: 20, default: HeadReviewStatus.DRAFT })
  status: HeadReviewStatus;

  @Column({ type: 'timestamptz', nullable: true })
  submitted_at?: Date | null;

  @ManyToOne(() => ReviewCycleEntity, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'performance_review_cycles_id' })
  cycle?: ReviewCycleEntity;
}
