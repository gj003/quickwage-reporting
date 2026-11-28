// src/database/entities/goal-activity.entity.ts

import {
  Column,
  Entity,
  Index,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { SharedEntity } from './shared.entity';
import { GoalEntity } from './goal.entity';

@Entity('goal_activities')
@Index('idx_goal_activity_goal', ['goalId'])
export class GoalActivityEntity extends SharedEntity {
  @PrimaryGeneratedColumn('uuid')
  goal_activities_id: string;

  @Column({ type: 'uuid', name: 'goal_id' })
  goalId: string;

  @ManyToOne(() => GoalEntity, (goal) => goal.activities, {
    onDelete: 'CASCADE',
  })
  goal: GoalEntity;

  @Column({ type: 'uuid', name: 'actor_id', nullable: true })
  actorId?: string | null;

  @Column({ type: 'varchar', length: 100 })
  action: string;

  @Column({ type: 'jsonb', nullable: true })
  diff?: Record<string, unknown> | null;
}
