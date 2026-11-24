// src/database/entities/performance-rating-appeal-history.entity.ts

import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { SharedEntity } from './shared.entity';
import { PerformanceRatingAppealEntity } from './performance-rating-appeal.entity';
import { AppealHistoryAction } from 'src/common/enum';

/**
 * Who did what to an appeal, and when.
 *
 * An appeal is a dispute about a rating that affects someone's pay and record,
 * so the sequence matters as much as the outcome — including which transitions
 * a machine made rather than a person. The SLA sweep writes here with the
 * system as actor, so an escalation nobody chose is still attributable.
 */
@Entity('performance_rating_appeal_history')
@Index('idx_rating_appeal_history_appeal', ['appeal_id', 'created_at'])
export class PerformanceRatingAppealHistoryEntity extends SharedEntity {
  @PrimaryGeneratedColumn('uuid')
  performance_rating_appeal_history_id: string;

  @Column({ type: 'uuid' })
  appeal_id: string;

  @Column({ type: 'varchar', length: 30 })
  action: AppealHistoryAction;

  /** Null when the transition was made by the SLA sweep rather than a person. */
  @Column({ type: 'uuid', nullable: true })
  actor_user_id?: string | null;

  @Column({ type: 'varchar', length: 30, nullable: true })
  from_status?: string | null;

  @Column({ type: 'varchar', length: 30, nullable: true })
  to_status?: string | null;

  @Column({ type: 'text', nullable: true })
  note?: string | null;

  @ManyToOne(() => PerformanceRatingAppealEntity, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'appeal_id' })
  appeal?: PerformanceRatingAppealEntity;
}
