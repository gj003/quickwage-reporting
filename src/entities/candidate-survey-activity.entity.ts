import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { BaseEntityColumns } from './base-entity-columns.entity';
import { CandidateSurveyEntity } from './candidate-survey.entity';
import { CompanyEntity } from './company.entity';
import { UserEntity } from './user.entity';

@Index('idx_candidate_survey_activity_tenant', [
  'companyId',
  'candidateSurveyId',
  'created_at',
])
@Entity({ name: 'candidate_survey_activities' })
export class CandidateSurveyActivityEntity extends BaseEntityColumns {
  @PrimaryGeneratedColumn('uuid', { name: 'candidate_survey_activity_id' })
  candidateSurveyActivityId: string;
  @Column({ name: 'company_id', type: 'uuid' }) companyId: string;
  @ManyToOne(() => CompanyEntity, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'company_id', referencedColumnName: 'id' })
  company: CompanyEntity;
  @Column({ name: 'candidate_survey_id', type: 'uuid' })
  candidateSurveyId: string;
  @ManyToOne(() => CandidateSurveyEntity, { onDelete: 'CASCADE' })
  @JoinColumn({
    name: 'candidate_survey_id',
    referencedColumnName: 'candidateSurveyId',
  })
  survey: CandidateSurveyEntity;
  @Column({ name: 'actor_id', type: 'uuid', nullable: true }) actorId?:
    string | null;
  @ManyToOne(() => UserEntity, { nullable: true, onDelete: 'SET NULL' })
  @JoinColumn({ name: 'actor_id', referencedColumnName: 'user_id' })
  actor?: UserEntity | null;
  @Column({ name: 'event', type: 'varchar', length: 40 }) event: string;
  @Column({ name: 'metadata', type: 'jsonb', nullable: true })
  metadata?: Record<string, unknown> | null;
}
