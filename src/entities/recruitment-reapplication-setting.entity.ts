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
import { generatePrefixedCode } from 'src/common/utility';
import { BaseEntityColumns } from './base-entity-columns.entity';
import { CompanyEntity } from './company.entity';

@Entity({ name: 'recruitment_reapplication_settings' })
@Index('uq_recruitment_reapplication_setting_company', ['company_id'], {
  unique: true,
  where: '"deleted_at" IS NULL',
})
export class RecruitmentReapplicationSettingEntity extends BaseEntityColumns {
  @PrimaryGeneratedColumn('uuid', {
    name: 'recruitment_reapplication_setting_id',
  })
  recruitment_reapplication_setting_id: string;

  @Column({ name: 'auto_inc', type: 'int' })
  @Generated('increment')
  auto_inc: number;

  @Column({
    name: 'recruitment_reapplication_setting_code',
    type: 'varchar',
    length: 64,
    unique: true,
  })
  recruitment_reapplication_setting_code: string;

  @Column({ name: 'company_id', type: 'uuid' })
  company_id: string;

  @ManyToOne(() => CompanyEntity, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'company_id', referencedColumnName: 'id' })
  company: CompanyEntity;

  @Column({
    name: 'allow_multiple_active_job_applications',
    type: 'boolean',
    default: true,
  })
  allow_multiple_active_job_applications: boolean;

  @Column({ name: 'block_duration_value', type: 'int', default: 90 })
  block_duration_value: number;

  @Column({
    name: 'block_duration_unit',
    type: 'varchar',
    length: 20,
    default: 'DAYS',
  })
  block_duration_unit: string;

  @Column({ name: 'restrict_archive_reasons', type: 'boolean', default: false })
  restrict_archive_reasons: boolean;

  @Column({ name: 'allow_role_override', type: 'boolean', default: false })
  allow_role_override: boolean;

  @Column({
    name: 'selected_archive_reason_ids',
    type: 'simple-array',
    nullable: true,
  })
  selected_archive_reason_ids?: string[] | null;

  @Column({
    name: 'selected_override_role_ids',
    type: 'simple-array',
    nullable: true,
  })
  selected_override_role_ids?: string[] | null;

  @Column({ name: 'created_by', type: 'uuid', nullable: true })
  created_by?: string | null;

  @Column({ name: 'updated_by', type: 'uuid', nullable: true })
  updated_by?: string | null;

  @BeforeInsert()
  assignCode(): void {
    if (!this.recruitment_reapplication_setting_code)
      this.recruitment_reapplication_setting_code = generatePrefixedCode(
        'RECRUITMENT_REAPPLICATION_SETTING',
      );
  }
}
