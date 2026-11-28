// src/database/entities/review-cycle-participant.entity.ts

import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { SharedEntity } from './shared.entity';
import {
  ReviewCycleParticipantSource,
  ReviewCycleParticipantStatus,
} from 'src/common/enum';
import { ReviewCycleEntity } from './review-cycle.entity';

/**
 * A published cycle's participant list.
 *
 * Filters are the rule; this is who the rule selected, written once at publish.
 * Membership reads for a published cycle come from here, so a promotion or
 * transfer mid-cycle no longer silently drops someone with review work in
 * flight. After publish the list changes only by an explicit add, withdraw or
 * sync.
 */
@Entity('performance_review_cycle_participants')
@Index('uq_review_cycle_participants_cycle_user', ['cycle_id', 'user_id'], {
  unique: true,
})
@Index('idx_review_cycle_participants_user_status', ['user_id', 'status'])
export class ReviewCycleParticipantEntity extends SharedEntity {
  @PrimaryGeneratedColumn('uuid')
  performance_review_cycle_participants_id: string;

  @Column({ type: 'uuid' })
  cycle_id: string;

  @Column({ type: 'uuid' })
  user_id: string;

  @Column({ type: 'varchar', length: 20 })
  source: ReviewCycleParticipantSource;

  @Column({
    type: 'varchar',
    length: 20,
    default: ReviewCycleParticipantStatus.ACTIVE,
  })
  status: ReviewCycleParticipantStatus;

  // Department and level as they were when the person was added — a record of
  // why they matched, not a live attribute.
  @Column({ type: 'int', nullable: true })
  department_id?: number | null;

  @Column({ type: 'int', nullable: true })
  position_level?: number | null;

  @Column({ type: 'uuid', nullable: true })
  added_by?: string | null;

  @Column({ type: 'timestamptz', default: () => 'CURRENT_TIMESTAMP' })
  added_at: Date;

  @Column({ type: 'timestamptz', nullable: true })
  withdrawn_at?: Date | null;

  @Column({ type: 'uuid', nullable: true })
  withdrawn_by?: string | null;

  @Column({ type: 'text', nullable: true })
  withdrawn_reason?: string | null;

  @ManyToOne(() => ReviewCycleEntity, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'cycle_id' })
  cycle: ReviewCycleEntity;
}
