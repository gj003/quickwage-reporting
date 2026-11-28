// src/database/entities/review-cycle-participant-filter.entity.ts

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

@Entity('performance_review_cycle_filters')
@Index('idx_review_cycle_filters_cycle', ['cycle_id'])
export class ReviewCycleParticipantFilterEntity extends SharedEntity {
  @PrimaryGeneratedColumn('uuid')
  performance_review_cycle_filters_id: string;

  @Column({ type: 'uuid' })
  cycle_id: string;

  @Column({ type: 'int', array: true, nullable: true })
  department_ids?: number[] | null;

  @Column({ type: 'int', array: true, nullable: true })
  position_level_ids?: number[] | null;

  // Employees the filters match but HR unticked in the builder.
  @Column({ type: 'uuid', array: true, nullable: true })
  excluded_employee_ids?: string[] | null;

  @ManyToOne(() => ReviewCycleEntity, (cycle) => cycle.participant_filters, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'cycle_id' })
  cycle: ReviewCycleEntity;
}
