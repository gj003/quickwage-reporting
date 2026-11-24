// src/database/entities/manager-review.entity.ts
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
import { ManagerReviewKraEntity } from './manager-review-kra.entity';
import { ManagerReviewGoalEntity } from './manager-review-goal.entity';
import { generatePrefixedCode } from 'src/common/utility';
import {
  ManagerReviewSection,
  ManagerReviewStatus,
  PerformanceRatingCode,
  PromotionReadiness,
  ReviewSectionState,
} from 'src/common/enum';

@Entity('manager_reviews')
@Index('idx_manager_reviews_cycle_employee', [
  'performance_review_cycles_id',
  'employee_user_id',
])
@Index('idx_manager_reviews_manager', ['manager_user_id'])
export class ManagerReviewEntity extends SharedEntity {
  @PrimaryGeneratedColumn('uuid')
  manager_reviews_id: string;

  @Column({ type: 'varchar', length: 30, nullable: true, unique: true })
  code?: string | null;

  @Column({ type: 'uuid', nullable: true })
  company_id?: string | null;

  @Column({ type: 'uuid' })
  performance_review_cycles_id: string;

  @Column({ type: 'uuid' })
  employee_user_id: string;

  @Column({ type: 'uuid' })
  manager_user_id: string;

  /** Derived from tracked goal progress; shown to the manager as a starting point. */
  @Column({ type: 'varchar', length: 20, nullable: true })
  overall_suggested_rating?: PerformanceRatingCode | null;

  @Column({ type: 'varchar', length: 20, nullable: true })
  overall_final_rating?: PerformanceRatingCode | null;

  @Column({ type: 'numeric', precision: 5, scale: 2, default: 0 })
  overall_progress_cached: string;

  @Column({ type: 'text', nullable: true })
  overall_comment?: string | null;

  @Column({ type: 'text', nullable: true })
  strengths?: string | null;

  @Column({ type: 'text', nullable: true })
  areas_for_improvement?: string | null;

  /** The manager's promotion recommendation. Null means unanswered. */
  @Column({ type: 'varchar', length: 20, nullable: true })
  promotion_readiness?: PromotionReadiness | null;

  /** The designation the manager is recommending a promotion to. */
  @Column({ type: 'int', nullable: true })
  proposed_designation_id?: number | null;

  @Column({ type: 'text', nullable: true })
  promotion_justification?: string | null;

  @Column({ type: 'date', nullable: true })
  due_date?: string | null;

  @Column({
    type: 'varchar',
    length: 30,
    default: ManagerReviewStatus.DRAFT,
  })
  status: ManagerReviewStatus;

  /**
   * Retained from the pre-Stage-6 contract, which had no status column. Kept in
   * step with `status` so nothing reading the old flag silently sees a
   * submitted review as outstanding.
   */
  @Column({ type: 'boolean', default: false })
  is_submitted: boolean;

  @Column({ type: 'int', default: 0 })
  completion_percent: number;

  @Column({ type: 'jsonb', default: () => "'{}'" })
  section_state: Partial<Record<ManagerReviewSection, ReviewSectionState>>;

  @Column({ type: 'varchar', length: 40, nullable: true })
  last_section?: ManagerReviewSection | null;

  @Column({ type: 'timestamptz', nullable: true })
  started_at?: Date | null;

  @Column({ type: 'timestamptz', nullable: true })
  last_saved_at?: Date | null;

  @Column({ type: 'timestamptz', nullable: true })
  submitted_at?: Date | null;

  @Column({ type: 'timestamptz', nullable: true })
  reopened_at?: Date | null;

  @Column({ type: 'uuid', nullable: true })
  reopened_by?: string | null;

  @Column({ type: 'text', nullable: true })
  reopen_reason?: string | null;

  @Column({ type: 'int', default: 0 })
  reopen_count: number;

  /**
   * Optimistic concurrency, maintained by a compare-and-swap UPDATE rather than
   * TypeORM's `@VersionColumn` — see `SelfReviewEntity.version` for why.
   */
  @Column({ type: 'int', default: 1 })
  version: number;

  @ManyToOne(
    () => ReviewCycleEntity,
    (cycle) => cycle.performance_review_cycles_id,
    {
      onDelete: 'CASCADE',
    },
  )
  @JoinColumn({ name: 'performance_review_cycles_id' })
  cycle: ReviewCycleEntity;

  @OneToMany(() => ManagerReviewGoalEntity, (goal) => goal.managerReview, {
    cascade: true,
  })
  goals?: ManagerReviewGoalEntity[];

  /**
   * @deprecated Superseded by {@link goals}, which covers simple metric goals
   * as well as KRA/KPI ones. Retained so the tables are not dropped from under
   * anything still reading them; Stage 6 never writes here.
   */
  @OneToMany(() => ManagerReviewKraEntity, (kra) => kra.managerReview, {
    cascade: true,
  })
  kras: ManagerReviewKraEntity[];

  @BeforeInsert()
  assignCode(): void {
    if (!this.code) {
      this.code = generatePrefixedCode('MR');
    }
  }
}
