// src/database/entities/job-listing.entity.ts

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
import type { JobLocationPositionsDTO } from 'src/modules/recruitment-and-onboarding/requisitions/dto/job-location-positions.dto';
import { SharedEntity } from './shared.entity';
import { CompanyEntity } from './company.entity';
import { DepartmentEntity } from './department.entity';
import { UserEntity } from './user.entity';
import { JobListingCollaboratorEntity } from './job-listing-collaborator.entity';
import { JobListingEmploymentType, JobListingStatus } from 'src/common/enum';
import { generatePrefixedCode } from 'src/common/utility';
import { HiringFlowEntity } from './hiring-flow.entity';

@Index('idx_job_listings_company_deleted', ['company_id', 'deleted_at'])
@Index('idx_job_listings_company_status_deleted', [
  'company_id',
  'status',
  'deleted_at',
])
@Entity({ name: 'job_listings' })
export class JobListingEntity extends SharedEntity {
  @PrimaryGeneratedColumn('uuid', { name: 'job_listing_id' })
  job_listing_id: string;

  @Column({ name: 'job_code', type: 'varchar', length: 64, unique: true })
  job_code: string;

  @Column({ name: 'company_id', type: 'uuid' })
  company_id: string;

  @ManyToOne(() => CompanyEntity, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'company_id', referencedColumnName: 'id' })
  company: CompanyEntity;

  @Column({ name: 'created_by', type: 'uuid' })
  created_by: string;

  @ManyToOne(() => UserEntity, { nullable: true, onDelete: 'SET NULL' })
  @JoinColumn({ name: 'created_by', referencedColumnName: 'user_id' })
  createdByUser?: UserEntity | null;

  @Column({
    name: 'status',
    type: 'varchar',
    default: JobListingStatus.DRAFT,
  })
  status: JobListingStatus;

  @Column({ type: 'int', default: 1 })
  version_number: number;

  @Column({ type: 'jsonb', default: () => "'[]'::jsonb" })
  location_positions: JobLocationPositionsDTO[];

  // ---- Basic Info ----

  @Column({ name: 'job_title', type: 'varchar', length: 200 })
  job_title: string;

  @Column({ name: 'employment_type', type: 'varchar' })
  employment_type: JobListingEmploymentType;

  @Column({ name: 'department_id', type: 'int', nullable: true })
  department_id?: number | null;

  @ManyToOne(() => DepartmentEntity, { nullable: true, onDelete: 'SET NULL' })
  @JoinColumn({ name: 'department_id', referencedColumnName: 'id' })
  department?: DepartmentEntity | null;

  @Column({ name: 'experience_level', type: 'varchar', length: 100 })
  experience_level: string;

  @Column({ name: 'location', type: 'varchar', length: 200 })
  location: string;

  @Column({ name: 'remote_work_available', type: 'boolean', default: false })
  remote_work_available: boolean;

  @Column({ name: 'urgent_hiring', type: 'boolean', default: false })
  urgent_hiring: boolean;

  @Column({ name: 'start_hire_date', type: 'date', nullable: true })
  start_hire_date?: string | null;

  @Column({ name: 'target_hire_date', type: 'date', nullable: true })
  target_hire_date?: string | null;

  @Column({ name: 'no_of_positions', type: 'int', default: 1 })
  no_of_positions: number;

  @Column({ name: 'hiring_flow_id', type: 'uuid', nullable: true })
  hiring_flow_id?: string | null;

  @ManyToOne(() => HiringFlowEntity, { nullable: true, onDelete: 'RESTRICT' })
  @JoinColumn({
    name: 'hiring_flow_id',
    referencedColumnName: 'hiringFlowId',
  })
  hiring_flow?: HiringFlowEntity | null;

  // ---- Description ----

  @Column({ name: 'job_description', type: 'text', nullable: true })
  job_description?: string | null;

  @Column({ name: 'requirements', type: 'text', array: true, nullable: true })
  requirements?: string[] | null;

  // ---- Compensation ----

  @Column({
    name: 'min_salary',
    type: 'numeric',
    precision: 14,
    scale: 2,
    nullable: true,
  })
  min_salary?: string | null;

  @Column({
    name: 'max_salary',
    type: 'numeric',
    precision: 14,
    scale: 2,
    nullable: true,
  })
  max_salary?: string | null;

  @Column({ name: 'currency', type: 'varchar', length: 10, nullable: true })
  currency?: string | null;

  @Column({
    name: 'show_salary_range',
    type: 'boolean',
    default: false,
  })
  show_salary_range: boolean;

  @Column({
    name: 'benefits_and_perks',
    type: 'text',
    array: true,
    nullable: true,
  })
  benefits_and_perks?: string[] | null;

  // ---- Skills ----

  @Column({ name: 'skills', type: 'text', array: true, nullable: true })
  skills?: string[] | null;

  // ---- Hiring team ----

  @Column({ name: 'hiring_manager_id', type: 'uuid', nullable: true })
  hiring_manager_id?: string | null;

  @ManyToOne(() => UserEntity, { nullable: true, onDelete: 'SET NULL' })
  @JoinColumn({ name: 'hiring_manager_id', referencedColumnName: 'user_id' })
  hiring_manager?: UserEntity | null;

  @Column({ name: 'recruiter_ids', type: 'uuid', array: true, nullable: true })
  recruiter_ids?: string[] | null;

  @Column({
    name: 'interview_panel_ids',
    type: 'uuid',
    array: true,
    nullable: true,
  })
  interview_panel_ids?: string[] | null;

  // ---- Hiring rules (Scorecard settings) ----

  @Column({
    name: 'require_scorecard_to_advance',
    type: 'boolean',
    default: false,
  })
  require_scorecard_to_advance: boolean;

  // null = disabled; a value N means auto-reject candidates with no stage
  // activity for N days. Enforced by JobAutoRejectInactiveCandidatesCron -
  // never checked synchronously in a request path.
  @Column({
    name: 'auto_reject_inactive_days',
    type: 'int',
    nullable: true,
  })
  auto_reject_inactive_days?: number | null;

  @Column({
    name: 'allow_employee_referrals',
    type: 'boolean',
    default: true,
  })
  allow_employee_referrals: boolean;

  @Column({
    name: 'allow_employee_applications',
    type: 'boolean',
    default: false,
  })
  allow_employee_applications: boolean;

  // ---- Metrics ----

  // Counter cache: no page-view log table exists to aggregate from, so this
  // is incremented directly (see RecordJobListingViewService). Applicants and
  // hires are NOT cached here - they're aggregated live from CandidateEntity
  // per the project convention of preferring aggregation over stored totals
  // wherever a real source table already exists.
  @Column({ name: 'views_count', type: 'int', default: 0 })
  views_count: number;

  @OneToMany(
    () => JobListingCollaboratorEntity,
    (collaborator) => collaborator.job_listing,
  )
  collaborators: JobListingCollaboratorEntity[];

  @BeforeInsert()
  assignCode(): void {
    if (!this.job_code) {
      this.job_code = generatePrefixedCode('JOBLST');
    }
  }
}
