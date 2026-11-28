// src/database/entities/manager-review-goal-kpi.entity.ts

import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { SharedEntity } from './shared.entity';
import { ManagerReviewGoalEntity } from './manager-review-goal.entity';
import { GoalKpiEntity } from './goal-kpi.entity';
import { PerformanceRatingCode } from 'src/common/enum';

/**
 * KPI-level detail for goals built from KRAs/KPIs, mirroring
 * `self_review_goal_kpis` so the two stages line up per KPI.
 */
@Entity('manager_review_goal_kpis')
@Index('idx_manager_review_goal_kpis_goal', ['managerReviewGoalId'])
@Index(
  'idx_manager_review_goal_kpis_unique',
  ['managerReviewGoalId', 'goalKpiId'],
  { unique: true },
)
export class ManagerReviewGoalKpiEntity extends SharedEntity {
  @PrimaryGeneratedColumn('uuid', { name: 'manager_review_goal_kpi_id' })
  managerReviewGoalKpiId: string;

  @Column({ type: 'uuid', name: 'manager_review_goal_id' })
  managerReviewGoalId: string;

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

  @ManyToOne(() => ManagerReviewGoalEntity, (goal) => goal.kpis, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'manager_review_goal_id' })
  managerReviewGoal?: ManagerReviewGoalEntity;

  @ManyToOne(() => GoalKpiEntity, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'goal_kpi_id' })
  goalKpi?: GoalKpiEntity;
}
