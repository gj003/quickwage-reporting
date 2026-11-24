// src/database/entities/team.entity.ts

import {
  BeforeInsert,
  Column,
  Entity,
  Index,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { BaseEntityColumns } from './base-entity-columns.entity';
import { generatePrefixedCode } from 'src/common/utility';

@Entity({ name: 'teams' })
@Index('idx_teams_company_manager', ['company_id', 'manager_id'])
export class TeamEntity extends BaseEntityColumns {
  @PrimaryGeneratedColumn('uuid', { name: 'team_id' })
  team_id: string;

  @Column({ name: 'company_id', type: 'uuid' })
  company_id: string;

  @Column({ type: 'varchar', length: 30, unique: true })
  code: string;

  @Column({ type: 'varchar', length: 150 })
  name: string;

  @Column({ type: 'varchar', length: 64, name: 'manager_id' })
  manager_id: string;

  @BeforeInsert()
  assignCode(): void {
    if (!this.code) {
      this.code = generatePrefixedCode('TEAM');
    }
  }
}
