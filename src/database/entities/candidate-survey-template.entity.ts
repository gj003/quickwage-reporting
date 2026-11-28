import {
  BeforeInsert,
  Column,
  Entity,
  Generated,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { BaseEntityColumns } from './base-entity-columns.entity';
import { CompanyEntity } from './company.entity';
import { generatePrefixedCode } from 'src/common/utility';

@Index('idx_candidate_survey_templates_company_category', [
  'companyId',
  'category',
])
@Entity({ name: 'candidate_survey_templates' })
export class CandidateSurveyTemplateEntity extends BaseEntityColumns {
  @PrimaryGeneratedColumn('uuid', { name: 'candidate_survey_template_id' })
  candidateSurveyTemplateId: string;
  @Column({ name: 'auto_inc', type: 'int' })
  @Generated('increment')
  autoInc: number;
  @Column({ name: 'template_code', type: 'varchar', length: 32, unique: true })
  templateCode: string;
  @Column({ name: 'company_id', type: 'uuid', nullable: true }) companyId?:
    string | null;
  @ManyToOne(() => CompanyEntity, { nullable: true, onDelete: 'CASCADE' })
  @JoinColumn({ name: 'company_id', referencedColumnName: 'id' })
  company?: CompanyEntity | null;
  @Column({ name: 'name', type: 'varchar', length: 200 }) name: string;
  @Column({ name: 'category', type: 'varchar', length: 40 }) category: string;
  @Column({ name: 'questions_json', type: 'text' }) questionsJson: string;
  @Column({ name: 'is_system', type: 'boolean', default: false })
  isSystem: boolean;
  @BeforeInsert() assignCode(): void {
    if (!this.templateCode)
      this.templateCode = generatePrefixedCode('SURVEY_TEMPLATE');
  }
}
