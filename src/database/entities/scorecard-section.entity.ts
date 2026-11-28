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
import { ScorecardQuestionEntity } from './scorecard-question.entity';
import { generatePrefixedCode } from 'src/common/utility';

@Index('idx_scorecard_sections_company_deleted', ['companyId', 'deleted_at'])
@Index('idx_scorecard_sections_company_active_deleted', [
  'companyId',
  'isActive',
  'deleted_at',
])
@Index('idx_scorecard_sections_company_section_code', [
  'companyId',
  'sectionCode',
])
@Index('idx_scorecard_sections_scorecard_order_deleted', [
  'scorecardId',
  'displayOrder',
  'deleted_at',
])
@Entity({ name: 'scorecard_sections' })
export class ScorecardSectionEntity extends BaseEntityColumns {
  @PrimaryGeneratedColumn('increment', { name: 'scorecard_section_id' })
  scorecardSectionId: number;

  @Column({ name: 'section_code', type: 'varchar', length: 32, unique: true })
  sectionCode: string;

  @Column({ name: 'company_id', type: 'uuid', nullable: true })
  companyId?: string | null;

  @ManyToOne(() => CompanyEntity, { nullable: true, onDelete: 'RESTRICT' })
  @JoinColumn({ name: 'company_id', referencedColumnName: 'id' })
  company?: CompanyEntity | null;

  @Column({ name: 'scorecard_id', type: 'int' })
  scorecardId: number;

  @ManyToOne(() => ScorecardEntity, (scorecard) => scorecard.sections, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'scorecard_id', referencedColumnName: 'scorecardId' })
  scorecard: ScorecardEntity;

  @Column({ name: 'section_name', type: 'varchar', length: 200 })
  sectionName: string;

  @Column({ name: 'description', type: 'varchar', length: 500, nullable: true })
  description?: string | null;

  @Column({ name: 'display_order', type: 'int', default: 1 })
  displayOrder: number;

  @Column({ name: 'is_active', type: 'boolean', default: true })
  isActive: boolean;

  @OneToMany(() => ScorecardQuestionEntity, (question) => question.section, {
    cascade: false,
  })
  questions: ScorecardQuestionEntity[];

  @BeforeInsert()
  assignCode(): void {
    if (!this.sectionCode) {
      this.sectionCode = generatePrefixedCode('SECTION');
    }
  }
}
