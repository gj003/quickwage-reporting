// src/database/entities/self-review-goal.entity.ts

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
import { SelfReviewEntity } from './self-review.entity';
import { GoalEntity } from './goal.entity';
import { SelfReviewGoalKpiEntity } from './self-review-goal-kpi.entity';
import { PerformanceRatingCode } from 'src/common/enum';

export interface SelfReviewEvidence {
  label: string;
  url: string;
}

/**
 * One goal as it appeared to the employee at the moment they started their self
 * review, plus their assessment of it.
 *
 * The `*_snapshot` columns are frozen on creation on purpose: a goal edited
 * after the review started must not silently rewrite what the employee was
 * assessed against.
 */
@Entity('self_review_goals')
@Index('idx_self_review_goals_review', ['selfReviewId'])
@Index('idx_self_review_goals_unique', ['selfReviewId', 'goalId'], {
  unique: true,
})
export class SelfReviewGoalEntity extends SharedEntity {
  @PrimaryGeneratedColumn('uuid', { name: 'self_review_goal_id' })
  selfReviewGoalId: string;

  @Column({ type: 'uuid', name: 'self_review_id' })
  selfReviewId: string;

  @Column({ type: 'uuid', name: 'goal_id' })
  goalId: string;

  /**
   * True when the goal carries a numeric target (simple metric goal) or at
   * least one quantitative KPI. Drives whether `achieved_value` is accepted.
   */
  @Column({ type: 'boolean', name: 'is_measurable', default: false })
  isMeasurable: boolean;

  @Column({
    type: 'float',
    name: 'target_value_snapshot',
    nullable: true,
  })
  targetValueSnapshot?: number | null;

  @Column({ type: 'float', name: 'start_value_snapshot', nullable: true })
  startValueSnapshot?: number | null;

  @Column({ type: 'float', name: 'progress_percent_snapshot', default: 0 })
  progressPercentSnapshot: number;

  @Column({ type: 'float', name: 'achieved_value', nullable: true })
  achievedValue?: number | null;

  @Column({
    type: 'varchar',
    length: 20,
    name: 'self_rating',
    nullable: true,
  })
  selfRating?: PerformanceRatingCode | null;

  @Column({ type: 'text', name: 'self_comment', nullable: true })
  selfComment?: string | null;

  @Column({ type: 'jsonb', default: () => "'[]'" })
  evidence: SelfReviewEvidence[];

  @Column({ type: 'int', name: 'order_index', default: 0 })
  orderIndex: number;

  @ManyToOne(() => SelfReviewEntity, (review) => review.goals, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'self_review_id' })
  selfReview?: SelfReviewEntity;

  @ManyToOne(() => GoalEntity, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'goal_id' })
  goal?: GoalEntity;

  @OneToMany(() => SelfReviewGoalKpiEntity, (kpi) => kpi.selfReviewGoal, {
    cascade: true,
  })
  kpis?: SelfReviewGoalKpiEntity[];
}
