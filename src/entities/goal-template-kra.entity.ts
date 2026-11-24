// src/database/entities/goal-template-kra.entity.ts

import {
  Column,
  Entity,
  Index,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { SharedEntity } from './shared.entity';
import { GoalTemplateEntity } from './goal-template.entity';
import { GoalTemplateKpiEntity } from './goal-template-kpi.entity';

@Entity('goal_template_kras')
@Index('idx_goal_template_kras_template', ['templateId'])
export class GoalTemplateKraEntity extends SharedEntity {
  @PrimaryGeneratedColumn('uuid')
  goal_template_kras_id: string;

  @Column({ type: 'uuid', name: 'template_id' })
  templateId: string;

  @ManyToOne(() => GoalTemplateEntity, (template) => template.kras, {
    onDelete: 'CASCADE',
  })
  template: GoalTemplateEntity;

  @Column({ type: 'varchar', length: 255 })
  title: string;

  @Column({ type: 'text', nullable: true })
  description?: string | null;

  @Column({ type: 'int' })
  weightage: number;

  @Column({ type: 'int', name: 'order_index', default: 0 })
  order: number;

  @OneToMany(() => GoalTemplateKpiEntity, (kpi) => kpi.kra, { cascade: true })
  kpis?: GoalTemplateKpiEntity[];
}
