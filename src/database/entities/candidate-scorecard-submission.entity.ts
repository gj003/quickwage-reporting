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
import { BaseEntityColumns } from './base-entity-columns.entity';
import { CompanyEntity } from './company.entity';
import { InterviewEntity } from './interview.entity';
import { JobRequisitionEntity } from './job-requisition.entity';
import { ScorecardEntity } from './scorecard.entity';
import { UserEntity } from './user.entity';
import { CandidateScorecardResponseEntity } from './candidate-scorecard-response.entity';
import { generatePrefixedCode } from 'src/common/utility';

@Index('idx_candidate_scorecard_submissions_company_deleted', [
  'companyId',
  'deleted_at',
])
@Index('idx_candidate_scorecard_submissions_company_active_deleted', [
  'companyId',
  'isActive',
  'deleted_at',
])
@Index('idx_candidate_scorecard_submissions_company_code', [
  'companyId',
  'candidateScorecardSubmissionCode',
])
@Index('idx_candidate_scorecard_submissions_scorecard_deleted', [
  'scorecardId',
  'deleted_at',
])
@Entity({ name: 'candidate_scorecard_submissions' })
export class CandidateScorecardSubmissionEntity extends BaseEntityColumns {
  @PrimaryGeneratedColumn('uuid', { name: 'candidate_scorecard_submission_id' })
  candidateScorecardSubmissionId: string;

  @Column({
    name: 'candidate_scorecard_submission_code',
    type: 'varchar',
    length: 48,
    unique: true,
  })
  candidateScorecardSubmissionCode: string;

  @Column({ name: 'company_id', type: 'uuid', nullable: true })
  companyId?: string | null;

  @ManyToOne(() => CompanyEntity, { nullable: true, onDelete: 'RESTRICT' })
  @JoinColumn({ name: 'company_id', referencedColumnName: 'id' })
  company?: CompanyEntity | null;

  @Column({ name: 'scorecard_id', type: 'int' })
  scorecardId: number;

  @ManyToOne(() => ScorecardEntity, (scorecard) => scorecard.submissions, {
    onDelete: 'RESTRICT',
  })
  @JoinColumn({ name: 'scorecard_id', referencedColumnName: 'scorecardId' })
  scorecard: ScorecardEntity;

  @Column({ name: 'candidate_id', type: 'int', nullable: true })
  candidateId?: number | null;

  @Column({ name: 'job_requisition_id', type: 'int', nullable: true })
  jobRequisitionId?: number | null;

  @ManyToOne(() => JobRequisitionEntity, {
    nullable: true,
    onDelete: 'SET NULL',
  })
  @JoinColumn({
    name: 'job_requisition_id',
    referencedColumnName: 'jobRequisitionId',
  })
  jobRequisition?: JobRequisitionEntity | null;

  @Column({ name: 'interview_id', type: 'int', nullable: true })
  interviewId?: number | null;

  @ManyToOne(() => InterviewEntity, { nullable: true, onDelete: 'SET NULL' })
  @JoinColumn({ name: 'interview_id', referencedColumnName: 'interviewId' })
  interview?: InterviewEntity | null;

  @Column({ name: 'submitted_by', type: 'uuid', nullable: true })
  submittedBy?: string | null;

  @ManyToOne(() => UserEntity, { nullable: true, onDelete: 'SET NULL' })
  @JoinColumn({ name: 'submitted_by', referencedColumnName: 'user_id' })
  submittedByUser?: UserEntity | null;

  @Column({ name: 'status', type: 'varchar', length: 30, default: 'draft' })
  status: string;

  @Column({
    name: 'overall_rating',
    type: 'numeric',
    precision: 8,
    scale: 2,
    nullable: true,
  })
  overallRating?: string | null;

  @Column({
    name: 'recommendation',
    type: 'varchar',
    length: 100,
    nullable: true,
  })
  recommendation?: string | null;

  @Column({ name: 'submitted_at', type: 'timestamptz', nullable: true })
  submittedAt?: Date | null;

  @Column({ name: 'is_active', type: 'boolean', default: true })
  isActive: boolean;

  @OneToMany(
    () => CandidateScorecardResponseEntity,
    (response) => response.submission,
    {
      cascade: false,
    },
  )
  responses: CandidateScorecardResponseEntity[];

  @BeforeInsert()
  assignCode(): void {
    if (!this.candidateScorecardSubmissionCode) {
      this.candidateScorecardSubmissionCode =
        generatePrefixedCode('CAND_SCORECARD_SUB');
    }
  }
}
