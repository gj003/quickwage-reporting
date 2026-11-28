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
 * Tenant-level rules governing whether existing employees may apply to
 * internally-posted jobs, and what they must satisfy to be eligible.
 *
 * Eligibility is evaluated by
 * RecruitmentInternalJobPostingSettingService.checkEligibility() against the
 * employee's existing joining/role dates - this row only stores the policy.
 */
@Index('uq_recruitment_internal_job_posting_setting_company', ['company_id'], {
  unique: true,
  where: '"deleted_at" IS NULL',
})
@Entity({ name: 'recruitment_internal_job_posting_settings' })
export class RecruitmentInternalJobPostingSettingEntity extends BaseEntityColumns {
  @PrimaryGeneratedColumn('uuid', {
    name: 'recruitment_internal_job_posting_setting_id',
  })
  recruitment_internal_job_posting_setting_id: string;

  @Column({
    name: 'recruitment_internal_job_posting_setting_code',
    type: 'varchar',
    length: 64,
    unique: true,
  })
  recruitment_internal_job_posting_setting_code: string;

  @Column({ name: 'company_id', type: 'uuid' })
  company_id: string;

  @ManyToOne(() => CompanyEntity, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'company_id', referencedColumnName: 'id' })
  company: CompanyEntity;

  @Column({
    name: 'enable_internal_job_applications',
    type: 'boolean',
    default: false,
  })
  enable_internal_job_applications: boolean;

  @Column({ name: 'minimum_company_tenure_months', type: 'int', default: 0 })
  minimum_company_tenure_months: number;

  @Column({
    name: 'minimum_current_role_tenure_months',
    type: 'int',
    default: 0,
  })
  minimum_current_role_tenure_months: number;

  @Column({ name: 'require_manager_approval', type: 'boolean', default: false })
  require_manager_approval: boolean;

  @Column({
    name: 'auto_approve_if_manager_unavailable',
    type: 'boolean',
    default: false,
  })
  auto_approve_if_manager_unavailable: boolean;

  @Column({ name: 'created_by', type: 'uuid', nullable: true })
  created_by?: string | null;

  @Column({ name: 'updated_by', type: 'uuid', nullable: true })
  updated_by?: string | null;

  @BeforeInsert()
  assignCode(): void {
    if (!this.recruitment_internal_job_posting_setting_code) {
      this.recruitment_internal_job_posting_setting_code = generatePrefixedCode(
        'RECRUITMENT_INTERNAL_JOB_POSTING_SETTING',
      );
    }
  }
}
