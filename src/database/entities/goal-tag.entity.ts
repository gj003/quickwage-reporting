// src/database/entities/goal-tag.entity.ts

import {
  BeforeInsert,
  Column,
  Entity,
  Index,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { BaseEntityColumns } from './base-entity-columns.entity';
import { generatePrefixedCode } from 'src/common/utility';
import { GoalTagVisibility } from 'src/common/enum';

@Entity({ name: 'goal_tags' })
@Index('idx_goal_tags_company', ['companyId'])
export class GoalTagEntity extends BaseEntityColumns {
  @PrimaryGeneratedColumn('uuid', { name: 'goal_tag_id' })
  goalTagId: string;

  @Column({ type: 'varchar', name: 'goal_tag_code', unique: true })
  goalTagCode: string;

  @Column({ type: 'uuid', name: 'company_id' })
  companyId: string;

  @Column({ type: 'varchar', length: 100 })
  name: string;

  @Column({
    type: 'varchar',
    length: 20,
    default: GoalTagVisibility.VISIBLE,
  })
  visibility: GoalTagVisibility;

  @Column({ type: 'varchar', length: 50, default: 'active' })
  status: string;

  @Column({ type: 'uuid', name: 'created_by', nullable: true })
  createdBy?: string | null;

  @Column({ type: 'uuid', name: 'updated_by', nullable: true })
  updatedBy?: string | null;

  @BeforeInsert()
  ensureDefaults(): void {
    if (!this.goalTagCode) {
      this.goalTagCode = generatePrefixedCode('GOALTAG');
    }

    if (!this.status) {
      this.status = 'active';
    }
  }
}
