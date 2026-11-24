// src/database/entities/goal-kra.entity.ts

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
import { GoalEntity } from './goal.entity';
import { GoalKpiEntity } from './goal-kpi.entity';

@Entity('goal_kras')
@Index('idx_goal_kras_goal', ['goalId'])
export class GoalKraEntity extends SharedEntity {
  @PrimaryGeneratedColumn('uuid')
  goal_kras_id: string;

  @Column({ type: 'uuid', name: 'goal_id' })
  goalId: string;

  // Without the JoinColumn TypeORM joins on its own `goalGoalsId` column, which
  // nothing writes — so `relations: { kras }` loaded no KRAs for any goal.
  @ManyToOne(() => GoalEntity, (goal) => goal.kras, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({
    name: 'goal_id',
    foreignKeyConstraintName: 'fk_goal_kras_goal',
  })
  goal: GoalEntity;

  @Column({ type: 'varchar', length: 255 })
  title: string;

  @Column({ type: 'text', nullable: true })
  description?: string | null;

  @Column({ type: 'int' })
  weightage: number;

  @Column({ type: 'int', name: 'order_index', default: 0 })
  order: number;

  @OneToMany(() => GoalKpiEntity, (kpi) => kpi.kra, { cascade: true })
  kpis?: GoalKpiEntity[];
}
