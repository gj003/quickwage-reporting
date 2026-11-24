import {
  BeforeInsert,
  BeforeUpdate,
  Column,
  Entity,
  Index,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { BaseEntityColumns } from './base-entity-columns.entity';
import { generatePrefixedCode } from 'src/common/utility';

@Entity({ name: 'skills' })
@Index('idx_skills_company_category', ['companyId', 'category'])
@Index('idx_skills_company_department', ['companyId', 'departmentId'])
export class SkillEntity extends BaseEntityColumns {
  @PrimaryGeneratedColumn('uuid', { name: 'skill_id' })
  skillId: string;

  @Column({
    type: 'varchar',
    name: 'skill_code',
    unique: true,
  })
  skillCode: string;

  @Column({ type: 'uuid', name: 'company_id' })
  companyId: string;

  @Column({ type: 'varchar', length: 255 })
  name: string;

  @Column({ type: 'text', nullable: true })
  description?: string | null;

  @Column({ type: 'varchar', length: 100, nullable: true })
  category?: string | null;

  @Column({ type: 'varchar', name: 'department_id', nullable: true })
  departmentId?: string | null;

  @Column({ type: 'text', array: true, default: () => "'{}'" })
  tags: string[];

  @Column({ type: 'int', default: 4 })
  levels: number;

  @BeforeInsert()
  ensureCode(): void {
    if (!this.skillCode) {
      this.skillCode = generatePrefixedCode('SKILL');
    }
  }

  @BeforeInsert()
  @BeforeUpdate()
  ensureDefaults(): void {
    if (!this.tags) {
      this.tags = [];
    }
    if (!this.levels) {
      this.levels = 4;
    }
  }
}
