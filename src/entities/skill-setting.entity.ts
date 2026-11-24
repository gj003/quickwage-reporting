import {
  BeforeInsert,
  Column,
  Entity,
  Index,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { BaseEntityColumns } from './base-entity-columns.entity';
import { generatePrefixedCode } from 'src/common/utility';

@Entity({ name: 'skill_settings' })
@Index('idx_skill_settings_company', ['companyId'])
@Index('uq_skill_settings_company_active', ['companyId'], {
  unique: true,
  where: '"deleted_at" IS NULL',
})
export class SkillSettingEntity extends BaseEntityColumns {
  @PrimaryGeneratedColumn('uuid', { name: 'skill_setting_id' })
  skillSettingId: string;

  @Column({ type: 'varchar', name: 'skill_setting_code', unique: true })
  skillSettingCode: string;

  @Column({ type: 'uuid', name: 'company_id' })
  companyId: string;

  @Column({ type: 'boolean', name: 'is_skill_enabled', default: false })
  isSkillEnabled: boolean;

  @Column({
    type: 'varchar',
    name: 'skill_terminology',
    length: 100,
    default: 'Skill',
  })
  skillTerminology: string;

  @Column({ type: 'boolean', name: 'is_rating_enabled', default: false })
  isRatingEnabled: boolean;

  @Column({
    type: 'varchar',
    name: 'rating_method',
    length: 50,
    nullable: true,
  })
  ratingMethod?: string | null;

  @Column({ type: 'int', name: 'rating_value_count', nullable: true })
  ratingValueCount?: number | null;

  @Column({ type: 'boolean', name: 'is_behaviour_enabled', default: false })
  isBehaviourEnabled: boolean;

  @Column({
    type: 'boolean',
    name: 'is_approval_chain_enabled',
    default: false,
  })
  isApprovalChainEnabled: boolean;

  @Column({
    type: 'boolean',
    name: 'allow_employee_self_assign',
    default: false,
  })
  allowEmployeeSelfAssign: boolean;

  @Column({
    type: 'boolean',
    name: 'allow_manager_assign_to_reports',
    default: false,
  })
  allowManagerAssignToReports: boolean;

  @Column({ type: 'varchar', length: 50, default: 'active' })
  status: string;

  @Column({ type: 'uuid', name: 'created_by', nullable: true })
  createdBy?: string | null;

  @Column({ type: 'uuid', name: 'updated_by', nullable: true })
  updatedBy?: string | null;

  @BeforeInsert()
  ensureCode(): void {
    if (!this.skillSettingCode) {
      this.skillSettingCode = generatePrefixedCode('SKILLSET');
    }
  }

  @BeforeInsert()
  ensureDefaults(): void {
    if (!this.skillTerminology) {
      this.skillTerminology = 'Skill';
    }

    if (!this.isRatingEnabled) {
      this.ratingMethod = null;
      this.ratingValueCount = null;
    }

    if (!this.status) {
      this.status = 'active';
    }
  }
}
