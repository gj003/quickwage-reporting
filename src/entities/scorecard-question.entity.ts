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
import { ScorecardEntity } from './scorecard.entity';
import { generatePrefixedCode } from 'src/common/utility';
import { CompanyEntity } from './company.entity';
import { ScorecardSectionEntity } from './scorecard-section.entity';
import { ScorecardRatingOptionEntity } from './scorecard-rating-option.entity';
import { CandidateScorecardResponseEntity } from './candidate-scorecard-response.entity';

export type ScorecardQuestionType = 'rating' | 'text' | 'boolean';

@Index('idx_scorecard_questions_company_deleted', ['companyId', 'deleted_at'])
@Index('idx_scorecard_questions_company_active_deleted', [
  'companyId',
  'isActive',
  'deleted_at',
])
@Index('idx_scorecard_questions_company_question_code', [
  'companyId',
  'questionCode',
])
@Index('idx_scorecard_questions_section_order_deleted', [
  'scorecardSectionId',
  'displayOrder',
  'deleted_at',
])
@Entity({ name: 'scorecard_questions' })
export class ScorecardQuestionEntity extends BaseEntityColumns {
  @PrimaryGeneratedColumn('increment', { name: 'scorecard_question_id' })
  scorecardQuestionId: number;

  @Column({
    name: 'question_code',
    type: 'varchar',
    length: 32,
    unique: true,
  })
  questionCode: string;

  @Column({ name: 'scorecard_id', type: 'int' })
  scorecardId: number;

  @ManyToOne(() => ScorecardEntity, (scorecard) => scorecard.questions, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'scorecard_id', referencedColumnName: 'scorecardId' })
  scorecard: ScorecardEntity;

  @Column({ name: 'company_id', type: 'uuid', nullable: true })
  companyId?: string | null;

  @ManyToOne(() => CompanyEntity, { nullable: true, onDelete: 'RESTRICT' })
  @JoinColumn({ name: 'company_id', referencedColumnName: 'id' })
  company?: CompanyEntity | null;

  @Column({ name: 'scorecard_section_id', type: 'int', nullable: true })
  scorecardSectionId?: number | null;

  @ManyToOne(() => ScorecardSectionEntity, (section) => section.questions, {
    nullable: true,
    onDelete: 'SET NULL',
  })
  @JoinColumn({
    name: 'scorecard_section_id',
    referencedColumnName: 'scorecardSectionId',
  })
  section?: ScorecardSectionEntity | null;

  @Column({ name: 'category', type: 'varchar', length: 150, nullable: true })
  category?: string | null;

  @Column({ name: 'type', type: 'varchar', length: 20 })
  type: ScorecardQuestionType;

  @Column({ name: 'prompt', type: 'varchar', length: 500 })
  prompt: string;

  @Column({
    name: 'instructions',
    type: 'varchar',
    length: 500,
    nullable: true,
  })
  instructions?: string | null;

  @Column({
    name: 'response_type',
    type: 'varchar',
    length: 50,
    nullable: true,
  })
  responseType?: string | null;

  @Column({ name: 'display_order', type: 'int', default: 1 })
  displayOrder: number;

  @Column({ name: 'is_required', type: 'boolean', default: false })
  isRequired: boolean;

  @Column({ name: 'is_active', type: 'boolean', default: true })
  isActive: boolean;

  @Column({
    name: 'weight',
    type: 'numeric',
    precision: 5,
    scale: 2,
    default: 1,
  })
  weight: string;

  @OneToMany(() => ScorecardRatingOptionEntity, (option) => option.question, {
    cascade: false,
  })
  ratingOptions: ScorecardRatingOptionEntity[];

  @OneToMany(
    () => CandidateScorecardResponseEntity,
    (response) => response.question,
    {
      cascade: false,
    },
  )
  responses: CandidateScorecardResponseEntity[];

  @BeforeInsert()
  assignCode(): void {
    if (!this.questionCode) {
      this.questionCode = generatePrefixedCode('QUESTION');
    }
  }
}
