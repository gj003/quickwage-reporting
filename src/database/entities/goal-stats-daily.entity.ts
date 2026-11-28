// src/database/entities/goal-stats-daily.entity.ts

import { Column, Entity, Index, PrimaryGeneratedColumn, Unique } from 'typeorm';
import { SharedEntity } from './shared.entity';

@Entity('goal_stats_daily')
@Unique('uniq_goal_stats_company_date', ['companyId', 'date'])
@Index('idx_goal_stats_company', ['companyId'])
export class GoalStatsDailyEntity extends SharedEntity {
  @PrimaryGeneratedColumn('uuid')
  goal_stats_daily_id: string;

  @Column({ type: 'uuid', name: 'company_id' })
  companyId: string;

  @Column({ type: 'date' })
  date: string;

  @Column({ type: 'jsonb', default: () => "'{}'::jsonb" })
  totals: Record<string, unknown>;
}
