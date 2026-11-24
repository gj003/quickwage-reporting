// src/database/entities/performance-rating-appeal.entity.ts

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
import { PerformanceFinalRatingEntity } from './performance-final-rating.entity';
import {
  AppealEmployeeDecision,
  AppealEscalationReason,
  AppealHrDecision,
  AppealResolution,
  AppealStatus,
  PerformanceRatingCode,
} from 'src/common/enum';

/**
 * An employee's challenge to a released rating.
 *
 * Anchored to the **snapshot**, not to the manager review: the employee is
 * disputing what they were actually shown, and the snapshot is the only record
 * of that which cannot move underneath them. `rating_at_appeal` repeats the
 * code a second time so the trail survives even a superseded snapshot.
 *
 * Only one appeal may be open per rating at a time. A rating that is superseded
 * and re-released is a new snapshot, and may be appealed again on its own.
 */
@Entity('performance_rating_appeals')
@Index('idx_rating_appeals_final_rating', ['final_rating_id'])
@Index('idx_rating_appeals_cycle_status', ['cycle_id', 'status'])
@Index('idx_rating_appeals_employee', ['employee_user_id'])
@Index('idx_rating_appeals_manager_status', ['manager_user_id', 'status'])
export class PerformanceRatingAppealEntity extends SharedEntity {
  @PrimaryGeneratedColumn('uuid')
  performance_rating_appeals_id: string;

  @Column({ type: 'uuid' })
  company_id: string;

  @Column({ type: 'uuid' })
  cycle_id: string;

  @Column({ type: 'uuid' })
  final_rating_id: string;

  @Column({ type: 'uuid' })
  employee_user_id: string;

  /**
   * The manager expected to respond, copied from the rating at raise time.
   *
   * Nullable because the manager may have left — the case that most often
   * produces an appeal in the first place. A null here routes straight to HR
   * rather than waiting out the response clock.
   */
  @Column({ type: 'uuid', nullable: true })
  manager_user_id?: string | null;

  @Column({ type: 'varchar', length: 20 })
  rating_at_appeal: PerformanceRatingCode;

  @Column({
    type: 'varchar',
    length: 30,
    default: AppealStatus.RAISED,
  })
  status: AppealStatus;

  @Column({ type: 'text' })
  grounds: string;

  // ─── Level 1: the manager's answer ────────────────────────────────────────

  /**
   * When the manager's response is due. The SLA sweep escalates anything still
   * RAISED past this point, so an unanswered appeal cannot stall forever.
   */
  @Column({ type: 'timestamptz', nullable: true })
  response_due_at?: Date | null;

  @Column({ type: 'text', nullable: true })
  manager_response?: string | null;

  @Column({ type: 'timestamptz', nullable: true })
  manager_responded_at?: Date | null;

  @Column({ type: 'uuid', nullable: true })
  manager_responded_by?: string | null;

  @Column({ type: 'varchar', length: 20, nullable: true })
  employee_decision?: AppealEmployeeDecision | null;

  @Column({ type: 'timestamptz', nullable: true })
  employee_decided_at?: Date | null;

  @Column({ type: 'text', nullable: true })
  employee_decision_note?: string | null;

  // ─── Level 2: HR ──────────────────────────────────────────────────────────

  @Column({ type: 'timestamptz', nullable: true })
  escalated_at?: Date | null;

  @Column({ type: 'varchar', length: 30, nullable: true })
  escalation_reason?: AppealEscalationReason | null;

  @Column({ type: 'varchar', length: 20, nullable: true })
  hr_decision?: AppealHrDecision | null;

  @Column({ type: 'timestamptz', nullable: true })
  hr_decided_at?: Date | null;

  @Column({ type: 'uuid', nullable: true })
  hr_decided_by?: string | null;

  @Column({ type: 'text', nullable: true })
  hr_decision_note?: string | null;

  // ─── Terminal ─────────────────────────────────────────────────────────────

  @Column({ type: 'varchar', length: 30, nullable: true })
  resolution?: AppealResolution | null;

  @Column({ type: 'timestamptz', nullable: true })
  resolved_at?: Date | null;

  @Column({ type: 'timestamptz', nullable: true })
  withdrawn_at?: Date | null;

  @Column({ type: 'int', default: 1 })
  version: number;

  @ManyToOne(() => ReviewCycleEntity, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'cycle_id' })
  cycle?: ReviewCycleEntity;

  @ManyToOne(() => PerformanceFinalRatingEntity, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'final_rating_id' })
  final_rating?: PerformanceFinalRatingEntity;
}
