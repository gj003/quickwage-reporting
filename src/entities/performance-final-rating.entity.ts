// src/database/entities/performance-final-rating.entity.ts

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
import {
  FinalRatingReleaseMode,
  FinalRatingStatus,
  PerformanceRatingCode,
} from 'src/common/enum';

/**
 * The rating as it was communicated to the employee.
 *
 * This is a **snapshot, not a view**. `manager_reviews` stays the manager's
 * working document and can be reopened and edited; this row records what the
 * employee was actually shown, and does not move when the source does. Without
 * the copy, a reopen after release would silently rewrite a rating the employee
 * has already acknowledged, and the acknowledgement would point at a value that
 * no longer exists.
 *
 * One row per (cycle, employee). A revoked row is kept rather than deleted —
 * the fact that something was released and pulled back is itself the audit
 * trail — and re-releasing overwrites the snapshot in place, bumping
 * `release_count`.
 */
@Entity('performance_final_ratings')
@Index('idx_final_ratings_cycle_employee', ['cycle_id', 'employee_user_id'], {
  unique: true,
})
@Index('idx_final_ratings_employee', ['employee_user_id'])
@Index('idx_final_ratings_cycle_status', ['cycle_id', 'status'])
export class PerformanceFinalRatingEntity extends SharedEntity {
  @PrimaryGeneratedColumn('uuid')
  performance_final_ratings_id: string;

  @Column({ type: 'uuid' })
  company_id: string;

  @Column({ type: 'uuid' })
  cycle_id: string;

  @Column({ type: 'uuid' })
  employee_user_id: string;

  /**
   * The manager review this was taken from. Nullable so a revoked row survives
   * the source review being hard-deleted, which would otherwise take the audit
   * trail with it.
   */
  @Column({ type: 'uuid', nullable: true })
  manager_review_id?: string | null;

  @Column({ type: 'uuid', nullable: true })
  manager_user_id?: string | null;

  // ─── The snapshot ─────────────────────────────────────────────────────────

  @Column({ type: 'varchar', length: 20 })
  rating_code: PerformanceRatingCode;

  /**
   * Resolved performance band label at release time.
   *
   * Stored alongside the code because bands are configurable per company: the
   * code is stable, but what "EXCEEDS_EXPECTATIONS" was called when this
   * employee read it is not recoverable later if the band is renamed.
   */
  @Column({ type: 'varchar', length: 100, nullable: true })
  band_label?: string | null;

  @Column({ type: 'varchar', length: 20, nullable: true })
  suggested_rating_code?: PerformanceRatingCode | null;

  /**
   * What the manager submitted, when calibration released something else.
   * Kept for HR and audit; the employee is shown `rating_code` only.
   */
  @Column({ type: 'varchar', length: 20, nullable: true })
  manager_rating_code?: PerformanceRatingCode | null;

  @Column({ type: 'text', nullable: true })
  manager_comment?: string | null;

  @Column({ type: 'text', nullable: true })
  strengths?: string | null;

  @Column({ type: 'text', nullable: true })
  areas_for_improvement?: string | null;

  // ─── Release state ────────────────────────────────────────────────────────

  @Column({
    type: 'varchar',
    length: 30,
    default: FinalRatingStatus.RELEASED,
  })
  status: FinalRatingStatus;

  @Column({
    type: 'varchar',
    length: 20,
    default: FinalRatingReleaseMode.MANUAL,
  })
  release_mode: FinalRatingReleaseMode;

  @Column({ type: 'timestamptz' })
  released_at: Date;

  @Column({ type: 'uuid' })
  released_by: string;

  @Column({ type: 'int', default: 1 })
  release_count: number;

  @Column({ type: 'timestamptz', nullable: true })
  acknowledged_at?: Date | null;

  @Column({ type: 'text', nullable: true })
  acknowledgement_comment?: string | null;

  @Column({ type: 'timestamptz', nullable: true })
  revoked_at?: Date | null;

  @Column({ type: 'uuid', nullable: true })
  revoked_by?: string | null;

  @Column({ type: 'text', nullable: true })
  revoke_reason?: string | null;

  /** Optimistic concurrency, matching every other write in the review stages. */
  @Column({ type: 'int', default: 1 })
  version: number;

  @ManyToOne(() => ReviewCycleEntity, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'cycle_id' })
  cycle?: ReviewCycleEntity;
}
