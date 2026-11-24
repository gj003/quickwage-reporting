// src/database/entities/peer-review.entity.ts

import {
  BeforeInsert,
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { SharedEntity } from './shared.entity';
import { ReviewCycleEntity } from './review-cycle.entity';
import { UserEntity } from './user.entity';
import { PeerReviewNominationEntity } from './peer-review-nomination.entity';
import { generatePrefixedCode } from 'src/common/utility';
import { PeerReviewStatus, PerformanceRatingCode } from 'src/common/enum';

/**
 * One peer's feedback on one employee for one cycle.
 *
 * The author is always stored — anonymity is a *presentation* rule enforced on
 * every read path when the cycle has `anonymous_peer_feedback` set, not an
 * absence of data. Storing it is what makes de-duplication, reminders, audit
 * and "which nominations are still outstanding" answerable at all.
 *
 * There is no per-goal breakdown here on purpose: a peer is not privy to
 * someone else's goal targets or attainment, so Stage 7 asks only what a peer
 * can actually speak to.
 */
@Entity('peer_reviews')
@Index('idx_peer_reviews_cycle_employee', ['cycleId', 'employeeUserId'])
@Index('idx_peer_reviews_peer', ['peerUserId', 'status'])
@Index('idx_peer_reviews_unique', ['cycleId', 'employeeUserId', 'peerUserId'], {
  unique: true,
})
export class PeerReviewEntity extends SharedEntity {
  @PrimaryGeneratedColumn('uuid', { name: 'peer_review_id' })
  peerReviewId: string;

  @Column({ type: 'varchar', length: 30, nullable: true, unique: true })
  code?: string | null;

  @Column({ type: 'uuid', name: 'company_id' })
  companyId: string;

  @Column({ type: 'uuid', name: 'cycle_id' })
  cycleId: string;

  @Column({ type: 'uuid', name: 'employee_user_id' })
  employeeUserId: string;

  @Column({ type: 'uuid', name: 'peer_user_id' })
  peerUserId: string;

  @Column({ type: 'uuid', name: 'nomination_id' })
  nominationId: string;

  @Column({
    type: 'varchar',
    length: 20,
    name: 'overall_rating',
    nullable: true,
  })
  overallRating?: PerformanceRatingCode | null;

  @Column({ type: 'text', nullable: true })
  strengths?: string | null;

  @Column({ type: 'text', name: 'areas_for_improvement', nullable: true })
  areasForImprovement?: string | null;

  @Column({ type: 'text', nullable: true })
  comments?: string | null;

  @Column({ type: 'varchar', length: 20, default: PeerReviewStatus.DRAFT })
  status: PeerReviewStatus;

  @Column({ type: 'int', name: 'completion_percent', default: 0 })
  completionPercent: number;

  @Column({ type: 'date', name: 'due_date', nullable: true })
  dueDate?: string | null;

  @Column({ type: 'timestamptz', name: 'started_at', nullable: true })
  startedAt?: Date | null;

  @Column({ type: 'timestamptz', name: 'last_saved_at', nullable: true })
  lastSavedAt?: Date | null;

  @Column({ type: 'timestamptz', name: 'submitted_at', nullable: true })
  submittedAt?: Date | null;

  @Column({ type: 'timestamptz', name: 'reopened_at', nullable: true })
  reopenedAt?: Date | null;

  @Column({ type: 'uuid', name: 'reopened_by', nullable: true })
  reopenedBy?: string | null;

  @Column({ type: 'text', name: 'reopen_reason', nullable: true })
  reopenReason?: string | null;

  @Column({ type: 'int', name: 'reopen_count', default: 0 })
  reopenCount: number;

  /**
   * Optimistic concurrency, maintained by a compare-and-swap UPDATE rather than
   * TypeORM's `@VersionColumn` — see `SelfReviewEntity.version` for why.
   */
  @Column({ type: 'int', default: 1 })
  version: number;

  @ManyToOne(() => ReviewCycleEntity, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'cycle_id' })
  cycle?: ReviewCycleEntity;

  @ManyToOne(() => UserEntity, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'employee_user_id' })
  employee?: UserEntity;

  @ManyToOne(() => UserEntity, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'peer_user_id' })
  peer?: UserEntity;

  @ManyToOne(() => PeerReviewNominationEntity, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'nomination_id' })
  nomination?: PeerReviewNominationEntity;

  @BeforeInsert()
  assignCode(): void {
    if (!this.code) {
      this.code = generatePrefixedCode('PR');
    }
  }
}
