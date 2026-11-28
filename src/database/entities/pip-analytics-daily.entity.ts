// src/database/entities/pip-analytics-daily.entity.ts

import { Column, Entity, Index, PrimaryGeneratedColumn } from 'typeorm';
import { SharedEntity } from './shared.entity';

@Entity('pip_analytics_daily')
@Index('idx_pip_analytics_daily_company_date', ['companyId', 'date'], {
  unique: true,
})
export class PipAnalyticsDailyEntity extends SharedEntity {
  @PrimaryGeneratedColumn('uuid', { name: 'pip_analytics_daily_id' })
  pipAnalyticsDailyId: string;

  @Column({ type: 'date' })
  date: string;

  @Column({ type: 'uuid', name: 'company_id' })
  companyId: string;

  @Column({ type: 'int', name: 'total_pips', default: 0 })
  totalPips: number;

  @Column({ type: 'int', name: 'active_pips', default: 0 })
  activePips: number;

  @Column({
    type: 'numeric',
    precision: 5,
    scale: 2,
    name: 'avg_duration_days',
    nullable: true,
  })
  avgDurationDays?: number | null;

  @Column({
    type: 'numeric',
    precision: 5,
    scale: 2,
    name: 'completion_rate_pct',
    nullable: true,
  })
  completionRatePct?: number | null;

  @Column({
    type: 'numeric',
    precision: 5,
    scale: 2,
    name: 'early_completion_rate_pct',
    nullable: true,
  })
  earlyCompletionRatePct?: number | null;

  @Column({
    type: 'numeric',
    precision: 5,
    scale: 2,
    name: 'manager_engagement_pct',
    nullable: true,
  })
  managerEngagementPct?: number | null;

  @Column({ type: 'jsonb', name: 'by_department', nullable: true })
  byDepartment?: Record<string, unknown> | null;

  @Column({ type: 'uuid', name: 'created_by' })
  createdBy: string;

  @Column({ type: 'uuid', name: 'updated_by' })
  updatedBy: string;
}
