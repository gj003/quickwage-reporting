// src/database/entities/team-member-scoreboard.entity.ts

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

@Entity({ name: 'team_member_scoreboards' })
@Index('idx_team_member_scoreboard_team', ['team_id'])
export class TeamMemberScoreboardEntity extends BaseEntityColumns {
  @PrimaryGeneratedColumn('uuid', { name: 'team_member_scoreboard_id' })
  team_member_scoreboard_id: string;

  @Column({ type: 'varchar', length: 30, unique: true })
  code: string;

  @Column({ type: 'uuid', name: 'team_id' })
  team_id: string;

  @Column({ type: 'varchar', length: 64, name: 'employee_id' })
  employee_id: string;

  @Column({ type: 'varchar', length: 150, name: 'employee_name' })
  employee_name: string;

  @Column({ type: 'varchar', length: 120, name: 'role_title' })
  role_title: string;

  @Column({
    type: 'numeric',
    precision: 2,
    scale: 1,
    name: 'performance_score',
  })
  performance_score: string;

  @Column({
    type: 'numeric',
    precision: 5,
    scale: 2,
    name: 'goal_progress_pct',
  })
  goal_progress_pct: string;

  @Column({
    type: 'varchar',
    array: true,
    default: () => 'ARRAY[]::varchar[]',
    name: 'feedback_tags',
  })
  feedback_tags: string[];

  @Column({ type: 'date', name: 'last_one_on_one', nullable: true })
  last_one_on_one?: Date | null;

  @ManyToOne(() => TeamEntity, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'team_id', referencedColumnName: 'team_id' })
  team?: TeamEntity;

  @BeforeInsert()
  assignCode(): void {
    if (!this.code) {
      this.code = generatePrefixedCode('TSB');
    }
  }
}
