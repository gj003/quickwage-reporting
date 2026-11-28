// src/database/entities/recruitment-requisition-approval-level.entity.ts

import {
  BeforeInsert,
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { SharedEntity } from './shared.entity';
import { CompanyEntity } from './company.entity';
import { RecruitmentRequisitionSettingEntity } from './recruitment-requisition-setting.entity';
import { RoleEntity } from './roles.entity';
import { UserEntity } from './user.entity';
import { RequisitionApproverType } from 'src/common/enum';
import { generatePrefixedCode } from 'src/common/utility';

/** Ordered approval chain configured under Requisition Settings. */
@Index('idx_recruitment_requisition_approval_levels_company_deleted', [
  'company_id',
  'deleted_at',
])
@Index(
  'uq_recruitment_requisition_approval_levels_setting_sequence',
  ['recruitment_requisition_setting_id', 'sequence'],
  { unique: true, where: '"deleted_at" IS NULL' },
)
@Entity({ name: 'recruitment_requisition_approval_levels' })
export class RecruitmentRequisitionApprovalLevelEntity extends SharedEntity {
  @PrimaryGeneratedColumn('uuid', {
    name: 'recruitment_requisition_approval_level_id',
  })
  recruitment_requisition_approval_level_id: string;

  @Column({
    name: 'recruitment_requisition_approval_level_code',
    type: 'varchar',
    length: 32,
    unique: true,
  })
  recruitment_requisition_approval_level_code: string;

  @Column({ name: 'company_id', type: 'uuid' })
  company_id: string;

  @ManyToOne(() => CompanyEntity, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'company_id', referencedColumnName: 'id' })
  company: CompanyEntity;

  @Column({ name: 'recruitment_requisition_setting_id', type: 'uuid' })
  recruitment_requisition_setting_id: string;

  @ManyToOne(
    () => RecruitmentRequisitionSettingEntity,
    (setting) => setting.approval_levels,
    { onDelete: 'CASCADE' },
  )
  @JoinColumn({
    name: 'recruitment_requisition_setting_id',
    referencedColumnName: 'recruitment_requisition_setting_id',
  })
  setting: RecruitmentRequisitionSettingEntity;

  @Column({ name: 'sequence', type: 'int' })
  sequence: number;

  @Column({ name: 'approver_type', type: 'varchar', length: 30 })
  approver_type: RequisitionApproverType;

  // set when approver_type = SPECIFIC_USER
  @Column({ name: 'approver_user_id', type: 'uuid', nullable: true })
  approver_user_id?: string | null;

  @ManyToOne(() => UserEntity, { nullable: true, onDelete: 'SET NULL' })
  @JoinColumn({ name: 'approver_user_id', referencedColumnName: 'user_id' })
  approver_user?: UserEntity | null;

  // set when approver_type = ROLE (any active user holding this role may act)
  @Column({ name: 'approver_role_id', type: 'int', nullable: true })
  approver_role_id?: number | null;

  @ManyToOne(() => RoleEntity, { nullable: true, onDelete: 'SET NULL' })
  @JoinColumn({ name: 'approver_role_id', referencedColumnName: 'id' })
  approver_role?: RoleEntity | null;

  @Column({ name: 'is_active', type: 'boolean', default: true })
  is_active: boolean;

  // When set, a requisition sitting at this level with no explicit human
  // decision is auto-approved (and advanced/finalized) by the daily cron
  // after this many days.
  @Column({
    name: 'auto_approve_after_days',
    type: 'int',
    nullable: true,
  })
  auto_approve_after_days?: number | null;

  @BeforeInsert()
  assignCode(): void {
    if (!this.recruitment_requisition_approval_level_code) {
      this.recruitment_requisition_approval_level_code =
        generatePrefixedCode('REQ_LEVEL');
    }
  }
}
