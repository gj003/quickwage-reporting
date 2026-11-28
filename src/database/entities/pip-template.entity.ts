// src/database/entities/pip-template.entity.ts

import {
  BeforeInsert,
  Column,
  Entity,
  Index,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { SharedEntity } from './shared.entity';
import { PipEntity } from './pip.entity';
import { generatePrefixedCode } from 'src/common/utility';

@Entity('pip_templates')
@Index('idx_pip_templates_company', ['companyId'])
export class PipTemplateEntity extends SharedEntity {
  @PrimaryGeneratedColumn('uuid', { name: 'pip_template_id' })
  pipTemplateId: string;

  @Column({
    type: 'varchar',
    length: 30,
    name: 'pip_template_code',
    unique: true,
  })
  pipTemplateCode: string;

  @Column({ type: 'uuid', name: 'company_id' })
  companyId: string;

  @Column({ type: 'varchar', length: 255 })
  title: string;

  @Column({ type: 'varchar', length: 50 })
  category: string;

  @Column({ type: 'text', nullable: true })
  description?: string | null;

  @Column({ type: 'int', name: 'default_duration_days', nullable: true })
  defaultDurationDays?: number | null;

  @Column({
    type: 'varchar',
    array: true,
    nullable: true,
  })
  tags?: string[] | null;

  @Column({
    type: 'varchar',
    array: true,
    nullable: true,
  })
  industries?: string[] | null;

  @Column({
    type: 'numeric',
    precision: 5,
    scale: 2,
    nullable: true,
    name: 'success_rate',
  })
  successRate?: number | null;

  @Column({ type: 'int', name: 'avg_duration_days', nullable: true })
  avgDurationDays?: number | null;

  @Column({ type: 'int', name: 'used_count', nullable: true })
  usedCount?: number | null;

  @Column({ type: 'varchar', length: 50, default: 'PUBLIC' })
  visibility: string;

  @Column({ type: 'uuid', name: 'created_by' })
  createdBy: string;

  @Column({ type: 'uuid', name: 'updated_by' })
  updatedBy: string;

  @OneToMany(() => PipEntity, (pip) => pip.template)
  pips?: PipEntity[];

  @BeforeInsert()
  assignTemplateCode(): void {
    if (!this.pipTemplateCode) {
      this.pipTemplateCode = generatePrefixedCode('PIP-TPL');
    }
  }
}
