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
 * Tenant-level employee-referral policy for the hiring module.
 *
 * This is the company-wide default. An individual job can still opt out via
 * JobListingEntity.allow_employee_referrals (the scorecard "Allow employee
 * referrals" hiring rule); referrals are permitted only when both agree.
 */
@Index('uq_recruitment_referral_setting_company', ['company_id'], {
  unique: true,
  where: '"deleted_at" IS NULL',
})
@Entity({ name: 'recruitment_referral_settings' })
export class RecruitmentReferralSettingEntity extends BaseEntityColumns {
  @PrimaryGeneratedColumn('uuid', { name: 'recruitment_referral_setting_id' })
  recruitment_referral_setting_id: string;

  @Column({
    name: 'recruitment_referral_setting_code',
    type: 'varchar',
    length: 64,
    unique: true,
  })
  recruitment_referral_setting_code: string;

  @Column({ name: 'company_id', type: 'uuid' })
  company_id: string;

  @ManyToOne(() => CompanyEntity, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'company_id', referencedColumnName: 'id' })
  company: CompanyEntity;

  @Column({ name: 'enable_employee_referrals', type: 'boolean', default: true })
  enable_employee_referrals: boolean;

  @Column({ name: 'show_rejection_reasons', type: 'boolean', default: false })
  show_rejection_reasons: boolean;

  @Column({ name: 'referral_policy', type: 'text', nullable: true })
  referral_policy?: string | null;

  @Column({ name: 'created_by', type: 'uuid', nullable: true })
  created_by?: string | null;

  @Column({ name: 'updated_by', type: 'uuid', nullable: true })
  updated_by?: string | null;

  @BeforeInsert()
  assignCode(): void {
    if (!this.recruitment_referral_setting_code) {
      this.recruitment_referral_setting_code = generatePrefixedCode(
        'RECRUITMENT_REFERRAL_SETTING',
      );
    }
  }
}
