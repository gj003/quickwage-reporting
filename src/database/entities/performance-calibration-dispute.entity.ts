// src/database/entities/performance-calibration-dispute.entity.ts

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
import { CalibrationAdjustmentEntity } from './calibration-adjustment.entity';
import {
  CalibrationDisputeOutcome,
  CalibrationDisputeRecommendation,
  CalibrationDisputeStatus,
  PerformanceRatingCode,
} from 'src/common/enum';

/**
 * A manager's challenge to a rating HR moved during calibration.
 *
 * Anchored to one version of the move. If HR changes the move while the
 * dispute is open, the dispute no longer answers anything and is superseded;
 * the new move can be disputed afresh. The ratings are copied onto the row so
 * it still reads the same after the move is cleared.
 *
 * One dispute per version of a move, withdrawn ones aside — a partial unique
 * index in the migration, since the entity cannot express one.
 */
@Entity('performance_calibration_disputes')
@Index('idx_calibration_disputes_cycle_status', ['cycle_id', 'status'])
@Index('idx_calibration_disputes_skip_level', ['skip_level_user_id', 'status'])
export class PerformanceCalibrationDisputeEntity extends SharedEntity {
  @PrimaryGeneratedColumn('uuid')
  performance_calibration_disputes_id: string;

  @Column({ type: 'uuid' })
  company_id: string;

  @Column({ type: 'uuid' })
  cycle_id: string;

  @Column({ type: 'uuid' })
  session_id: string;

  @Column({ type: 'uuid' })
  adjustment_id: string;

  /** The version of the move this disputes. */
  @Column({ type: 'int' })
  adjustment_version: number;

  @Column({ type: 'uuid' })
  employee_user_id: string;

  @Column({ type: 'uuid' })
  manager_review_id: string;

  /** The manager who owned the review when they raised it. */
  @Column({ type: 'uuid' })
  raised_by: string;

  // ─── The move, as it was disputed ─────────────────────────────────────────

  @Column({ type: 'varchar', length: 20 })
  manager_rating_code: PerformanceRatingCode;

  @Column({ type: 'varchar', length: 20 })
  calibrated_rating_code: PerformanceRatingCode;

  /** What the manager asks for instead. Null means their own rating. */
  @Column({ type: 'varchar', length: 20, nullable: true })
  proposed_rating_code?: PerformanceRatingCode | null;

  @Column({ type: 'text' })
  reason: string;

  @Column({
    type: 'varchar',
    length: 20,
    default: CalibrationDisputeStatus.WITH_SKIP_LEVEL,
  })
  status: CalibrationDisputeStatus;

  // ─── The skip-level's view ────────────────────────────────────────────────

  /** Null when there was no one independent to ask; the dispute went to HR. */
  @Column({ type: 'uuid', nullable: true })
  skip_level_user_id?: string | null;

  @Column({ type: 'varchar', length: 20, nullable: true })
  skip_level_recommendation?: CalibrationDisputeRecommendation | null;

  @Column({ type: 'text', nullable: true })
  skip_level_comment?: string | null;

  @Column({ type: 'timestamptz', nullable: true })
  skip_level_at?: Date | null;

  // ─── HR's decision ────────────────────────────────────────────────────────

  @Column({ type: 'varchar', length: 20, nullable: true })
  outcome?: CalibrationDisputeOutcome | null;

  /** The rating in force after the decision. */
  @Column({ type: 'varchar', length: 20, nullable: true })
  resolved_rating_code?: PerformanceRatingCode | null;

  @Column({ type: 'text', nullable: true })
  resolution_note?: string | null;

  @Column({ type: 'uuid', nullable: true })
  resolved_by?: string | null;

  @Column({ type: 'timestamptz', nullable: true })
  resolved_at?: Date | null;

  /** When it was withdrawn or superseded. */
  @Column({ type: 'timestamptz', nullable: true })
  closed_at?: Date | null;

  @Column({ type: 'int', default: 1 })
  version: number;

  @ManyToOne(() => ReviewCycleEntity, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'cycle_id' })
  cycle?: ReviewCycleEntity;

  @ManyToOne(() => CalibrationAdjustmentEntity, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'adjustment_id' })
  adjustment?: CalibrationAdjustmentEntity;
}
