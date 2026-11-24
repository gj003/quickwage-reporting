import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { BaseEntityColumns } from './base-entity-columns.entity';
import { CompanyEntity } from './company.entity';
import { RecruitmentSourceCategoryEntity } from './recruitment-source-category.entity';

@Index('idx_rec_sources_company_category_deleted', [
  'company_id',
  'recruitment_source_category_id',
  'deleted_at',
])
@Index('idx_rec_sources_company_category_active_order', [
  'company_id',
  'recruitment_source_category_id',
  'is_active',
  'display_order',
  'deleted_at',
])
@Entity({ name: 'recruitment_sources' })
export class RecruitmentSourceEntity extends BaseEntityColumns {
  @PrimaryGeneratedColumn('uuid', { name: 'recruitment_source_id' })
  recruitment_source_id: string;
  @Column({ name: 'source_code', type: 'varchar', length: 64 })
  source_code: string;
  @Column({ name: 'company_id', type: 'uuid' })
  company_id: string;
  @ManyToOne(() => CompanyEntity, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'company_id', referencedColumnName: 'id' })
  company: CompanyEntity;
  @Column({ name: 'recruitment_source_category_id', type: 'uuid' })
  recruitment_source_category_id: string;
  @ManyToOne(
    () => RecruitmentSourceCategoryEntity,
    (category) => category.sources,
    { onDelete: 'RESTRICT' },
  )
  @JoinColumn({
    name: 'recruitment_source_category_id',
    referencedColumnName: 'recruitment_source_category_id',
  })
  category: RecruitmentSourceCategoryEntity;
  @Column({ name: 'name', type: 'varchar', length: 120 })
  name: string;
  @Column({ name: 'description', type: 'text', nullable: true })
  description?: string | null;
  @Column({ name: 'display_order', type: 'int', default: 1 })
  display_order: number;
  @Column({ name: 'is_system_defined', type: 'boolean', default: false })
  is_system_defined: boolean;
  @Column({ name: 'is_active', type: 'boolean', default: true })
  is_active: boolean;
  @Column({ name: 'metadata', type: 'jsonb', nullable: true })
  metadata?: Record<string, unknown> | null;
  @Column({ name: 'created_by', type: 'uuid', nullable: true })
  created_by?: string | null;
  @Column({ name: 'updated_by', type: 'uuid', nullable: true })
  updated_by?: string | null;
  @Column({ name: 'deleted_by', type: 'uuid', nullable: true })
  deleted_by?: string | null;
}
