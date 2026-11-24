import type { CandidatePortalStoredDocumentDTO } from 'src/modules/recruitment-and-onboarding/candidate-portal/candidate-portal-document.dto';
import {
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
import { DesignationEntity } from './designation.entity';
import { BusinessUnitEntity } from './business-unit.entity';
import { DepartmentEntity } from './department.entity';
import { UserEntity } from './user.entity';
import { PreboardingLedgerEntity } from './preboarding-ledger.entity';
import { ArchiveReasonEntity } from './archive-reason.entity';
import { JobListingEntity } from './job-listing.entity';
import { CandidateEntity } from './candidate.entity';
import { PreboardingOfferType, PreboardingStatus } from 'src/common/enum';

@Index('idx_preboardings_company_status_deleted', [
  'company_id',
  'status',
  'deleted_at',
])
@Index('idx_preboarding_company_job', ['company_id', 'job_listing_id'])
@Index('idx_preboardings_company_candidate', ['company_id', 'candidate_id'])
@Entity({ name: 'preboardings' })
export class PreboardingEntity extends SharedEntity {
  @Column({ type: 'jsonb', nullable: true })
  portal_documents: CandidatePortalStoredDocumentDTO[] | null;
  @PrimaryGeneratedColumn('uuid', { name: 'preboarding_id' })
  preboarding_id: string;

  @Column({ type: 'uuid' })
  company_id: string;

  @ManyToOne(() => CompanyEntity, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'company_id', referencedColumnName: 'id' })
  company: CompanyEntity;

  @Column({ type: 'uuid', nullable: true }) job_listing_id: string | null;
  @ManyToOne(() => JobListingEntity, { nullable: true, onDelete: 'RESTRICT' })
  @JoinColumn({
    name: 'job_listing_id',
    referencedColumnName: 'job_listing_id',
  })
  job_listing: JobListingEntity | null;
  @Column({ type: 'varchar', length: 200, nullable: true }) job_title:
    string | null;

  @Column({ type: 'date', nullable: true }) joining_date: string | null;
  @Column({ type: 'date', nullable: true }) offer_valid_until: string | null;
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

  @Column({ type: 'uuid', nullable: true }) candidate_id: string | null;
  @ManyToOne(() => CandidateEntity, { nullable: true, onDelete: 'RESTRICT' })
  @JoinColumn({ name: 'candidate_id', referencedColumnName: 'candidate_id' })
  candidate: CandidateEntity | null;

  @Column({ type: 'varchar', length: 100 })
  first_name: string;

  @Column({ type: 'varchar', length: 100 })
  last_name: string;

  @Column({ type: 'varchar', length: 255 })
  personal_email: string;

  @Column({ type: 'varchar', length: 20, nullable: true })
  mobile_number: string | null;

  @Column({ type: 'int', nullable: true })
  designation_id: number | null;

  @ManyToOne(() => DesignationEntity, { nullable: true, onDelete: 'RESTRICT' })
  @JoinColumn({ name: 'designation_id', referencedColumnName: 'id' })
  designation: DesignationEntity;

  @Column({ type: 'varchar', length: 20, nullable: true })
  offer_type: PreboardingOfferType | null;

  @Column({ type: 'int', nullable: true })
  business_unit_id: number | null;

  @ManyToOne(() => BusinessUnitEntity, { nullable: true, onDelete: 'RESTRICT' })
  @JoinColumn({ name: 'business_unit_id', referencedColumnName: 'id' })
  business_unit: BusinessUnitEntity;

  @Column({ type: 'int', nullable: true })
  department_id: number | null;

  @ManyToOne(() => DepartmentEntity, { nullable: true, onDelete: 'RESTRICT' })
  @JoinColumn({ name: 'department_id', referencedColumnName: 'id' })
  department: DepartmentEntity;

  @Column({ type: 'varchar', length: 200, nullable: true })
  location: string | null;

  @Column({ type: 'uuid', nullable: true })
  recruiter_id: string | null;

  @ManyToOne(() => UserEntity, { nullable: true, onDelete: 'RESTRICT' })
  @JoinColumn({ name: 'recruiter_id', referencedColumnName: 'user_id' })
  recruiter: UserEntity;

  @Column({ type: 'varchar', length: 30, default: PreboardingStatus.PENDING })
  status: PreboardingStatus;

  @Column({ type: 'boolean', default: false }) is_archived: boolean;
  @Column({ type: 'uuid', nullable: true }) archive_reason_id: string | null;
  @ManyToOne(() => ArchiveReasonEntity, {
    nullable: true,
    onDelete: 'RESTRICT',
  })
  @JoinColumn({
    name: 'archive_reason_id',
    referencedColumnName: 'archive_reason_id',
  })
  archive_reason: ArchiveReasonEntity;
  @Column({ type: 'text', nullable: true }) archive_note: string | null;
  @Column({ type: 'uuid', nullable: true }) employee_id: string | null;
  @ManyToOne(() => UserEntity, { nullable: true, onDelete: 'RESTRICT' })
  @JoinColumn({ name: 'employee_id', referencedColumnName: 'user_id' })
  employee: UserEntity;

  @OneToMany(() => PreboardingLedgerEntity, (ledger) => ledger.preboarding)
  ledger_entries: PreboardingLedgerEntity[];
}
