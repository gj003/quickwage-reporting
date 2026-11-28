// src/database/entities/calibration-adjustment.entity.ts

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
import { CalibrationSessionEntity } from './calibration-session.entity';
import { PerformanceRatingCode } from 'src/common/enum';

/**
 * A rating HR moved during calibration.
 *
 * Kept beside the manager review rather than written into it: the review stays
 * what its author wrote, and the value calibration moved it from survives for
 * the audit trail. Release reads this row ahead of the review.
 *
 * Only moved ratings get a row — everyone else passes through as the manager
 * rated them. At most one row in force per (cycle, employee); clearing
 * soft-deletes it, and an upheld appeal supersedes it, both kept for history.
 */
@Entity('performance_calibration_adjustments')
@Index('idx_calibration_adjustments_cycle', ['cycle_id'])
@Index('idx_calibration_adjustments_employee', ['employee_user_id'])
export class CalibrationAdjustmentEntity extends SharedEntity {
  @PrimaryGeneratedColumn('uuid')
  performance_calibration_adjustments_id: string;

  @Column({ type: 'uuid' })
  company_id: string;

  @Column({ type: 'uuid' })
  cycle_id: string;

  @Column({ type: 'uuid' })
  session_id: string;

  @Column({ type: 'uuid' })
  employee_user_id: string;

  @Column({ type: 'uuid', nullable: true })
  manager_review_id?: string | null;

  /**
   * The manager's rating this adjustment was made against. When the review
   * later says something else, the adjustment is stale and has to be
   * confirmed again before calibration can be finalised.
   */
  @Column({ type: 'varchar', length: 20 })
  manager_rating_code: PerformanceRatingCode;

  @Column({ type: 'varchar', length: 20 })
  calibrated_rating_code: PerformanceRatingCode;

  @Column({ type: 'text' })
  reason: string;

  @Column({ type: 'uuid' })
  adjusted_by: string;

  @Column({ type: 'timestamptz' })
  adjusted_at: Date;

  /** Set when an upheld appeal overrides calibration for this employee. */
  @Column({ type: 'timestamptz', nullable: true })
  superseded_at?: Date | null;

  @Column({ type: 'text', nullable: true })
  superseded_reason?: string | null;

  @Column({ type: 'int', default: 1 })
  version: number;

  @ManyToOne(() => ReviewCycleEntity, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'cycle_id' })
  cycle?: ReviewCycleEntity;

  @ManyToOne(() => CalibrationSessionEntity, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'session_id' })
  session?: CalibrationSessionEntity;
}
