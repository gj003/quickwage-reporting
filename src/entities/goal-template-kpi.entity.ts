// src/database/entities/goal-template-kpi.entity.ts

import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { SharedEntity } from './shared.entity';
import { GoalTemplateKraEntity } from './goal-template-kra.entity';
import { GoalKpiType } from 'src/common/enum';

@Entity('goal_template_kpis')
@Index('idx_goal_template_kpis_kra', ['templateKraId'])
export class GoalTemplateKpiEntity extends SharedEntity {
  @PrimaryGeneratedColumn('uuid')
  goal_template_kpis_id: string;

  @Column({ type: 'uuid', name: 'template_kra_id' })
  templateKraId: string;

  @ManyToOne(() => GoalTemplateKraEntity, (kra) => kra.kpis, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'template_kra_id' })
  kra: GoalTemplateKraEntity;

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

  @Column({ type: 'int', name: 'default_deadline_days', nullable: true })
  defaultDeadlineDays?: number | null;

  @Column({ type: 'int' })
  weightage: number;

  @Column({ type: 'int', name: 'order_index', default: 0 })
  order: number;
}
