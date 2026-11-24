// src/database/entities/team-metric.entity.ts

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
import { TeamEntity } from './team.entity';
import { PerformanceCycleEntity } from './performance-cycle.entity';

@Entity({ name: 'team_metrics' })
@Index('idx_team_metric_team', ['team_id'])
@Index('idx_team_metric_cycle', ['cycle_id'])
export class TeamMetricEntity extends BaseEntityColumns {
  @PrimaryGeneratedColumn('uuid', { name: 'team_metric_id' })
  team_metric_id: string;

  @Column({ type: 'varchar', length: 30, unique: true })
  code: string;

  @Column({ type: 'uuid', name: 'team_id' })
  team_id: string;

  @Column({ type: 'uuid', name: 'cycle_id' })
  cycle_id: string;

  @Column({ type: 'numeric', precision: 2, scale: 1, name: 'avg_performance' })
  avg_performance: string;

  @Column({
    type: 'numeric',
    precision: 5,
    scale: 2,
    name: 'goal_progress_pct',
  })
  goal_progress_pct: string;

  @Column({ type: 'int', name: 'top_performers_count', default: 0 })
  top_performers_count: number;

  @Column({ type: 'int', name: 'team_size', default: 0 })
  team_size: number;

  @ManyToOne(() => TeamEntity, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'team_id', referencedColumnName: 'team_id' })
  team?: TeamEntity;

  @ManyToOne(() => PerformanceCycleEntity, { onDelete: 'CASCADE' })
  @JoinColumn({
    name: 'cycle_id',
    referencedColumnName: 'performance_cycle_id',
  })
  cycle?: PerformanceCycleEntity;

  @BeforeInsert()
  assignCode(): void {
    if (!this.code) {
      this.code = generatePrefixedCode('TMET');
    }
  }
}
