// src/database/entities/review-cycle-reviewer-type.entity.ts

import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { SharedEntity } from './shared.entity';
import { ReviewerAssociationType } from 'src/common/enum';
import { ReviewCycleEntity } from './review-cycle.entity';

@Entity('performance_review_cycle_reviewer_types')
@Index('idx_review_cycle_reviewer_type_cycle_type', ['cycle_id', 'type'])
export class ReviewCycleReviewerTypeEntity extends SharedEntity {
  @PrimaryGeneratedColumn('uuid')
  performance_review_cycle_reviewer_types_id: string;

  @Column({ type: 'uuid' })
  cycle_id: string;

  @Column({ type: 'varchar', length: 50 })
  type: ReviewerAssociationType;

  @Column({ type: 'boolean', default: true })
  required: boolean;

  @Column({ type: 'int', nullable: true })
  required_peer_count?: number | null;

  // Days allowed for this reviewer stage. The list is ordered by display_order,
  // so the same type may appear more than once with different timelines.
  @Column({ type: 'int', nullable: true })
  timeline_days?: number | null;

  @Column({ type: 'int', default: 0 })
  display_order: number;

  // When true this stage opens together with the previous stage instead of
  // after it, so the two share a start date (see `stageDeadline`).
  @Column({ type: 'boolean', default: false })
  parallel_with_previous: boolean;

  @ManyToOne(() => ReviewCycleEntity, (cycle) => cycle.reviewer_types, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'cycle_id' })
  cycle: ReviewCycleEntity;
}
