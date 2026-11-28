// src/database/entities/recruitment-requisition-setting.entity.ts

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
import { SharedEntity } from './shared.entity';
import { CompanyEntity } from './company.entity';
import { RecruitmentRequisitionApprovalLevelEntity } from './recruitment-requisition-approval-level.entity';
import { generatePrefixedCode } from 'src/common/utility';
import { RequisitionVisibilityScope } from 'src/common/enum';

/** One settings row per company (singleton), backing the "Requisition Settings" screen. */
@Index('uq_recruitment_requisition_settings_company', ['company_id'], {
  unique: true,
})
@Entity({ name: 'recruitment_requisition_settings' })
export class RecruitmentRequisitionSettingEntity extends SharedEntity {
  @PrimaryGeneratedColumn('uuid', {
    name: 'recruitment_requisition_setting_id',
  })
  recruitment_requisition_setting_id: string;

  @Column({
    name: 'recruitment_requisition_setting_code',
    type: 'varchar',
    length: 32,
    unique: true,
  })
  recruitment_requisition_setting_code: string;

  @Column({ name: 'company_id', type: 'uuid' })
  company_id: string;

  @ManyToOne(() => CompanyEntity, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'company_id', referencedColumnName: 'id' })
  company: CompanyEntity;

  // "Requisition Approver Approval" — when disabled, requisitions skip the
  // approval chain entirely and are auto-approved on submission.
  @Column({ name: 'approval_enabled', type: 'boolean', default: true })
  approval_enabled: boolean;

  // "New Job Title Creation in Requisition"
  @Column({
    name: 'new_job_title_creation_enabled',
    type: 'boolean',
    default: true,
  })
  new_job_title_creation_enabled: boolean;

  // "Automated Job Creation"
  @Column({
    name: 'automated_job_creation_enabled',
    type: 'boolean',
    default: false,
  })
  automated_job_creation_enabled: boolean;

  // "Requisition Visibility & Creation"
  @Column({
    name: 'visibility_creation_enabled',
    type: 'boolean',
    default: false,
  })
  visibility_creation_enabled: boolean;

  @Column({
    name: 'visibility_scope',
    type: 'varchar',
    length: 30,
    default: RequisitionVisibilityScope.NO_RESTRICTION,
  })
  visibility_scope: RequisitionVisibilityScope;

  // free-form config for who can view/create requisitions (role ids / scope),
  // interpreted by the service layer against the existing role/permission system
  @Column({
    name: 'visibility_creation_config',
    type: 'jsonb',
    nullable: true,
  })
  visibility_creation_config?: Record<string, unknown> | null;

  // "Instructions"
  @Column({ name: 'instructions_enabled', type: 'boolean', default: true })
  instructions_enabled: boolean;

  @Column({ name: 'instructions_text', type: 'text', nullable: true })
  instructions_text?: string | null;

  @Column({ name: 'created_by', type: 'uuid', nullable: true })
  created_by?: string | null;

  @Column({ name: 'updated_by', type: 'uuid', nullable: true })
  updated_by?: string | null;

  @OneToMany(
    () => RecruitmentRequisitionApprovalLevelEntity,
    (level) => level.setting,
  )
  approval_levels: RecruitmentRequisitionApprovalLevelEntity[];

  @BeforeInsert()
  assignCode(): void {
    if (!this.recruitment_requisition_setting_code) {
      this.recruitment_requisition_setting_code =
        generatePrefixedCode('REQ_SETTING');
    }
  }
}
