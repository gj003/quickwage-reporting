// src/database/entities/self-review-entry.entity.ts

import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { SharedEntity } from './shared.entity';
import { SelfReviewEntity } from './self-review.entity';
import { LearningCategory, SelfReviewEntryType } from 'src/common/enum';

/**
 * A single row in one of the four repeatable self-review sections:
 * accomplishments, challenges, learning & development, and future goals.
 *
 * One table with an `entry_type` discriminator rather than four near-identical
 * tables — the sections share title/description/ordering and differ only in one
 * or two extra fields, all of which are nullable here.
 */
@Entity('self_review_entries')
@Index('idx_self_review_entries_section', [
  'selfReviewId',
  'entryType',
  'orderIndex',
])
export class SelfReviewEntryEntity extends SharedEntity {
  @PrimaryGeneratedColumn('uuid', { name: 'self_review_entry_id' })
  selfReviewEntryId: string;

  @Column({ type: 'uuid', name: 'self_review_id' })
  selfReviewId: string;

  @Column({ type: 'varchar', length: 30, name: 'entry_type' })
  entryType: SelfReviewEntryType;

  @Column({ type: 'varchar', length: 255 })
  title: string;

  @Column({ type: 'text', nullable: true })
  description?: string | null;

  /** ACCOMPLISHMENT — what changed as a result. */
  @Column({ type: 'text', nullable: true })
  impact?: string | null;

  /** CHALLENGE — how it was handled, or that it is still open. */
  @Column({ type: 'text', nullable: true })
  resolution?: string | null;

  /** LEARNING — the kind of learning captured. */
  @Column({ type: 'varchar', length: 50, nullable: true })
  category?: LearningCategory | null;

  /** LEARNING — when the training/certification was completed. */
  @Column({ type: 'date', name: 'completed_on', nullable: true })
  completedOn?: string | null;

  /** FUTURE_GOAL — free-text horizon, e.g. "Next quarter", "H1 2026". */
  @Column({
    type: 'varchar',
    length: 50,
    name: 'target_timeframe',
    nullable: true,
  })
  targetTimeframe?: string | null;

  /**
   * Optional tie-back to a goal for accomplishments and future goals. Not a
   * foreign key constraint on purpose: a future goal may reference a goal that
   * is later deleted without invalidating the reflection.
   */
  @Column({ type: 'uuid', name: 'linked_goal_id', nullable: true })
  linkedGoalId?: string | null;

  @Column({ type: 'int', name: 'order_index', default: 0 })
  orderIndex: number;

  @ManyToOne(() => SelfReviewEntity, (review) => review.entries, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'self_review_id' })
  selfReview?: SelfReviewEntity;
}
