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
import { ScorecardQuestionEntity } from './scorecard-question.entity';
import { ScorecardRatingSettingEntity } from './scorecard-rating-setting.entity';
import { CandidateScorecardResponseEntity } from './candidate-scorecard-response.entity';
import { generatePrefixedCode } from 'src/common/utility';

@Index('idx_scorecard_rating_options_company_deleted', [
  'companyId',
  'deleted_at',
])
@Index('idx_scorecard_rating_options_company_active_deleted', [
  'companyId',
  'isActive',
  'deleted_at',
])
@Index('idx_scorecard_rating_options_company_code', [
  'companyId',
  'ratingOptionCode',
])
@Index('idx_scorecard_rating_options_setting_order_deleted', [
  'scorecardRatingSettingId',
  'displayOrder',
  'deleted_at',
])
@Index('idx_scorecard_rating_options_question_order_deleted', [
  'scorecardQuestionId',
  'displayOrder',
  'deleted_at',
])
@Entity({ name: 'scorecard_rating_options' })
export class ScorecardRatingOptionEntity extends BaseEntityColumns {
  @PrimaryGeneratedColumn('increment', { name: 'scorecard_rating_option_id' })
  scorecardRatingOptionId: number;

  @Column({
    name: 'rating_option_code',
    type: 'varchar',
    length: 40,
    unique: true,
  })
  ratingOptionCode: string;

  @Column({ name: 'company_id', type: 'uuid', nullable: true })
  companyId?: string | null;

  @ManyToOne(() => CompanyEntity, { nullable: true, onDelete: 'RESTRICT' })
  @JoinColumn({ name: 'company_id', referencedColumnName: 'id' })
  company?: CompanyEntity | null;

  @Column({ name: 'scorecard_rating_setting_id', type: 'int', nullable: true })
  scorecardRatingSettingId?: number | null;

  @ManyToOne(
    () => ScorecardRatingSettingEntity,
    (setting) => setting.ratingOptions,
    {
      nullable: true,
      onDelete: 'CASCADE',
    },
  )
  @JoinColumn({
    name: 'scorecard_rating_setting_id',
    referencedColumnName: 'scorecardRatingSettingId',
  })
  ratingSetting?: ScorecardRatingSettingEntity | null;

  @Column({ name: 'scorecard_question_id', type: 'int', nullable: true })
  scorecardQuestionId?: number | null;

  @ManyToOne(
    () => ScorecardQuestionEntity,
    (question) => question.ratingOptions,
    {
      nullable: true,
      onDelete: 'CASCADE',
    },
  )
  @JoinColumn({
    name: 'scorecard_question_id',
    referencedColumnName: 'scorecardQuestionId',
  })
  question?: ScorecardQuestionEntity | null;

  @Column({ name: 'option_label', type: 'varchar', length: 200 })
  optionLabel: string;

  @Column({ name: 'option_value', type: 'varchar', length: 200 })
  optionValue: string;

  @Column({ name: 'icon', type: 'varchar', length: 100, nullable: true })
  icon?: string | null;

  @Column({
    name: 'numeric_value',
    type: 'numeric',
    precision: 8,
    scale: 2,
    nullable: true,
  })
  numericValue?: string | null;

  @Column({ name: 'display_order', type: 'int', default: 1 })
  displayOrder: number;

  @Column({ name: 'is_active', type: 'boolean', default: true })
  isActive: boolean;

  @OneToMany(
    () => CandidateScorecardResponseEntity,
    (response) => response.ratingOption,
    {
      cascade: false,
    },
  )
  responses: CandidateScorecardResponseEntity[];

  @BeforeInsert()
  assignCode(): void {
    if (!this.ratingOptionCode) {
      this.ratingOptionCode = generatePrefixedCode('RATING_OPTION');
    }
  }
}
