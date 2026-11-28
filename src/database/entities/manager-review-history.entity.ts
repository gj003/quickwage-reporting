// src/database/entities/manager-review-history.entity.ts

import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { SharedEntity } from './shared.entity';
import { ManagerReviewEntity } from './manager-review.entity';
import {
  ManagerReviewHistoryAction,
  ManagerReviewSection,
  ManagerReviewStatus,
} from 'src/common/enum';

/**
 * Persistent audit trail for one manager review.
 *
 * A rating that decides someone's cycle outcome needs to be answerable after
 * the fact: who set it, when, and — if it was sent back — why.
 */
@Entity('manager_review_history')
@Index('idx_manager_review_history_review', ['managerReviewId', 'created_at'])
export class ManagerReviewHistoryEntity extends SharedEntity {
  @PrimaryGeneratedColumn('uuid', { name: 'manager_review_history_id' })
  managerReviewHistoryId: string;

  @Column({ type: 'uuid', name: 'manager_reviews_id' })
  managerReviewId: string;

  @Column({ type: 'varchar', length: 30 })
  action: ManagerReviewHistoryAction;

  @Column({ type: 'uuid', name: 'actor_user_id' })
  actorUserId: string;

  @Column({
    type: 'varchar',
    length: 30,
    name: 'from_status',
    nullable: true,
  })
  fromStatus?: ManagerReviewStatus | null;

  @Column({ type: 'varchar', length: 30, name: 'to_status', nullable: true })
  toStatus?: ManagerReviewStatus | null;

  @Column({ type: 'text', nullable: true })
  note?: string | null;

  /** The rating carried at submission, so a later change is traceable. */
  @Column({
    type: 'varchar',
    length: 20,
    name: 'final_rating',
    nullable: true,
  })
  finalRating?: string | null;

  @Column({ type: 'jsonb', name: 'changed_sections', default: () => "'[]'" })
  changedSections: ManagerReviewSection[];

  @ManyToOne(() => ManagerReviewEntity, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'manager_reviews_id' })
  managerReview?: ManagerReviewEntity;
}
