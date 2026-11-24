import {
  BeforeInsert,
  Column,
  Entity,
  Index,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { BaseEntityColumns } from './base-entity-columns.entity';
import { generatePrefixedCode } from 'src/common/utility';

@Entity({ name: 'skill_categories' })
@Index('idx_skill_categories_company_name', ['companyId', 'name'], {
  unique: true,
  where: 'deleted_at IS NULL',
})
export class SkillCategoryEntity extends BaseEntityColumns {
  @PrimaryGeneratedColumn('uuid', { name: 'skill_category_id' })
  skillCategoryId: string;

  @Column({ type: 'varchar', name: 'skill_category_code', unique: true })
  skillCategoryCode: string;

  @Column({ type: 'uuid', name: 'company_id' })
  companyId: string;

  @Column({ type: 'varchar', length: 120 })
  name: string;

  @Column({ type: 'text', nullable: true })
  description?: string | null;

  @BeforeInsert()
  ensureCode(): void {
    if (!this.skillCategoryCode) {
      this.skillCategoryCode = generatePrefixedCode('SKCAT');
    }
  }
}
