// src/database/entities/self-review-history.entity.ts

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
import {
  SelfReviewHistoryAction,
  SelfReviewSection,
  SelfReviewStatus,
} from 'src/common/enum';

/**
 * Persistent audit trail for one self review.
 *
 * `PerformanceAuditLogService` is log-only, so it cannot answer "who reopened
 * this review and why" after the fact. This table can, and it also backs the
 * activity panel on the submitted-state screen.
 */
@Entity('self_review_history')
@Index('idx_self_review_history_review', ['selfReviewId', 'created_at'])
export class SelfReviewHistoryEntity extends SharedEntity {
  @PrimaryGeneratedColumn('uuid', { name: 'self_review_history_id' })
  selfReviewHistoryId: string;

  @Column({ type: 'uuid', name: 'self_review_id' })
  selfReviewId: string;

  @Column({ type: 'varchar', length: 30 })
  action: SelfReviewHistoryAction;

  @Column({ type: 'uuid', name: 'actor_user_id' })
  actorUserId: string;

  @Column({
    type: 'varchar',
    length: 30,
    name: 'from_status',
    nullable: true,
  })
  fromStatus?: SelfReviewStatus | null;

  @Column({ type: 'varchar', length: 30, name: 'to_status', nullable: true })
  toStatus?: SelfReviewStatus | null;

  /** Free text — carries the mandatory reason on a REOPENED row. */
  @Column({ type: 'text', nullable: true })
  note?: string | null;

  @Column({ type: 'jsonb', name: 'changed_sections', default: () => "'[]'" })
  changedSections: SelfReviewSection[];

  @ManyToOne(() => SelfReviewEntity, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'self_review_id' })
  selfReview?: SelfReviewEntity;
}
