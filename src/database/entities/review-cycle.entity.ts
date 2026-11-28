// src/database/entities/review-cycle.entity.ts

import {
  BeforeInsert,
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  VersionColumn,
} from 'typeorm';
import { SharedEntity } from './shared.entity';
import {
  PerformanceRatingCode,
  PerformanceReviewType,
  ReviewCycleStatus,
} from 'src/common/enum';
import { ReviewTemplateEntity } from './review-template.entity';
import { ReviewCycleParticipantFilterEntity } from './review-cycle-participant-filter.entity';
import { ReviewCycleReviewerTypeEntity } from './review-cycle-reviewer-type.entity';
import { CalibrationSessionEntity } from './calibration-session.entity';
import { generatePrefixedCode } from 'src/common/utility';

@Entity('performance_review_cycles')
@Index('idx_review_cycles_company_status', ['company_id', 'status'])
export class ReviewCycleEntity extends SharedEntity {
  @PrimaryGeneratedColumn('uuid')
  performance_review_cycles_id: string;

  @Column({ type: 'uuid' })
  company_id: string;

  // Human-readable display code, globally unique. A 10-digit random suffix
  // keeps collisions rare; the service retries on the residual conflict.
  @Column({ type: 'varchar', length: 30, unique: true })
  code: string;

  @Column({ type: 'varchar', length: 255 })
  title: string;

  @Column({ type: 'varchar', length: 50 })
  review_type: PerformanceReviewType;

  @Column({ type: 'text', nullable: true })
  description?: string | null;

  @Column({ type: 'date', nullable: true })
  start_date?: string | null;

  @Column({ type: 'date', nullable: true })
  end_date?: string | null;

  @Column({
    type: 'varchar',
    length: 50,
    default: ReviewCycleStatus.DRAFT,
  })
  status: ReviewCycleStatus;

  @Column({ type: 'boolean', default: false })
  parallel_reviews: boolean;

  @Column({ type: 'boolean', default: false })
  auto_progression: boolean;

  @Column({ type: 'boolean', default: false })
  automatic_reminders: boolean;

  @Column({ type: 'int', nullable: true })
  reminder_frequency_days?: number | null;

  // Added to reminder_frequency_days, so "every 1 day 1 hour" is 1 + 1.
  @Column({ type: 'int', default: 0 })
  reminder_frequency_hours: number;

  @Column({ type: 'boolean', default: false })
  anonymous_peer_feedback: boolean;

  @Column({ type: 'boolean', default: false })
  show_results_immediately: boolean;

  @Column({ type: 'boolean', default: false })
  require_calibration: boolean;

  @Column({ type: 'boolean', default: false })
  bell_curve_enforcement: boolean;

  /**
   * How long after release an employee may appeal their rating.
   *
   * Null or zero closes appeals for the cycle entirely — an explicit choice
   * rather than an unset field, which is why there is no default window.
   */
  @Column({ type: 'int', nullable: true })
  appeal_window_days?: number | null;

  /**
   * Released ratings at or below this level go on HR's PIP list. Null means
   * the cycle raises no one — a cycle opts in, as it does for appeals.
   */
  @Column({ type: 'varchar', length: 20, nullable: true })
  pip_threshold_rating?: PerformanceRatingCode | null;

  @Column({ type: 'int', default: 0 })
  participants_count: number;

  @Column({ type: 'int', default: 0 })
  progress_percent: number;

  // Last time an automatic reminder was dispatched for this cycle. The reminder
  // cron uses it with reminder_frequency_days to decide the next due date.
  @Column({ type: 'timestamptz', nullable: true })
  last_reminded_at?: Date | null;

  @Column({ type: 'uuid', nullable: true })
  template_id?: string | null;

  @Column({ type: 'uuid', nullable: true })
  created_by?: string | null;

  @Column({ type: 'uuid', nullable: true })
  updated_by?: string | null;

  @VersionColumn()
  version: number;

  @ManyToOne(() => ReviewTemplateEntity, (template) => template.cycles, {
    nullable: true,
    onDelete: 'SET NULL',
  })
  @JoinColumn({ name: 'template_id' })
  template?: ReviewTemplateEntity | null;

  @OneToMany(
    () => ReviewCycleParticipantFilterEntity,
    (filter) => filter.cycle,
    { cascade: true },
  )
  participant_filters?: ReviewCycleParticipantFilterEntity[];

  @OneToMany(
    () => ReviewCycleReviewerTypeEntity,
    (reviewerType) => reviewerType.cycle,
    { cascade: true },
  )
  reviewer_types?: ReviewCycleReviewerTypeEntity[];

  @OneToMany(() => CalibrationSessionEntity, (calibration) => calibration.cycle)
  calibration_sessions?: CalibrationSessionEntity[];

  @BeforeInsert()
  assignCode(): void {
    if (!this.code) {
      // 10 digits (1e10 space) keeps global collisions rare; the service still
      // retries on the residual conflict against the unique index.
      this.code = generatePrefixedCode('PRC', 10);
    }
  }
}
