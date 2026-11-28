// src/database/entities/recruitment-requisition.entity.ts

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
import { DepartmentEntity } from './department.entity';
import { BusinessUnitEntity } from './business-unit.entity';
import { UserEntity } from './user.entity';
import { JobListingEntity } from './job-listing.entity';
import { RecruitmentRequisitionApprovalHistoryEntity } from './recruitment-requisition-approval-history.entity';
import { RequisitionStatus } from 'src/common/enum';
import { generatePrefixedCode } from 'src/common/utility';
import { RecruitmentRequisitionNewHireRowEntity } from './recruitment-requisition-new-hire-row.entity';
import { RecruitmentRequisitionBackfillRowEntity } from './recruitment-requisition-backfill-row.entity';

@Index('idx_recruitment_requisitions_company_deleted', [
  'company_id',
  'deleted_at',
])
@Index('idx_recruitment_requisitions_company_status_deleted', [
  'company_id',
  'status',
  'deleted_at',
])
@Index('idx_recruitment_requisitions_company_department', [
  'company_id',
  'department_id',
])
@Index('idx_recruitment_requisitions_company_business_unit', [
  'company_id',
  'business_unit_id',
])
@Index('idx_recruitment_requisitions_company_created_at', [
  'company_id',
  'created_at',
])
@Index('idx_recruitment_requisitions_company_created_by', [
  'company_id',
  'created_by',
])
@Index('idx_recruitment_requisitions_company_job', [
  'company_id',
  'job_listing_id',
])
@Entity({ name: 'recruitment_requisitions' })
export class RecruitmentRequisitionEntity extends SharedEntity {
  @PrimaryGeneratedColumn('uuid', { name: 'recruitment_requisition_id' })
  recruitment_requisition_id: string;

  @Column({
    name: 'recruitment_requisition_code',
    type: 'varchar',
    length: 32,
    unique: true,
  })
  recruitment_requisition_code: string;

  @Column({ name: 'company_id', type: 'uuid' })
  company_id: string;

  @ManyToOne(() => CompanyEntity, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'company_id', referencedColumnName: 'id' })
  company: CompanyEntity;

  // ---- Requisition Details ----

  @Column({ name: 'job_title', type: 'varchar', length: 200 })
  job_title: string;

  @Column({ name: 'department_id', type: 'int' })
  department_id: number;

  @ManyToOne(() => DepartmentEntity, { onDelete: 'RESTRICT' })
  @JoinColumn({ name: 'department_id', referencedColumnName: 'id' })
  department: DepartmentEntity;

  @Column({ name: 'business_unit_id', type: 'int' })
  business_unit_id: number;

  @ManyToOne(() => BusinessUnitEntity, { onDelete: 'RESTRICT' })
  @JoinColumn({ name: 'business_unit_id', referencedColumnName: 'id' })
  business_unit: BusinessUnitEntity;

  // one or more of RequisitionType (NEW_HIRE / BACKFILL)
  @Column({ name: 'types', type: 'text', array: true })
  types: string[];

  @Column({ name: 'experience_min', type: 'int', nullable: true })
  experience_min?: number | null;

  @Column({ name: 'experience_max', type: 'int', nullable: true })
  experience_max?: number | null;

  @Column({ name: 'location', type: 'varchar', length: 200, nullable: true })
  location?: string | null;

  @Column({
    name: 'employment_type',
    type: 'varchar',
    length: 40,
    nullable: true,
  })
  employment_type?: string | null;

  @Column({ name: 'job_description', type: 'text', nullable: true })
  job_description?: string | null;

  @Column({ name: 'requirements', type: 'text', array: true, nullable: true })
  requirements?: string[] | null;

  @Column({ name: 'total_positions', type: 'int', default: 0 })
  total_positions: number;

  @OneToMany(
    () => RecruitmentRequisitionNewHireRowEntity,
    (row) => row.requisition,
  )
  new_hire_rows: RecruitmentRequisitionNewHireRowEntity[];

  @OneToMany(
    () => RecruitmentRequisitionBackfillRowEntity,
    (row) => row.requisition,
  )
  backfill_rows: RecruitmentRequisitionBackfillRowEntity[];

  // ---- Hiring Team (optional) ----

  @Column({ name: 'hiring_manager_id', type: 'uuid', nullable: true })
  hiring_manager_id?: string | null;

  @ManyToOne(() => UserEntity, { nullable: true, onDelete: 'SET NULL' })
  @JoinColumn({ name: 'hiring_manager_id', referencedColumnName: 'user_id' })
  hiring_manager?: UserEntity | null;

  @Column({ name: 'recruiter_ids', type: 'uuid', array: true, nullable: true })
  recruiter_ids?: string[] | null;

  // ---- Workflow ----

  @Column({
    name: 'status',
    type: 'varchar',
    length: 20,
    default: RequisitionStatus.PENDING_APPROVAL,
  })
  status: RequisitionStatus;

  // sequence of the approval level currently pending action; null once resolved (approved/rejected)
  @Column({ name: 'current_approval_level', type: 'int', nullable: true })
  current_approval_level?: number | null;

  // set once a job has been created from this requisition; prevents duplicate creation
  @Column({ name: 'job_listing_id', type: 'uuid', nullable: true })
  job_listing_id?: string | null;

  @ManyToOne(() => JobListingEntity, { nullable: true, onDelete: 'SET NULL' })
  @JoinColumn({
    name: 'job_listing_id',
    referencedColumnName: 'job_listing_id',
  })
  job_listing?: JobListingEntity | null;

  @Column({ name: 'converted_at', type: 'timestamptz', nullable: true })
  converted_at?: Date | null;

  @Column({ name: 'converted_by', type: 'uuid', nullable: true })
  converted_by?: string | null;

  @Column({ type: 'int', nullable: true })
  job_version_number?: number | null;

  // requisition this one was cloned from, if any
  @Column({ name: 'cloned_from_id', type: 'uuid', nullable: true })
  cloned_from_id?: string | null;

  @Column({ name: 'created_by', type: 'uuid' })
  created_by: string;

  @ManyToOne(() => UserEntity, { nullable: false, onDelete: 'RESTRICT' })
  @JoinColumn({ name: 'created_by', referencedColumnName: 'user_id' })
  created_by_user?: UserEntity | null;

  @Column({ name: 'updated_by', type: 'uuid', nullable: true })
  updated_by?: string | null;

  @OneToMany(
    () => RecruitmentRequisitionApprovalHistoryEntity,
    (history) => history.requisition,
  )
  approval_history: RecruitmentRequisitionApprovalHistoryEntity[];

  @BeforeInsert()
  assignCode(): void {
    if (!this.recruitment_requisition_code) {
      this.recruitment_requisition_code = generatePrefixedCode('REQ');
    }
  }
}
