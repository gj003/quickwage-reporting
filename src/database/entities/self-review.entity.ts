import {
  BeforeInsert,
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { SharedEntity } from './shared.entity';
import { ReviewCycleEntity } from './review-cycle.entity';
import { UserEntity } from './user.entity';
import { SelfReviewGoalEntity } from './self-review-goal.entity';
import { SelfReviewEntryEntity } from './self-review-entry.entity';
import { generatePrefixedCode } from 'src/common/utility';
import {
  PerformanceRatingCode,
  SelfReviewSection,
  ReviewSectionState,
  SelfReviewStatus,
} from 'src/common/enum';

@Entity({ name: 'self_reviews' })
@Index('idx_self_reviews_cycle_employee', ['reviewCycleId', 'employeeId'], {
  unique: true,
})
export class SelfReviewEntity extends SharedEntity {
  @PrimaryGeneratedColumn('uuid', { name: 'self_review_id' })
  selfReviewId: string;

  @Column({
    type: 'varchar',
    length: 30,
    name: 'self_review_code',
    unique: true,
  })
  selfReviewCode: string;

  @Column({ type: 'uuid', name: 'company_id' })
  companyId: string;

  @Column({ type: 'uuid', name: 'review_cycle_id' })
  reviewCycleId: string;

  @Column({ type: 'uuid', name: 'employee_id' })
  employeeId: string;

  @Column({ type: 'text', name: 'goals_summary', nullable: true })
  goalsSummary?: string | null;

  /**
   * Retained for the deprecated `POST /api/me/reviews/self` contract. The
   * Stage 5 wizard writes goal assessments to `self_review_goals` instead.
   */
  @Column({ type: 'jsonb', name: 'competency_ratings', default: () => "'[]'" })
  competencyRatings: {
    competency_code: string;
    rating: number;
    comment?: string;
  }[];

  @Column({ type: 'text', name: 'overall_comment', nullable: true })
  overallComment?: string | null;

  @Column({ type: 'text', nullable: true })
  strengths?: string | null;

  @Column({ type: 'text', name: 'areas_for_improvement', nullable: true })
  areasForImprovement?: string | null;

  @Column({
    type: 'varchar',
    length: 20,
    name: 'overall_self_rating',
    nullable: true,
  })
  overallSelfRating?: PerformanceRatingCode | null;

  @Column({ type: 'varchar', length: 30, default: SelfReviewStatus.DRAFT })
  status: SelfReviewStatus;

  @Column({ type: 'int', name: 'completion_percent', default: 0 })
  completionPercent: number;

  /**
   * Cached per-section completion. Computed server-side so the wizard's
   * progress indicator does not have to re-derive it from the whole payload.
   */
  @Column({ type: 'jsonb', name: 'section_state', default: () => "'{}'" })
  sectionState: Partial<Record<SelfReviewSection, ReviewSectionState>>;

  /** Resume point for the "Continue review" CTA. */
  @Column({
    type: 'varchar',
    length: 40,
    name: 'last_section',
    nullable: true,
  })
  lastSection?: SelfReviewSection | null;

  @Column({ type: 'date', name: 'due_date', nullable: true })
  dueDate?: string | null;

  @Column({ type: 'timestamptz', name: 'started_at', nullable: true })
  startedAt?: Date | null;

  @Column({ type: 'timestamptz', name: 'last_saved_at', nullable: true })
  lastSavedAt?: Date | null;

  @Column({ type: 'timestamptz', name: 'submitted_at', nullable: true })
  submittedAt?: Date | null;

  @Column({ type: 'timestamptz', name: 'reopened_at', nullable: true })
  reopenedAt?: Date | null;

  @Column({ type: 'uuid', name: 'reopened_by', nullable: true })
  reopenedBy?: string | null;

  @Column({ type: 'text', name: 'reopen_reason', nullable: true })
  reopenReason?: string | null;

  @Column({ type: 'int', name: 'reopen_count', default: 0 })
  reopenCount: number;

  /**
   * Optimistic concurrency: mutating endpoints carry the version they read and
   * are rejected with 409 on a mismatch, so a second tab cannot silently
   * overwrite the first.
   *
   * A plain column rather than TypeORM's `@VersionColumn` on purpose — the
   * service bumps it inside a compare-and-swap UPDATE, which closes the race
   * between checking the version and writing, and keeps the guarantee in one
   * readable place instead of split across ORM behaviour.
   */
  @Column({ type: 'int', default: 1 })
  version: number;

  @ManyToOne(() => ReviewCycleEntity, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'review_cycle_id' })
  cycle?: ReviewCycleEntity;

  @ManyToOne(() => UserEntity, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'employee_id' })
  employee?: UserEntity;

  @OneToMany(() => SelfReviewGoalEntity, (goal) => goal.selfReview, {
    cascade: true,
  })
  goals?: SelfReviewGoalEntity[];

  @OneToMany(() => SelfReviewEntryEntity, (entry) => entry.selfReview, {
    cascade: true,
  })
  entries?: SelfReviewEntryEntity[];

  @BeforeInsert()
  assignCode(): void {
    if (!this.selfReviewCode) {
      this.selfReviewCode = generatePrefixedCode('SR');
    }
  }
}
