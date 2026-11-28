// src/database/entities/goal-kpi.entity.ts

import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { SharedEntity } from './shared.entity';
import { GoalKraEntity } from './goal-kra.entity';
import { GoalKpiType } from 'src/common/enum';

@Entity('goal_kpis')
@Index('idx_goal_kpis_kra', ['goalKraId'])
export class GoalKpiEntity extends SharedEntity {
  @PrimaryGeneratedColumn('uuid')
  goal_kpis_id: string;

  @Column({ type: 'uuid', name: 'goal_kra_id' })
  goalKraId: string;

  @ManyToOne(() => GoalKraEntity, (kra) => kra.kpis, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'goal_kra_id' })
  kra: GoalKraEntity;

  @Column({ type: 'varchar', length: 255 })
  title: string;

  @Column({ type: 'varchar', length: 50 })
  type: GoalKpiType;

  @Column({ type: 'varchar', length: 50, nullable: true })
  unit?: string | null;

  @Column({
    type: 'varchar',
    length: 255,
    name: 'target_value',
    nullable: true,
  })
  targetValue?: string | null;

  @Column({ type: 'timestamptz', nullable: true })
  deadline?: Date | null;

  @Column({ type: 'int' })
  weightage: number;

  @Column({ type: 'int', name: 'order_index', default: 0 })
  order: number;

  @Column({ type: 'float', name: 'current_value', nullable: true })
  currentValue?: number | null;

  @Column({ type: 'float', name: 'progress_percent', default: 0 })
  progressPercent: number;
}
