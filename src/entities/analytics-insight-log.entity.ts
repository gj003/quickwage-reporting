// src/database/entities/analytics-insight-log.entity.ts
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { SharedEntity } from './shared.entity';

@Entity('analytics_insight_logs')
export class AnalyticsInsightLogEntity extends SharedEntity {
  @PrimaryGeneratedColumn('uuid')
  analytics_insight_logs_id: string;

  @Column({ type: 'uuid' })
  company_id: string;

  @Column({ type: 'text' })
  message: string;

  @Column({ type: 'jsonb', default: () => "'{}'::jsonb" })
  context: Record<string, unknown>;
}
