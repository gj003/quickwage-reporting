// src/database/entities/team-trend-point.entity.ts

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

@Entity({ name: 'team_trend_points' })
@Index('idx_team_trend_team', ['team_id'])
export class TeamTrendPointEntity extends BaseEntityColumns {
  @PrimaryGeneratedColumn('uuid', { name: 'team_trend_point_id' })
  team_trend_point_id: string;

  @Column({ type: 'varchar', length: 30, unique: true })
  code: string;

  @Column({ type: 'uuid', name: 'team_id' })
  team_id: string;

  @Column({ type: 'date', name: 'month' })
  month: Date;

  @Column({
    type: 'numeric',
    precision: 2,
    scale: 1,
    name: 'performance_score',
  })
  performance_score: string;

  @ManyToOne(() => TeamEntity, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'team_id', referencedColumnName: 'team_id' })
  team?: TeamEntity;

  @BeforeInsert()
  assignCode(): void {
    if (!this.code) {
      this.code = generatePrefixedCode('TTP');
    }
  }
}
