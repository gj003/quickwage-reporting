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
import { CandidateScorecardSubmissionEntity } from './candidate-scorecard-submission.entity';
import { ScorecardQuestionEntity } from './scorecard-question.entity';
import { ScorecardRatingOptionEntity } from './scorecard-rating-option.entity';
import { generatePrefixedCode } from 'src/common/utility';

@Index('idx_candidate_scorecard_responses_company_deleted', [
  'companyId',
  'deleted_at',
])
@Index('idx_candidate_scorecard_responses_company_active_deleted', [
  'companyId',
  'isActive',
  'deleted_at',
])
@Index('idx_candidate_scorecard_responses_company_code', [
  'companyId',
  'candidateScorecardResponseCode',
])
@Index('idx_candidate_scorecard_responses_submission_deleted', [
  'candidateScorecardSubmissionId',
  'deleted_at',
])
@Entity({ name: 'candidate_scorecard_responses' })
export class CandidateScorecardResponseEntity extends BaseEntityColumns {
  @PrimaryGeneratedColumn('uuid', { name: 'candidate_scorecard_response_id' })
  candidateScorecardResponseId: string;

  @Column({
    name: 'candidate_scorecard_response_code',
    type: 'varchar',
    length: 48,
    unique: true,
  })
  candidateScorecardResponseCode: string;

  @Column({ name: 'company_id', type: 'uuid', nullable: true })
  companyId?: string | null;

  @ManyToOne(() => CompanyEntity, { nullable: true, onDelete: 'RESTRICT' })
  @JoinColumn({ name: 'company_id', referencedColumnName: 'id' })
  company?: CompanyEntity | null;

  @Column({ name: 'candidate_scorecard_submission_id', type: 'uuid' })
  candidateScorecardSubmissionId: string;

  @ManyToOne(
    () => CandidateScorecardSubmissionEntity,
    (submission) => submission.responses,
    { onDelete: 'CASCADE' },
  )
  @JoinColumn({
    name: 'candidate_scorecard_submission_id',
    referencedColumnName: 'candidateScorecardSubmissionId',
  })
  submission: CandidateScorecardSubmissionEntity;

  @Column({ name: 'scorecard_question_id', type: 'int' })
  scorecardQuestionId: number;

  @ManyToOne(() => ScorecardQuestionEntity, (question) => question.responses, {
    onDelete: 'RESTRICT',
  })
  @JoinColumn({
    name: 'scorecard_question_id',
    referencedColumnName: 'scorecardQuestionId',
  })
  question: ScorecardQuestionEntity;

  @Column({ name: 'scorecard_rating_option_id', type: 'int', nullable: true })
  scorecardRatingOptionId?: number | null;

  @ManyToOne(() => ScorecardRatingOptionEntity, (option) => option.responses, {
    nullable: true,
    onDelete: 'SET NULL',
  })
  @JoinColumn({
    name: 'scorecard_rating_option_id',
    referencedColumnName: 'scorecardRatingOptionId',
  })
  ratingOption?: ScorecardRatingOptionEntity | null;

  @Column({ name: 'response_type', type: 'varchar', length: 50 })
  responseType: string;

  @Column({ name: 'response_text', type: 'text', nullable: true })
  responseText?: string | null;

  @Column({
    name: 'rating_value',
    type: 'numeric',
    precision: 8,
    scale: 2,
    nullable: true,
  })
  ratingValue?: string | null;

  @Column({ name: 'is_mandatory', type: 'boolean', default: false })
  isMandatory: boolean;

  @Column({ name: 'is_active', type: 'boolean', default: true })
  isActive: boolean;

  @BeforeInsert()
  assignCode(): void {
    if (!this.candidateScorecardResponseCode) {
      this.candidateScorecardResponseCode = generatePrefixedCode(
        'CAND_SCORECARD_RESP',
      );
    }
  }
}
