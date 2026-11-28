import type { CandidatePortalStoredDocumentDTO } from 'src/modules/recruitment-and-onboarding/candidate-portal/candidate-portal-document.dto';
import { CandidateSalaryFrequency } from 'src/common/enum';
// src/database/entities/candidate.entity.ts

import {
  BeforeInsert,
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { SharedEntity } from './shared.entity';
import { CompanyEntity } from './company.entity';
import { JobListingEntity } from './job-listing.entity';
import { UserEntity } from './user.entity';
import { CandidateExperienceEntity } from './candidate-experience.entity';
import { CandidateEducationEntity } from './candidate-education.entity';
import { JobPipelineStageEntity } from './job-pipeline-stage.entity';
import { CandidateStage, Gender } from 'src/common/enum';
import { generatePrefixedCode } from 'src/common/utility';

@Index('idx_candidates_company_deleted', ['company_id', 'deleted_at'])
@Index('idx_candidates_company_stage_deleted', [
  'company_id',
  'stage',
  'deleted_at',
])
@Index('idx_candidates_job_listing_deleted', ['job_listing_id', 'deleted_at'])
@Index('idx_candidates_company_job_status_deleted', [
  'company_id',
  'job_listing_id',
  'status',
  'deleted_at',
])
@Index('idx_candidates_pipeline_stage', ['pipeline_stage_id'])
@Index('idx_candidates_company_merged_into', [
  'company_id',
  'merged_into_candidate_id',
])
@Index(
  'uq_candidates_company_job_internal_employee_active',
  ['company_id', 'job_listing_id', 'internal_employee_id'],
  {
    unique: true,
    where:
      '"internal_employee_id" IS NOT NULL AND "status" = \'ACTIVE\' AND "deleted_at" IS NULL',
  },
)
@Index('idx_candidates_company_referred_by', ['company_id', 'referred_by'], {
  where: '"referred_by" IS NOT NULL AND "deleted_at" IS NULL',
})
@Index(
  'idx_candidates_company_internal_application_status',
  ['company_id', 'internal_application_status', 'deleted_at'],
  { where: '"internal_employee_id" IS NOT NULL' },
)
@Entity({ name: 'candidates' })
export class CandidateEntity extends SharedEntity {
  @Column({ type: 'jsonb', nullable: true })
  portal_documents: CandidatePortalStoredDocumentDTO[] | null;
  @PrimaryGeneratedColumn('uuid', { name: 'candidate_id' })
  candidate_id: string;

  @Column({ name: 'candidate_code', type: 'varchar', length: 64, unique: true })
  candidate_code: string;

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

  // ---- Basic info ----

  @Column({ name: 'candidate_resume_url', type: 'text', nullable: true })
  candidate_resume_url?: string | null;

  @Column({ name: 'first_name', type: 'varchar', length: 100 })
  first_name: string;

  @Column({ name: 'last_name', type: 'varchar', length: 100 })
  last_name: string;

  @Column({ name: 'email', type: 'varchar', length: 255 })
  email: string;

  @Column({ name: 'mobile', type: 'varchar', length: 10 })
  mobile: string;

  @Column({
    name: 'stage',
    type: 'varchar',
    default: CandidateStage.SOURCED,
  })
  stage: CandidateStage;

  // Fine-grained, per-job custom kanban stage (Hiring Flow tab). Nullable and
  // deliberately independent of `stage` above: `stage` stays the source of
  // truth for the existing dashboard funnel/filters (backward compatible),
  // this is the new configurable pipeline position.
  @Column({ name: 'pipeline_stage_id', type: 'uuid', nullable: true })
  pipeline_stage_id?: string | null;

  @ManyToOne(() => JobPipelineStageEntity, {
    nullable: true,
    onDelete: 'SET NULL',
  })
  @JoinColumn({
    name: 'pipeline_stage_id',
    referencedColumnName: 'job_pipeline_stage_id',
  })
  pipeline_stage?: JobPipelineStageEntity | null;

  @Column({ name: 'source', type: 'varchar', length: 150, nullable: true })
  source?: string | null;

  @Column({ name: 'sourced_by', type: 'uuid', nullable: true })
  sourced_by?: string | null;

  @ManyToOne(() => UserEntity, { nullable: true, onDelete: 'SET NULL' })
  @JoinColumn({ name: 'sourced_by', referencedColumnName: 'user_id' })
  sourcedByUser?: UserEntity | null;

  @Column({ name: 'internal_employee_id', type: 'uuid', nullable: true })
  internal_employee_id?: string | null;

  @ManyToOne(() => UserEntity, { nullable: true, onDelete: 'SET NULL' })
  @JoinColumn({ name: 'internal_employee_id', referencedColumnName: 'user_id' })
  internalEmployee?: UserEntity | null;

  @Column({ name: 'referred_by', type: 'uuid', nullable: true })
  referred_by?: string | null;

  @ManyToOne(() => UserEntity, { nullable: true, onDelete: 'SET NULL' })
  @JoinColumn({ name: 'referred_by', referencedColumnName: 'user_id' })
  referredByUser?: UserEntity | null;

  @Column({ name: 'candidate_owner', type: 'uuid', nullable: true })
  candidate_owner?: string | null;

  @ManyToOne(() => UserEntity, { nullable: true, onDelete: 'SET NULL' })
  @JoinColumn({ name: 'candidate_owner', referencedColumnName: 'user_id' })
  candidateOwnerUser?: UserEntity | null;

  // ---- Professional info ----

  @Column({
    name: 'current_role',
    type: 'varchar',
    length: 150,
    nullable: true,
  })
  current_role?: string | null;

  @Column({
    name: 'current_company',
    type: 'varchar',
    length: 150,
    nullable: true,
  })
  current_company?: string | null;

  @Column({
    name: 'experience_years',
    type: 'numeric',
    precision: 5,
    scale: 2,
    nullable: true,
  })
  experience_years?: string | null;

  @Column({
    name: 'current_location',
    type: 'varchar',
    length: 200,
    nullable: true,
  })
  current_location?: string | null;

  @Column({
    name: 'preferred_location',
    type: 'varchar',
    length: 200,
    nullable: true,
  })
  preferred_location?: string | null;

  @Column({
    name: 'current_salary',
    type: 'numeric',
    precision: 14,
    scale: 2,
    nullable: true,
  })
  current_salary?: string | null;

  @Column({
    type: 'varchar',
    length: 16,
    nullable: true,
    default: CandidateSalaryFrequency.ANNUALLY,
  })
  current_salary_frequency?: CandidateSalaryFrequency | null;

  @Column({
    type: 'varchar',
    length: 16,
    nullable: true,
    default: CandidateSalaryFrequency.ANNUALLY,
  })
  expected_salary_frequency?: CandidateSalaryFrequency | null;

  @Column({
    name: 'expected_salary',
    type: 'numeric',
    precision: 14,
    scale: 2,
    nullable: true,
  })
  expected_salary?: string | null;

  @Column({ name: 'notice_period_days', type: 'int', nullable: true })
  notice_period_days?: number | null;

  // ---- Personal info ----

  @Column({ name: 'date_of_birth', type: 'date', nullable: true })
  date_of_birth?: Date | null;

  @Column({ name: 'gender', type: 'varchar', nullable: true })
  gender?: Gender | null;

  @Column({ name: 'nationality', type: 'varchar', length: 100, nullable: true })
  nationality?: string | null;

  @Column({
    name: 'legally_eligible_to_work',
    type: 'boolean',
    nullable: true,
  })
  legally_eligible_to_work?: boolean | null;

  @Column({ name: 'requires_sponsorship', type: 'boolean', nullable: true })
  requires_sponsorship?: boolean | null;

  // ---- Skills / tags ----

  @Column({ name: 'skills', type: 'text', array: true, nullable: true })
  skills?: string[] | null;

  @Column({ name: 'tags', type: 'text', array: true, nullable: true })
  tags?: string[] | null;

  // ---- Links / documents ----

  @Column({ name: 'linkedin_profile_url', type: 'text', nullable: true })
  linkedin_profile_url?: string | null;

  @Column({ name: 'website_or_portfolio_url', type: 'text', nullable: true })
  website_or_portfolio_url?: string | null;

  @Column({
    name: 'additional_documents',
    type: 'text',
    array: true,
    nullable: true,
  })
  additional_documents?: string[] | null;

  @Column({
    name: 'candidate_custom_fields',
    type: 'jsonb',
    nullable: true,
  })
  candidate_custom_fields?: Array<{
    candidate_field_id: string;
    value: string | number | boolean | string[];
  }> | null;

  @Column({ name: 'status', type: 'varchar', length: 20, default: 'ACTIVE' })
  status: string;

  @Column({ name: 'archived_at', type: 'timestamptz', nullable: true })
  archived_at?: Date | null;

  @Column({ name: 'archived_by', type: 'uuid', nullable: true })
  archived_by?: string | null;

  @Column({ name: 'archive_reason_id', type: 'uuid', nullable: true })
  archive_reason_id?: string | null;

  @Column({ name: 'archived_from_job_id', type: 'uuid', nullable: true })
  archived_from_job_id?: string | null;

  // ---- Internal job application decision (internal_employee_id applicants only) ----

  // PENDING | APPROVED | REJECTED | WITHDRAWN. Null for ordinary
  // (non-employee-sourced) candidates.
  @Column({
    name: 'internal_application_status',
    type: 'varchar',
    length: 20,
    nullable: true,
  })
  internal_application_status?: string | null;

  @Column({ name: 'internal_application_reason', type: 'text', nullable: true })
  internal_application_reason?: string | null;

  @Column({
    name: 'internal_application_decided_by',
    type: 'uuid',
    nullable: true,
  })
  internal_application_decided_by?: string | null;

  @ManyToOne(() => UserEntity, { nullable: true, onDelete: 'SET NULL' })
  @JoinColumn({
    name: 'internal_application_decided_by',
    referencedColumnName: 'user_id',
  })
  internalApplicationDecidedByUser?: UserEntity | null;

  @Column({
    name: 'internal_application_decided_at',
    type: 'timestamptz',
    nullable: true,
  })
  internal_application_decided_at?: Date | null;

  @Column({ name: 'version', type: 'int', default: 1 })
  version: number;

  @Column({ name: 'merged_into_candidate_id', type: 'uuid', nullable: true })
  merged_into_candidate_id?: string | null;
  @Column({ name: 'merged_at', type: 'timestamptz', nullable: true })
  merged_at?: Date | null;
  @Column({ name: 'merged_by', type: 'uuid', nullable: true })
  merged_by?: string | null;

  @Column({ type: 'text', nullable: true })
  application_message?: string | null;

  @Column({ type: 'varchar', length: 100, nullable: true, select: false })
  portal_password_reset_hash: string | null;
  @Column({ type: 'timestamptz', nullable: true, select: false })
  portal_password_reset_expires_at: Date | null;
  @Column({ type: 'timestamptz', nullable: true, select: false })
  portal_password_reset_requested_at: Date | null;
  @Column({ type: 'varchar', length: 100, nullable: true, select: false })
  portal_password_hash: string | null;
  @Column({ type: 'timestamptz', nullable: true })
  portal_credentials_expires_at: Date | null;
  @Column({ type: 'timestamptz', nullable: true })
  portal_completed_at: Date | null;
  @Column({ type: 'timestamptz', nullable: true })
  portal_profile_submitted_at: Date | null;
  @Column({ type: 'int', default: 0, select: false })
  portal_auth_version: number;
  @Column({ type: 'int', default: 0, select: false })
  portal_login_failures: number;
  @Column({ type: 'timestamptz', nullable: true, select: false })
  portal_locked_until: Date | null;

  // ---- Ownership ----

  @Column({ name: 'created_by', type: 'uuid', nullable: true })
  created_by: string | null;

  @ManyToOne(() => UserEntity, { nullable: true, onDelete: 'SET NULL' })
  @JoinColumn({ name: 'created_by', referencedColumnName: 'user_id' })
  createdByUser?: UserEntity | null;

  @OneToMany(
    () => CandidateExperienceEntity,
    (experience) => experience.candidate,
  )
  experience: CandidateExperienceEntity[];

  @OneToMany(() => CandidateEducationEntity, (education) => education.candidate)
  education: CandidateEducationEntity[];

  @BeforeInsert()
  assignCode(): void {
    if (!this.candidate_code) {
      this.candidate_code = generatePrefixedCode('CAND');
    }
  }
}
