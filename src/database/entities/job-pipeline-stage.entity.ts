// src/database/entities/job-pipeline-stage.entity.ts

import {
  BeforeInsert,
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { SharedEntity } from './shared.entity';
import { CompanyEntity } from './company.entity';
import { JobListingEntity } from './job-listing.entity';
import { generatePrefixedCode } from 'src/common/utility';

/**
 * Per-job, tenant-configurable hiring pipeline stage (the "Hiring Flow" tab).
 * Deliberately separate from CandidateEntity.stage/CandidateStage - that
 * fixed 7-value enum remains the source of truth for the existing Hire
 * Dashboard funnel and candidate filters (backward compatibility). This is
 * the free-form, renameable/reorderable per-job kanban stage list the
 * screenshots show, referenced from CandidateEntity.pipeline_stage_id.
 */
@Index('idx_job_pipeline_stages_job_deleted', [
  'company_id',
  'job_listing_id',
  'deleted_at',
])
@Index(
  'uq_job_pipeline_stages_job_order',
  ['job_listing_id', 'display_order'],
  { unique: true, where: '"deleted_at" IS NULL' },
)
@Entity({ name: 'job_pipeline_stages' })
export class JobPipelineStageEntity extends SharedEntity {
  @PrimaryGeneratedColumn('uuid', { name: 'job_pipeline_stage_id' })
  job_pipeline_stage_id: string;

  @Column({
    name: 'job_pipeline_stage_code',
    type: 'varchar',
    length: 32,
    unique: true,
  })
  job_pipeline_stage_code: string;

  @Column({ name: 'company_id', type: 'uuid' })
  company_id: string;

  @ManyToOne(() => CompanyEntity, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'company_id', referencedColumnName: 'id' })
  company: CompanyEntity;

  @Column({ name: 'job_listing_id', type: 'uuid' })
  job_listing_id: string;

  @ManyToOne(() => JobListingEntity, { onDelete: 'CASCADE' })
  @JoinColumn({
    name: 'job_listing_id',
    referencedColumnName: 'job_listing_id',
  })
  job_listing: JobListingEntity;

  @Column({ type: 'varchar', length: 50, nullable: true })
  stage_key: string | null;

  @Column({ name: 'name', type: 'varchar', length: 100 })
  name: string;

  @Column({ name: 'color', type: 'varchar', length: 20, nullable: true })
  color?: string | null;

  @Column({ name: 'display_order', type: 'int' })
  display_order: number;

  @BeforeInsert()
  assignCode(): void {
    if (!this.job_pipeline_stage_code) {
      this.job_pipeline_stage_code = generatePrefixedCode('STAGE');
    }
  }
}
