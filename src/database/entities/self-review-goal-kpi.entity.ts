// src/database/entities/self-review-goal-kpi.entity.ts

import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { SharedEntity } from './shared.entity';
import { SelfReviewGoalEntity } from './self-review-goal.entity';
import { GoalKpiEntity } from './goal-kpi.entity';
import { PerformanceRatingCode } from 'src/common/enum';

/**
 * KPI-level detail for goals built from KRAs/KPIs. Deliberately mirrors
 * `manager_review_kpis` so a later stage can render self and manager
 * assessments of the same KPI side by side.
 *
 * Simple metric goals have no rows here — their assessment stops at
 * `self_review_goals`.
 */
@Entity('self_review_goal_kpis')
@Index('idx_self_review_goal_kpis_goal', ['selfReviewGoalId'])
@Index('idx_self_review_goal_kpis_unique', ['selfReviewGoalId', 'goalKpiId'], {
  unique: true,
})
export class SelfReviewGoalKpiEntity extends SharedEntity {
  @PrimaryGeneratedColumn('uuid', { name: 'self_review_goal_kpi_id' })
  selfReviewGoalKpiId: string;

  @Column({ type: 'uuid', name: 'self_review_goal_id' })
  selfReviewGoalId: string;

  @Column({ type: 'uuid', name: 'goal_kpi_id' })
  goalKpiId: string;

  @Column({
    type: 'varchar',
    length: 255,
    name: 'target_value_snapshot',
    nullable: true,
  })
  targetValueSnapshot?: string | null;

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

  @ManyToOne(() => SelfReviewGoalEntity, (goal) => goal.kpis, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'self_review_goal_id' })
  selfReviewGoal?: SelfReviewGoalEntity;

  @ManyToOne(() => GoalKpiEntity, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'goal_kpi_id' })
  goalKpi?: GoalKpiEntity;
}
