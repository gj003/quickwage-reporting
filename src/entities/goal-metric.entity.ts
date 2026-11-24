// src/database/entities/goal-metric.entity.ts

import {
  BeforeInsert,
  Column,
  Entity,
  Index,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { BaseEntityColumns } from './base-entity-columns.entity';
import { generatePrefixedCode } from 'src/common/utility';

@Entity({ name: 'goal_metrics' })
@Index('idx_goal_metrics_company', ['companyId'])
export class GoalMetricEntity extends BaseEntityColumns {
  @PrimaryGeneratedColumn('uuid', { name: 'goal_metric_id' })
  goalMetricId: string;

  @Column({ type: 'varchar', name: 'goal_metric_code', unique: true })
  goalMetricCode: string;

  @Column({ type: 'uuid', name: 'company_id' })
  companyId: string;

  @Column({ type: 'varchar', length: 100 })
  name: string;

  @Column({ type: 'varchar', length: 500, nullable: true })
  description?: string | null;

  @Column({ type: 'varchar', length: 50, default: 'active' })
  status: string;

  @Column({ type: 'uuid', name: 'created_by', nullable: true })
  createdBy?: string | null;

  @Column({ type: 'uuid', name: 'updated_by', nullable: true })
  updatedBy?: string | null;

  @BeforeInsert()
  ensureDefaults(): void {
    if (!this.goalMetricCode) {
      this.goalMetricCode = generatePrefixedCode('GOALMETRIC');
    }

    if (!this.status) {
      this.status = 'active';
    }
  }
}
