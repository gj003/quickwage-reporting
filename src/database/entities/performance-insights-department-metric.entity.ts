// src/database/entities/performance-insights-department-metric.entity.ts

import {
  BeforeInsert,
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { BaseEntityColumns } from './base-entity-columns.entity';
import { generatePrefixedCode } from 'src/common/utility';
import { PerformanceInsightsDepartmentEntity } from './performance-insights-department.entity';
import { PerformanceCycleEntity } from './performance-cycle.entity';

@Entity({ name: 'performance_insights_department_metrics' })
@Index('idx_department_metric_department', ['department_id'])
@Index('idx_department_metric_cycle', ['performance_cycle_id'])
export class PerformanceInsightsDepartmentMetricEntity extends BaseEntityColumns {
  @PrimaryGeneratedColumn('uuid', { name: 'department_metric_id' })
  department_metric_id: string;

  @Column({ type: 'varchar', length: 30, unique: true })
  code: string;

  @Column({ type: 'uuid', name: 'department_id' })
  department_id: string;

  @Column({ type: 'uuid', name: 'performance_cycle_id' })
  performance_cycle_id: string;

  @Column({
    type: 'numeric',
    precision: 2,
    scale: 1,
    name: 'average_score',
  })
  average_score: string;

  @Column({
    type: 'numeric',
    precision: 3,
    scale: 1,
    name: 'average_score_delta',
    default: () => '0',
  })
  average_score_delta: string;

  @Column({
    type: 'numeric',
    precision: 5,
    scale: 2,
    name: 'review_completion_pct',
  })
  review_completion_pct: string;

  @Column({ type: 'int', name: 'top_performers_count', default: 0 })
  top_performers_count: number;

  @Column({ type: 'int', name: 'at_risk_count', default: 0 })
  at_risk_count: number;

  @Column({ type: 'int', name: 'promotion_ready_count', default: 0 })
  promotion_ready_count: number;

  @Column({ type: 'int', name: 'employees_count', default: 0 })
  employees_count: number;

  @Column({ type: 'varchar', length: 40, name: 'team_health' })
  team_health: string;

  @Column({ type: 'varchar', length: 120, nullable: true })
  business_unit?: string | null;

  @Column({ type: 'varchar', length: 120, nullable: true })
  location?: string | null;

  @ManyToOne(
    () => PerformanceInsightsDepartmentEntity,
    (department) => department.department_id,
    { onDelete: 'CASCADE' },
  )
  @JoinColumn({ name: 'department_id', referencedColumnName: 'department_id' })
  department?: PerformanceInsightsDepartmentEntity;

  @ManyToOne(() => PerformanceCycleEntity, { onDelete: 'CASCADE' })
  @JoinColumn({
    name: 'performance_cycle_id',
    referencedColumnName: 'performance_cycle_id',
  })
  performanceCycle?: PerformanceCycleEntity;

  @BeforeInsert()
  assignCode(): void {
    if (!this.code) {
      this.code = generatePrefixedCode('DEPTMET');
    }
  }
}
