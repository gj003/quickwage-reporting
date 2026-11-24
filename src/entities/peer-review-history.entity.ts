// src/database/entities/peer-review-history.entity.ts

import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { SharedEntity } from './shared.entity';
import { PeerReviewNominationEntity } from './peer-review-nomination.entity';
import { PeerReviewHistoryAction } from 'src/common/enum';

/**
 * Audit trail for the whole peer lifecycle — nomination, approval or decline,
 * then the review itself.
 *
 * Keyed on the nomination rather than the review because the trail starts
 * before a review exists, and must survive a nomination that is declined and
 * never produces one.
 *
 * Anonymity does not apply here: this is the administrative record, and it is
 * never served on a path a reviewee can reach.
 */
@Entity('peer_review_history')
@Index('idx_peer_review_history_nomination', ['nominationId', 'created_at'])
export class PeerReviewHistoryEntity extends SharedEntity {
  @PrimaryGeneratedColumn('uuid', { name: 'peer_review_history_id' })
  peerReviewHistoryId: string;

  @Column({ type: 'uuid', name: 'nomination_id' })
  nominationId: string;

  @Column({ type: 'uuid', name: 'peer_review_id', nullable: true })
  peerReviewId?: string | null;

  @Column({ type: 'varchar', length: 30 })
  action: PeerReviewHistoryAction;

  @Column({ type: 'uuid', name: 'actor_user_id' })
  actorUserId: string;

  @Column({ type: 'varchar', length: 30, name: 'from_status', nullable: true })
  fromStatus?: string | null;

  @Column({ type: 'varchar', length: 30, name: 'to_status', nullable: true })
  toStatus?: string | null;

  @Column({ type: 'text', nullable: true })
  note?: string | null;

  @ManyToOne(() => PeerReviewNominationEntity, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'nomination_id' })
  nomination?: PeerReviewNominationEntity;
}
