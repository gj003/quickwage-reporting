// src/database/entities/goal.entity.ts

import {
  BeforeInsert,
  Column,
  Entity,
  Index,
  OneToMany,
  PrimaryGeneratedColumn,
  VersionColumn,
} from 'typeorm';
import { SharedEntity } from './shared.entity';
import { GoalKraEntity } from './goal-kra.entity';
import { GoalActivityEntity } from './goal-activity.entity';
import {
  GoalPriority,
  GoalStatus,
  GoalTypeKey,
  GoalVisibility,
} from 'src/common/enum';
import { generatePrefixedCode } from 'src/common/utility';

@Entity('goals')
@Index('idx_goals_company_status', ['companyId', 'status'])
@Index('idx_goals_company_category', ['companyId', 'category'])
@Index('idx_goals_parent', ['parentGoalId'])
@Index('idx_goals_review_cycle', ['reviewCycleId'])
export class GoalEntity extends SharedEntity {
  @PrimaryGeneratedColumn('uuid')
  goals_id: string;

  @Column({ type: 'varchar', length: 30, unique: true })
  code: string;

  @Column({
    type: 'varchar',
    length: 30,
    unique: true,
    name: 'goal_code',
    nullable: true,
  })
  goalCode: string | null;

  @Column({ type: 'uuid', name: 'company_id' })
  companyId: string;

  @Column({ type: 'varchar', length: 255 })
  title: string;

  // Nullable: only required for the legacy KRA/KPI goal flow. The simpler
  // metric-based flow (goal_type/time_frame/metric) doesn't collect this.
  @Column({ type: 'varchar', length: 100, nullable: true })
  category?: string | null;

  @Column({ type: 'text', nullable: true })
  description?: string | null;

  @Column({ type: 'int', name: 'goal_weightage', default: 100 })
  goalWeightage: number;

  @Column({ type: 'date', name: 'start_date', nullable: true })
  startDate?: string | null;

  @Column({ type: 'date', name: 'end_date', nullable: true })
  endDate?: string | null;

  @Column({
    type: 'varchar',
    length: 50,
    default: GoalStatus.DRAFT,
  })
  status: GoalStatus;

  @Column({
    type: 'varchar',
    length: 50,
    default: GoalPriority.MEDIUM,
  })
  priority: GoalPriority;

  @Column({ type: 'uuid', name: 'assigned_to_user_id', nullable: true })
  assignedToUserId?: string | null;

  @Column({ type: 'uuid', name: 'assigned_by_user_id', nullable: true })
  assignedByUserId?: string | null;

  @Column({ type: 'varchar', length: 255 })
  source: string;

  @Column({ type: 'float', name: 'progress_percent', default: 0 })
  progressPercent: number;

  @Column({ type: 'varchar', array: true, nullable: true })
  tags?: string[] | null;

  // ─── Simple metric-based goal fields (create-goal form) ─────────────────
  @Column({ type: 'varchar', length: 20, name: 'goal_type', nullable: true })
  goalType?: GoalTypeKey | null;

  // References goal_time_frames.goal_time_frame_id — the "Goal period"
  @Column({ type: 'uuid', name: 'time_frame_id', nullable: true })
  timeFrameId?: string | null;

  // References goal_metrics.goal_metric_id — the "Measured by" metric
  @Column({ type: 'uuid', name: 'metric_id', nullable: true })
  metricId?: string | null;

  @Column({ type: 'float', name: 'start_value', nullable: true })
  startValue?: number | null;

  @Column({ type: 'float', name: 'target_value', nullable: true })
  targetValue?: number | null;

  @Column({
    type: 'varchar',
    length: 20,
    default: GoalVisibility.EVERYONE,
  })
  visibility: GoalVisibility;

  // Self-reference for sub-goals — the parent this goal is nested under
  @Column({ type: 'uuid', name: 'parent_goal_id', nullable: true })
  parentGoalId?: string | null;

  // References performance_review_cycles.performance_review_cycles_id — the
  // review cycle this goal's performance is tracked against, if any.
  @Column({ type: 'uuid', name: 'review_cycle_id', nullable: true })
  reviewCycleId?: string | null;

  @VersionColumn({ default: 1 })
  version: number;

  @OneToMany(() => GoalKraEntity, (kra) => kra.goal, { cascade: true })
  kras?: GoalKraEntity[];

  @OneToMany(() => GoalActivityEntity, (activity) => activity.goal, {
    cascade: ['insert'],
  })
  activities?: GoalActivityEntity[];

  @BeforeInsert()
  assignCodes(): void {
    if (!this.code) {
      this.code = generatePrefixedCode('GOAL');
    }

    if (!this.goalCode) {
      this.goalCode = generatePrefixedCode('GOAL');
    }
  }
}
