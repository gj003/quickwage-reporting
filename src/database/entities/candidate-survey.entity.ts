import {
  BeforeInsert,
  Column,
  Entity,
  Generated,
  Index,
  OneToMany,
  ManyToOne,
  JoinColumn,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { BaseEntityColumns } from './base-entity-columns.entity';
import { generatePrefixedCode } from 'src/common/utility';
import { CandidateSurveyResponseEntity } from './candidate-survey-response.entity';
import { CandidateSurveyInvitationEntity } from './candidate-survey-invitation.entity';
import { CompanyEntity } from './company.entity';

@Index('idx_candidate_survey_company', ['companyId'])
@Index('idx_candidate_survey_active', ['isActive'])
@Entity({ name: 'candidate_surveys' })
export class CandidateSurveyEntity extends BaseEntityColumns {
  @PrimaryGeneratedColumn('uuid', { name: 'candidate_survey_id' })
  candidateSurveyId: string;

  @Column({ name: 'auto_inc', type: 'int' })
  @Generated('increment')
  autoInc: number;

  @Column({
    name: 'survey_code',
    type: 'varchar',
    length: 32,
    unique: true,
  })
  surveyCode: string;

  @Column({ name: 'company_id', type: 'uuid' }) companyId: string;
  @ManyToOne(() => CompanyEntity, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'company_id', referencedColumnName: 'id' })
  company: CompanyEntity;

  @Column({ name: 'name', type: 'varchar', length: 200 })
  name: string;

  @Column({ name: 'questions_json', type: 'text' })
  questionsJson: string;

  @Column({ name: 'is_active', type: 'boolean', default: true })
  isActive: boolean;

  @Column({ name: 'status', type: 'varchar', length: 20, default: 'DRAFTED' })
  status: string;
  @Column({
    name: 'recipient_type',
    type: 'varchar',
    length: 32,
    nullable: true,
  })
  recipientType?: string | null;
  @Column({
    name: 'trigger_stage',
    type: 'varchar',
    length: 32,
    nullable: true,
  })
  triggerStage?: string | null;
  @Column({ name: 'trigger_stage_id', type: 'uuid', nullable: true })
  triggerStageId?: string | null;
  @Column({
    name: 'archive_reason_ids',
    type: 'uuid',
    array: true,
    nullable: true,
  })
  archiveReasonIds?: string[] | null;
  @Column({ name: 'dispatch_delay_days', type: 'int', default: 0 })
  dispatchDelayDays: number;
  @Column({
    name: 'email_subject',
    type: 'varchar',
    length: 255,
    nullable: true,
  })
  emailSubject?: string | null;
  @Column({ name: 'email_body', type: 'text', nullable: true }) emailBody?:
    string | null;

  @Column({ name: 'invited_count', type: 'int', default: 0 })
  invitedCount: number;

  @Column({ name: 'last_launched_at', type: 'timestamptz', nullable: true })
  lastLaunchedAt?: Date | null;

  @OneToMany(
    () => CandidateSurveyResponseEntity,
    (response) => response.survey,
    {
      cascade: false,
    },
  )
  responses: CandidateSurveyResponseEntity[];

  @OneToMany(
    () => CandidateSurveyInvitationEntity,
    (invitation) => invitation.survey,
  )
  invitations: CandidateSurveyInvitationEntity[];

  @BeforeInsert()
  assignSurveyCode(): void {
    if (!this.surveyCode) {
      this.surveyCode = generatePrefixedCode('HCSVY');
    }
  }
}
