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
 * Tenant-level configuration for the human-readable job ID series
 * (e.g. prefix "QW" + starting number 1001 => "QW-1001").
 *
 * This does NOT introduce a second code generator. When the series is
 * disabled, job codes keep coming from the shared generatePrefixedCode()
 * utility exactly as before. When it is enabled, this row supplies the
 * prefix and the sequential counter that the same job-creation path uses -
 * mirroring the existing asset_id_series / employee_number_series pattern
 * already established in this codebase.
 *
 * next_number is allocated inside a transaction with a row-level lock (see
 * RecruitmentJobIdSettingService.allocateJobCode) so concurrent job creation
 * can never hand out the same code twice.
 */
@Index('uq_recruitment_job_id_setting_company', ['company_id'], {
  unique: true,
  where: '"deleted_at" IS NULL',
})
@Entity({ name: 'recruitment_job_id_settings' })
export class RecruitmentJobIdSettingEntity extends BaseEntityColumns {
  @PrimaryGeneratedColumn('uuid', { name: 'recruitment_job_id_setting_id' })
  recruitment_job_id_setting_id: string;

  @Column({
    name: 'recruitment_job_id_setting_code',
    type: 'varchar',
    length: 64,
    unique: true,
  })
  recruitment_job_id_setting_code: string;

  @Column({ name: 'company_id', type: 'uuid' })
  company_id: string;

  @ManyToOne(() => CompanyEntity, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'company_id', referencedColumnName: 'id' })
  company: CompanyEntity;

  @Column({ name: 'enable_job_id_series', type: 'boolean', default: false })
  enable_job_id_series: boolean;

  @Column({
    name: 'job_id_prefix',
    type: 'varchar',
    length: 20,
    nullable: true,
  })
  job_id_prefix?: string | null;

  /** The next number to hand out. Also the "starting number" when untouched. */
  @Column({ name: 'next_number', type: 'int', default: 1001 })
  next_number: number;

  /** Zero-padding width; 0 means "no padding" (QW-1001 rather than QW-0001001). */
  @Column({ name: 'digits', type: 'int', default: 0 })
  digits: number;

  @Column({ name: 'separator', type: 'varchar', length: 5, default: '-' })
  separator: string;

  @Column({ name: 'created_by', type: 'uuid', nullable: true })
  created_by?: string | null;

  @Column({ name: 'updated_by', type: 'uuid', nullable: true })
  updated_by?: string | null;

  @BeforeInsert()
  assignCode(): void {
    if (!this.recruitment_job_id_setting_code) {
      this.recruitment_job_id_setting_code = generatePrefixedCode(
        'RECRUITMENT_JOB_ID_SETTING',
      );
    }
  }
}
