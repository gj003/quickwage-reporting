// src/database/entities/goal-template.entity.ts

import {
  BeforeInsert,
  Column,
  Entity,
  Index,
  OneToMany,
  PrimaryGeneratedColumn,
  VersionColumn,
} from 'typeorm';
import { SharedEntity } from './shared.entity';
import { GoalTemplateKraEntity } from './goal-template-kra.entity';
import { generatePrefixedCode } from 'src/common/utility';

@Entity('goal_templates')
@Index('idx_goal_templates_company_category', ['companyId', 'category'])
@Index('idx_goal_templates_company_title', ['companyId', 'title'])
export class GoalTemplateEntity extends SharedEntity {
  @PrimaryGeneratedColumn('uuid')
  goal_templates_id: string;

  @Column({ type: 'varchar', length: 30, unique: true })
  code: string;

  @Column({ type: 'uuid', name: 'company_id' })
  companyId: string;

  @Column({ type: 'varchar', length: 255 })
  title: string;

  @Column({ type: 'varchar', length: 100 })
  category: string;

  @Column({ type: 'text', nullable: true })
  description?: string | null;

  @Column({ type: 'int', name: 'default_weightage', default: 100 })
  defaultWeightage: number;

  @Column({
    type: 'varchar',
    length: 120,
    name: 'recommended_role',
    nullable: true,
  })
  recommendedRole?: string | null;

  @Column({ type: 'varchar', array: true, nullable: true })
  tags?: string[] | null;

  @VersionColumn({ default: 1 })
  version: number;

  @OneToMany(() => GoalTemplateKraEntity, (kra) => kra.template, {
    cascade: true,
  })
  kras?: GoalTemplateKraEntity[];

  @BeforeInsert()
  assignCode(): void {
    if (!this.code) {
      this.code = generatePrefixedCode('GOT');
    }
  }
}
