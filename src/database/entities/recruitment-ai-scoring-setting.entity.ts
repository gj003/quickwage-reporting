import {
  BeforeInsert,
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { generatePrefixedCode } from 'src/common/utility';
import { BaseEntityColumns } from './base-entity-columns.entity';
import { CompanyEntity } from './company.entity';

/**
 * Tenant-level configuration for AI-powered candidate profile scoring.
 *
 * The five weight columns must always total 100 - enforced in
 * RecruitmentAiScoringSettingService, not by a DB constraint, so that a
 * partial update can be validated as a whole before it is written.
 *
 * Defaults are an even 20/20/20/20/20 split (a valid, neutral starting
 * configuration) rather than any particular tuned weighting.
 */
@Index('uq_recruitment_ai_scoring_setting_company', ['company_id'], {
  unique: true,
  where: '"deleted_at" IS NULL',
})
@Entity({ name: 'recruitment_ai_scoring_settings' })
export class RecruitmentAiScoringSettingEntity extends BaseEntityColumns {
  @PrimaryGeneratedColumn('uuid', {
    name: 'recruitment_ai_scoring_setting_id',
  })
  recruitment_ai_scoring_setting_id: string;

  @Column({
    name: 'recruitment_ai_scoring_setting_code',
    type: 'varchar',
    length: 64,
    unique: true,
  })
  recruitment_ai_scoring_setting_code: string;

  @Column({ name: 'company_id', type: 'uuid' })
  company_id: string;

  @ManyToOne(() => CompanyEntity, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'company_id', referencedColumnName: 'id' })
  company: CompanyEntity;

  @Column({ name: 'enable_ai_scoring', type: 'boolean', default: false })
  enable_ai_scoring: boolean;

  @Column({ name: 'weight_job_profile_match', type: 'int', default: 20 })
  weight_job_profile_match: number;

  @Column({ name: 'weight_skills_assessment', type: 'int', default: 20 })
  weight_skills_assessment: number;

  @Column({ name: 'weight_experience_level', type: 'int', default: 20 })
  weight_experience_level: number;

  @Column({ name: 'weight_educational_background', type: 'int', default: 20 })
  weight_educational_background: number;

  @Column({ name: 'weight_previous_organizations', type: 'int', default: 20 })
  weight_previous_organizations: number;

  @Column({ name: 'created_by', type: 'uuid', nullable: true })
  created_by?: string | null;

  @Column({ name: 'updated_by', type: 'uuid', nullable: true })
  updated_by?: string | null;

  @BeforeInsert()
  assignCode(): void {
    if (!this.recruitment_ai_scoring_setting_code) {
      this.recruitment_ai_scoring_setting_code = generatePrefixedCode(
        'RECRUITMENT_AI_SCORING_SETTING',
      );
    }
  }
}
