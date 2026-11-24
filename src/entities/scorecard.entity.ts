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
import { ScorecardQuestionEntity } from './scorecard-question.entity';
import { generatePrefixedCode } from 'src/common/utility';
import { InterviewScoreEntity } from './interview-score.entity';
import { CompanyEntity } from './company.entity';
import { ScorecardSectionEntity } from './scorecard-section.entity';
import { ScorecardRatingSettingEntity } from './scorecard-rating-setting.entity';
import { CandidateScorecardSubmissionEntity } from './candidate-scorecard-submission.entity';

@Index('idx_scorecards_company_deleted', ['companyId', 'deleted_at'])
@Index('idx_scorecards_company_active_deleted', [
  'companyId',
  'isActive',
  'deleted_at',
])
@Index(
  'idx_scorecards_company_scorecard_code',
  ['companyId', 'scorecardCode'],
  {
    unique: true,
  },
)
@Index('idx_scorecards_company_created_by_deleted', [
  'companyId',
  'createdBy',
  'deleted_at',
])
@Entity({ name: 'scorecards' })
export class ScorecardEntity extends BaseEntityColumns {
  @PrimaryGeneratedColumn('increment', { name: 'scorecard_id' })
  scorecardId: number;

  @Column({ name: 'scorecard_code', type: 'varchar', length: 32, unique: true })
  scorecardCode: string;

  @Column({ name: 'org_id', type: 'uuid' })
  orgId: string;

  @Column({ name: 'company_id', type: 'uuid', nullable: true })
  companyId?: string | null;

  @ManyToOne(() => CompanyEntity, { nullable: true, onDelete: 'RESTRICT' })
  @JoinColumn({ name: 'company_id', referencedColumnName: 'id' })
  company?: CompanyEntity | null;

  @Column({ name: 'name', type: 'varchar', length: 200 })
  name: string;

  @Column({ name: 'description', type: 'varchar', length: 500, nullable: true })
  description?: string | null;

  @Column({ name: 'roles_json', type: 'text', nullable: true })
  rolesJson?: string | null;

  @Column({ name: 'settings_json', type: 'text', nullable: true })
  settingsJson?: string | null;

  @Column({ name: 'usage_count', type: 'int', default: 0 })
  usageCount: number;

  @Column({
    name: 'completion_rate',
    type: 'numeric',
    precision: 5,
    scale: 2,
    default: 0,
  })
  completionRate: string;

  @Column({ name: 'ai_assist_usage', type: 'int', default: 0 })
  aiAssistUsage: number;

  @Column({ name: 'bias_alerts_open', type: 'int', default: 0 })
  biasAlertsOpen: number;

  @Column({ name: 'is_active', type: 'boolean', default: true })
  isActive: boolean;

  @Column({ name: 'created_by', type: 'uuid', nullable: true })
  createdBy?: string | null;

  @Column({ name: 'updated_by', type: 'uuid', nullable: true })
  updatedBy?: string | null;

  @OneToMany(() => ScorecardSectionEntity, (section) => section.scorecard, {
    cascade: false,
  })
  sections: ScorecardSectionEntity[];

  @OneToMany(() => ScorecardQuestionEntity, (question) => question.scorecard, {
    cascade: false,
  })
  questions: ScorecardQuestionEntity[];

  @OneToMany(
    () => ScorecardRatingSettingEntity,
    (setting) => setting.scorecard,
    {
      cascade: false,
    },
  )
  ratingSettings: ScorecardRatingSettingEntity[];

  @OneToMany(() => InterviewScoreEntity, (score) => score.scorecard, {
    cascade: false,
  })
  scores: InterviewScoreEntity[];

  @OneToMany(
    () => CandidateScorecardSubmissionEntity,
    (submission) => submission.scorecard,
    { cascade: false },
  )
  submissions: CandidateScorecardSubmissionEntity[];

  @BeforeInsert()
  assignCode(): void {
    if (!this.scorecardCode) {
      this.scorecardCode = generatePrefixedCode('SCORECARD');
    }

    if (!this.companyId && this.orgId) {
      this.companyId = this.orgId;
    }
  }
}
