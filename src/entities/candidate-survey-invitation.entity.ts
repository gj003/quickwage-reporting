import {
  BeforeInsert,
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  Unique,
} from 'typeorm';
import { BaseEntityColumns } from './base-entity-columns.entity';
import { CandidateSurveyEntity } from './candidate-survey.entity';
import { CandidateEntity } from './candidate.entity';
import { CompanyEntity } from './company.entity';
import { generatePrefixedCode } from 'src/common/utility';

@Entity({ name: 'candidate_survey_invitations' })
@Unique('uq_candidate_survey_invitation_recipient', [
  'candidateSurveyId',
  'candidateId',
])
@Index('idx_survey_invitation_company_status', ['companyId', 'status'])
export class CandidateSurveyInvitationEntity extends BaseEntityColumns {
  @PrimaryGeneratedColumn('uuid', { name: 'candidate_survey_invitation_id' })
  candidateSurveyInvitationId: string;
  @Column({
    name: 'invitation_code',
    type: 'varchar',
    length: 64,
    unique: true,
  })
  invitationCode: string;
  @Column({ name: 'company_id', type: 'uuid' }) companyId: string;
  @ManyToOne(() => CompanyEntity, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'company_id', referencedColumnName: 'id' })
  company: CompanyEntity;
  @Column({ name: 'candidate_survey_id', type: 'uuid' })
  candidateSurveyId: string;
  @ManyToOne(() => CandidateSurveyEntity, (survey) => survey.invitations, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({
    name: 'candidate_survey_id',
    referencedColumnName: 'candidateSurveyId',
  })
  survey: CandidateSurveyEntity;
  @Column({ name: 'candidate_id', type: 'uuid' }) candidateId: string;
  @ManyToOne(() => CandidateEntity, { onDelete: 'RESTRICT' })
  @JoinColumn({ name: 'candidate_id', referencedColumnName: 'candidate_id' })
  candidate: CandidateEntity;
  @Column({ name: 'status', type: 'varchar', length: 20 }) status: string;
  @Column({ name: 'scheduled_at', type: 'timestamptz' }) scheduledAt: Date;
  @Column({ name: 'survey_link', type: 'text' }) surveyLink: string;
  @BeforeInsert() assignCode(): void {
    if (!this.invitationCode)
      this.invitationCode = generatePrefixedCode('SURVEY_INVITE');
  }
}
