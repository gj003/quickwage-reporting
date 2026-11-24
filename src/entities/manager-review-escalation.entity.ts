// src/database/entities/manager-review-escalation.entity.ts

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
  ManagerReviewEscalationResolution,
  ReviewerRouting,
} from 'src/common/enum';

/**
 * A manager review that reached HR because its deadline got close with the
 * review still unsubmitted.
 *
 * Keyed on (cycle, employee) rather than on the review: a review nobody has
 * started has no `manager_reviews` row, and a not-started review is exactly
 * the case most worth escalating.
 *
 * Written once by the daily sweep, so the notification hook fires once and
 * HR can see when a review became their problem. At most one open escalation
 * per (cycle, employee); a review that is submitted, then reopened and left
 * again, escalates afresh as a new row.
 */
@Entity('manager_review_escalations')
@Index('idx_mr_escalations_cycle_open', ['cycle_id', 'resolved_at'])
@Index('idx_mr_escalations_employee', ['employee_user_id'])
export class ManagerReviewEscalationEntity extends SharedEntity {
  @PrimaryGeneratedColumn('uuid')
  manager_review_escalations_id: string;

  @Column({ type: 'uuid' })
  company_id: string;

  @Column({ type: 'uuid' })
  cycle_id: string;

  @Column({ type: 'uuid' })
  employee_user_id: string;

  /** Null when the review had not been started at escalation time. */
  @Column({ type: 'uuid', nullable: true })
  manager_review_id?: string | null;

  /**
   * Who was expected to write the review — the direct manager, or whoever
   * routing hands it to. Null when nobody can review this employee at all.
   */
  @Column({ type: 'uuid', nullable: true })
  expected_reviewer_user_id?: string | null;

  @Column({ type: 'varchar', length: 30, nullable: true })
  routing?: ReviewerRouting | null;

  /** The departed manager the expected reviewer is standing in for. */
  @Column({ type: 'uuid', nullable: true })
  covering_for_user_id?: string | null;

  /** NOT_STARTED or DRAFT — where the review stood when it escalated. */
  @Column({ type: 'varchar', length: 20 })
  stage_at_escalation: string;

  @Column({ type: 'date' })
  due_date: string;

  @Column({ type: 'timestamptz' })
  escalated_at: Date;

  @Column({ type: 'timestamptz', nullable: true })
  resolved_at?: Date | null;

  @Column({ type: 'varchar', length: 30, nullable: true })
  resolution?: ManagerReviewEscalationResolution | null;

  @ManyToOne(() => ReviewCycleEntity, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'cycle_id' })
  cycle?: ReviewCycleEntity;
}
