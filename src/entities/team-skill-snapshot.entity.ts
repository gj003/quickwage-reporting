// src/database/entities/team-skill-snapshot.entity.ts

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

@Entity({ name: 'team_skill_snapshots' })
@Index('idx_team_skill_team_cycle', ['team_id', 'cycle_id'])
export class TeamSkillSnapshotEntity extends BaseEntityColumns {
  @PrimaryGeneratedColumn('uuid', { name: 'team_skill_snapshot_id' })
  team_skill_snapshot_id: string;

  @Column({ type: 'varchar', length: 30, unique: true })
  code: string;

  @Column({ type: 'uuid', name: 'team_id' })
  team_id: string;

  @Column({ type: 'uuid', name: 'cycle_id' })
  cycle_id: string;

  @Column({ type: 'numeric', precision: 2, scale: 1 })
  technical: string;

  @Column({ type: 'numeric', precision: 2, scale: 1 })
  communication: string;

  @Column({ type: 'numeric', precision: 2, scale: 1 })
  leadership: string;

  @Column({ type: 'numeric', precision: 2, scale: 1, name: 'problem_solving' })
  problem_solving: string;

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
      this.code = generatePrefixedCode('TSS');
    }
  }
}
