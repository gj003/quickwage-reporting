// src/database/entities/performance-final-rating-history.entity.ts

import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { SharedEntity } from './shared.entity';
import { PerformanceFinalRatingEntity } from './performance-final-rating.entity';
import {
  FinalRatingHistoryAction,
  PerformanceRatingCode,
} from 'src/common/enum';

/**
 * Audit trail for a released rating.
 *
 * The snapshot itself only carries its current state; this is where the
 * sequence lives — released, revoked, released again, acknowledged. An
 * acknowledgement is the record that an employee was told their rating, so the
 * trail has to survive later edits to the snapshot rather than being derived
 * from it.
 *
 * `rating_code` is repeated on every row on purpose: it is the value in force
 * at that moment, which is the whole point of keeping the trail.
 */
@Entity('performance_final_rating_history')
@Index('idx_final_rating_history_rating', ['final_rating_id', 'created_at'])
export class PerformanceFinalRatingHistoryEntity extends SharedEntity {
  @PrimaryGeneratedColumn('uuid')
  performance_final_rating_history_id: string;

  @Column({ type: 'uuid' })
  final_rating_id: string;

  @Column({ type: 'varchar', length: 30 })
  action: FinalRatingHistoryAction;

  @Column({ type: 'uuid' })
  actor_user_id: string;

  @Column({ type: 'varchar', length: 20, nullable: true })
  rating_code?: PerformanceRatingCode | null;

  @Column({ type: 'varchar', length: 30, nullable: true })
  from_status?: string | null;

  @Column({ type: 'varchar', length: 30, nullable: true })
  to_status?: string | null;

  @Column({ type: 'text', nullable: true })
  note?: string | null;

  @ManyToOne(() => PerformanceFinalRatingEntity, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'final_rating_id' })
  final_rating?: PerformanceFinalRatingEntity;
}
