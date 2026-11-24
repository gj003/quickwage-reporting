import {
  BeforeInsert,
  Column,
  Entity,
  Generated,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  Unique,
} from 'typeorm';
import { BaseEntityColumns } from './base-entity-columns.entity';
import { generatePrefixedCode } from 'src/common/utility';
import { CandidateSurveyEntity } from './candidate-survey.entity';
import { JobRequisitionEntity } from './job-requisition.entity';

@Index('idx_candidate_survey_response_candidate', ['candidateId'])
@Index('idx_candidate_survey_response_requisition', ['requisitionId'])
@Unique('uq_candidate_survey_candidate', ['surveyId', 'candidateId'])
@Entity({ name: 'candidate_survey_responses' })
export class CandidateSurveyResponseEntity extends BaseEntityColumns {
  @PrimaryGeneratedColumn('uuid', { name: 'candidate_survey_response_id' })
  candidateSurveyResponseId: string;

  @Column({ name: 'auto_inc', type: 'int' })
  @Generated('increment')
  autoInc: number;

  @Column({
    name: 'response_code',
    type: 'varchar',
    length: 32,
    unique: true,
  })
  responseCode: string;

  @Column({ name: 'survey_id', type: 'uuid' })
  surveyId: string;

  @ManyToOne(() => CandidateSurveyEntity, (survey) => survey.responses, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({
    name: 'survey_id',
    referencedColumnName: 'candidateSurveyId',
  })
  survey: CandidateSurveyEntity;

  @Column({ name: 'candidate_id', type: 'int' })
  candidateId: number;

  @Column({ name: 'requisition_id', type: 'int' })
  requisitionId: number;

  @ManyToOne(() => JobRequisitionEntity, {
    nullable: false,
    onDelete: 'RESTRICT',
  })
  @JoinColumn({
    name: 'requisition_id',
    referencedColumnName: 'jobRequisitionId',
  })
  requisition: JobRequisitionEntity;

  @Column({ name: 'answers_json', type: 'text' })
  answersJson: string;

  @Column({
    name: 'submitted_at',
    type: 'timestamptz',
    default: () => 'CURRENT_TIMESTAMP',
  })
  submittedAt: Date;

  @BeforeInsert()
  assignResponseCode(): void {
    if (!this.responseCode) {
      this.responseCode = generatePrefixedCode('HCSRSP');
    }
  }
}
