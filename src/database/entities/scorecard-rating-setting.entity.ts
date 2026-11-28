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
import { ScorecardEntity } from './scorecard.entity';
import { ScorecardRatingOptionEntity } from './scorecard-rating-option.entity';
import { generatePrefixedCode } from 'src/common/utility';

@Index('idx_scorecard_rating_settings_company_deleted', [
  'companyId',
  'deleted_at',
])
@Index('idx_scorecard_rating_settings_company_active_deleted', [
  'companyId',
  'isActive',
  'deleted_at',
])
@Index('idx_scorecard_rating_settings_company_code', [
  'companyId',
  'ratingSettingCode',
])
@Index('idx_scorecard_rating_settings_scorecard_type_deleted', [
  'scorecardId',
  'responseType',
  'deleted_at',
])
@Entity({ name: 'scorecard_rating_settings' })
export class ScorecardRatingSettingEntity extends BaseEntityColumns {
  @PrimaryGeneratedColumn('increment', { name: 'scorecard_rating_setting_id' })
  scorecardRatingSettingId: number;

  @Column({
    name: 'rating_setting_code',
    type: 'varchar',
    length: 40,
    unique: true,
  })
  ratingSettingCode: string;

  @Column({ name: 'company_id', type: 'uuid', nullable: true })
  companyId?: string | null;

  @ManyToOne(() => CompanyEntity, { nullable: true, onDelete: 'RESTRICT' })
  @JoinColumn({ name: 'company_id', referencedColumnName: 'id' })
  company?: CompanyEntity | null;

  @Column({ name: 'scorecard_id', type: 'int', nullable: true })
  scorecardId?: number | null;

  @ManyToOne(() => ScorecardEntity, (scorecard) => scorecard.ratingSettings, {
    nullable: true,
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'scorecard_id', referencedColumnName: 'scorecardId' })
  scorecard?: ScorecardEntity | null;

  @Column({ name: 'setting_name', type: 'varchar', length: 200 })
  settingName: string;

  @Column({ name: 'response_type', type: 'varchar', length: 50 })
  responseType: string;

  @Column({
    name: 'is_overall_feedback_enabled',
    type: 'boolean',
    default: false,
  })
  isOverallFeedbackEnabled: boolean;

  @Column({ name: 'rating_scale', type: 'int', nullable: true })
  ratingScale?: number | null;

  @Column({ name: 'is_active', type: 'boolean', default: true })
  isActive: boolean;

  @OneToMany(
    () => ScorecardRatingOptionEntity,
    (option) => option.ratingSetting,
    {
      cascade: false,
    },
  )
  ratingOptions: ScorecardRatingOptionEntity[];

  @BeforeInsert()
  assignCode(): void {
    if (!this.ratingSettingCode) {
      this.ratingSettingCode = generatePrefixedCode('RATING_SETTING');
    }
  }
}
