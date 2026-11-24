// src/database/entities/manager-review-goal.entity.ts

import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { SharedEntity } from './shared.entity';
import { ManagerReviewEntity } from './manager-review.entity';
import { GoalEntity } from './goal.entity';
import { ManagerReviewGoalKpiEntity } from './manager-review-goal-kpi.entity';
import { PerformanceRatingCode } from 'src/common/enum';

/**
 * The manager's assessment of one goal, alongside the same frozen snapshot the
 * employee saw in Stage 5.
 *
 * Deliberately keyed on `goal_id` rather than on a KRA, so it covers simple
 * metric goals too — the older `manager_review_kras` table could only describe
 * KRA/KPI goals, leaving metric goals unreviewable.
 *
 * Rows line up 1:1 with `self_review_goals` for the same cycle and employee,
 * which is what lets a screen show self and manager ratings side by side.
 */
@Entity('manager_review_goals')
@Index('idx_manager_review_goals_review', ['managerReviewId'])
@Index('idx_manager_review_goals_unique', ['managerReviewId', 'goalId'], {
  unique: true,
})
export class ManagerReviewGoalEntity extends SharedEntity {
  @PrimaryGeneratedColumn('uuid', { name: 'manager_review_goal_id' })
  managerReviewGoalId: string;

  @Column({ type: 'uuid', name: 'manager_reviews_id' })
  managerReviewId: string;

  @Column({ type: 'uuid', name: 'goal_id' })
  goalId: string;

  @Column({ type: 'boolean', name: 'is_measurable', default: false })
  isMeasurable: boolean;

  @Column({ type: 'float', name: 'target_value_snapshot', nullable: true })
  targetValueSnapshot?: number | null;

  @Column({ type: 'float', name: 'start_value_snapshot', nullable: true })
  startValueSnapshot?: number | null;

  @Column({ type: 'float', name: 'progress_percent_snapshot', default: 0 })
  progressPercentSnapshot: number;

  /** Weightage frozen at start time, used for the weighted overall suggestion. */
  @Column({ type: 'int', name: 'weightage_snapshot', default: 0 })
  weightageSnapshot: number;

  /** Derived from tracked progress — what the manager sees before deciding. */
  @Column({
    type: 'varchar',
    length: 20,
    name: 'suggested_rating',
    nullable: true,
  })
  suggestedRating?: PerformanceRatingCode | null;

  @Column({
    type: 'varchar',
    length: 20,
    name: 'manager_rating',
    nullable: true,
  })
  managerRating?: PerformanceRatingCode | null;

  @Column({ type: 'text', name: 'manager_comment', nullable: true })
  managerComment?: string | null;

  @Column({ type: 'int', name: 'order_index', default: 0 })
  orderIndex: number;

  @ManyToOne(() => ManagerReviewEntity, (review) => review.goals, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'manager_reviews_id' })
  managerReview?: ManagerReviewEntity;

  @ManyToOne(() => GoalEntity, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'goal_id' })
  goal?: GoalEntity;

  @OneToMany(() => ManagerReviewGoalKpiEntity, (kpi) => kpi.managerReviewGoal, {
    cascade: true,
  })
  kpis?: ManagerReviewGoalKpiEntity[];
}
