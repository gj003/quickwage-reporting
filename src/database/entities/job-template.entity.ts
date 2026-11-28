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
import { CompanyEntity } from './company.entity';
import { DepartmentEntity } from './department.entity';
import { JobListingEntity } from './job-listing.entity';
import { generatePrefixedCode } from 'src/common/utility';
import { UserEntity } from './user.entity';

@Index('idx_job_templates_company_deleted', ['company_id', 'deleted_at'])
@Index('idx_job_templates_company_department_deleted', [
  'company_id',
  'department_id',
  'deleted_at',
])
@Index('idx_job_templates_company_active_deleted', [
  'company_id',
  'is_active',
  'deleted_at',
])
@Index('idx_job_templates_company_source_job_deleted', [
  'company_id',
  'source_job_id',
  'deleted_at',
])
@Entity({ name: 'job_templates' })
export class JobTemplateEntity extends BaseEntityColumns {
  @PrimaryGeneratedColumn('uuid', { name: 'job_template_id' })
  job_template_id: string;
  @BeforeInsert()
  assignCode(): void {
    if (!this.job_template_code)
      this.job_template_code = generatePrefixedCode('JOB_TEMPLATE', 8);
  }

  @Column({ name: 'job_template_code', type: 'varchar', length: 64 })
  job_template_code: string;
  @Column({ name: 'company_id', type: 'uuid' })
  company_id: string;
  @ManyToOne(() => CompanyEntity, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'company_id', referencedColumnName: 'id' })
  company: CompanyEntity;
  @Column({ name: 'job_title', type: 'varchar', length: 200 })
  job_title: string;
  @Column({ name: 'department_id', type: 'int', nullable: true })
  department_id?: number | null;
  @ManyToOne(() => DepartmentEntity, { nullable: true, onDelete: 'SET NULL' })
  @JoinColumn({ name: 'department_id', referencedColumnName: 'id' })
  department?: DepartmentEntity | null;
  @Column({ name: 'description', type: 'text', nullable: true })
  description?: string | null;
  @Column({ name: 'description_plain_text', type: 'text', nullable: true })
  description_plain_text?: string | null;
  @Column({ name: 'skills', type: 'text', array: true, nullable: true })
  skills?: string[] | null;
  @Column({
    name: 'creation_source',
    type: 'varchar',
    length: 40,
    default: 'FROM_SCRATCH',
  })
  creation_source: string;
  @Column({ name: 'legacy_source_job_id', type: 'int', nullable: true })
  legacy_source_job_id?: number | null;
  @Column({ name: 'source_job_id', type: 'uuid', nullable: true })
  source_job_id?: string | null;
  @ManyToOne(() => JobListingEntity, {
    nullable: true,
    onDelete: 'SET NULL',
  })
  @JoinColumn({
    name: 'source_job_id',
    referencedColumnName: 'job_listing_id',
  })
  source_job?: JobListingEntity | null;
  @Column({ name: 'source_template_id', type: 'uuid', nullable: true })
  source_template_id?: string | null;
  @Column({ name: 'is_system_template', type: 'boolean', default: false })
  is_system_template: boolean;
  @Column({ name: 'is_active', type: 'boolean', default: true })
  is_active: boolean;
  @Column({ name: 'created_by', type: 'uuid', nullable: true })
  created_by?: string | null;
  @ManyToOne(() => UserEntity, { nullable: true, onDelete: 'SET NULL' })
  @JoinColumn({ name: 'created_by', referencedColumnName: 'user_id' })
  createdByUser?: UserEntity | null;
  @Column({ name: 'updated_by', type: 'uuid', nullable: true })
  updated_by?: string | null;
  @ManyToOne(() => UserEntity, { nullable: true, onDelete: 'SET NULL' })
  @JoinColumn({ name: 'updated_by', referencedColumnName: 'user_id' })
  updatedByUser?: UserEntity | null;
  @Column({ name: 'deleted_by', type: 'uuid', nullable: true })
  deleted_by?: string | null;
}
