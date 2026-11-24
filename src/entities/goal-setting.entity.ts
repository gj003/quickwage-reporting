// src/database/entities/goal-setting.entity.ts

import {
  BeforeInsert,
  Column,
  Entity,
  Index,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { BaseEntityColumns } from './base-entity-columns.entity';
import { generatePrefixedCode } from 'src/common/utility';
import { GoalManagerRole } from 'src/common/enum';

@Entity({ name: 'goal_settings' })
@Index('idx_goal_settings_company', ['companyId'])
@Index('uq_goal_settings_company_active', ['companyId'], {
  unique: true,
  where: '"deleted_at" IS NULL',
})
export class GoalSettingEntity extends BaseEntityColumns {
  @PrimaryGeneratedColumn('uuid', { name: 'goal_setting_id' })
  goalSettingId: string;

  @Column({ type: 'varchar', name: 'goal_setting_code', unique: true })
  goalSettingCode: string;

  @Column({ type: 'uuid', name: 'company_id' })
  companyId: string;

  // ─── Goal terminology ────────────────────────────────────────────────
  @Column({
    type: 'varchar',
    name: 'goal_terminology',
    length: 100,
    default: 'Goal',
  })
  goalTerminology: string;

  // ─── Individual Goals ─────────────────────────────────────────────────
  @Column({
    type: 'boolean',
    name: 'individual_goals_visible_to_everyone',
    default: true,
  })
  individualGoalsVisibleToEveryone: boolean;

  @Column({
    type: 'simple-json',
    name: 'individual_goals_managed_by',
    default: JSON.stringify([
      GoalManagerRole.REPORTING_MANAGER,
      GoalManagerRole.MANAGER_OF_MANAGER,
      GoalManagerRole.DEPARTMENT_HEAD,
      GoalManagerRole.BUSINESS_UNIT_HEAD,
      GoalManagerRole.DOTTED_LINE_MANAGER,
      GoalManagerRole.SELF,
    ]),
  })
  individualGoalsManagedBy: GoalManagerRole[];

  // ─── Department Goals ─────────────────────────────────────────────────
  @Column({
    type: 'boolean',
    name: 'department_goals_visible_to_everyone',
    default: true,
  })
  departmentGoalsVisibleToEveryone: boolean;

  @Column({
    type: 'simple-json',
    name: 'department_goals_managed_by',
    default: JSON.stringify([GoalManagerRole.DEPARTMENT_HEAD]),
  })
  departmentGoalsManagedBy: GoalManagerRole[];

  // ─── Company Goals ────────────────────────────────────────────────────
  @Column({
    type: 'boolean',
    name: 'company_goals_visible_to_everyone',
    default: true,
  })
  companyGoalsVisibleToEveryone: boolean;

  @Column({
    type: 'simple-json',
    name: 'company_goals_managed_by',
    default: '[]',
  })
  companyGoalsManagedBy: GoalManagerRole[];

  // ─── Advanced Goal settings ───────────────────────────────────────────
  @Column({ type: 'boolean', name: 'is_alignment_enabled', default: true })
  isAlignmentEnabled: boolean;

  @Column({
    type: 'boolean',
    name: 'is_auto_progress_rollup_enabled',
    default: true,
  })
  isAutoProgressRollupEnabled: boolean;

  @Column({
    type: 'boolean',
    name: 'allow_progress_override_with_subgoals',
    default: false,
  })
  allowProgressOverrideWithSubgoals: boolean;

  @Column({ type: 'boolean', name: 'is_equal_weights_enabled', default: true })
  isEqualWeightsEnabled: boolean;

  @Column({
    type: 'boolean',
    name: 'is_note_mandatory_on_progress_update',
    default: false,
  })
  isNoteMandatoryOnProgressUpdate: boolean;

  @Column({
    type: 'boolean',
    name: 'allow_task_progress_rollup_to_parent',
    default: false,
  })
  allowTaskProgressRollupToParent: boolean;

  @Column({
    type: 'boolean',
    name: 'is_difficulty_factor_enabled',
    default: false,
  })
  isDifficultyFactorEnabled: boolean;

  @Column({ type: 'int', name: 'min_goals_per_employee', default: 1 })
  minGoalsPerEmployee: number;

  @Column({ type: 'int', name: 'max_goals_per_employee', default: 5 })
  maxGoalsPerEmployee: number;

  // ─── Approval settings ──────────────────────────────────────────────────
  // Note: Company/Organization Goals never go through an approval process —
  // there is no column for it, matching the static note shown in the UI.
  @Column({
    type: 'boolean',
    name: 'require_approval_for_individual_goals',
    default: true,
  })
  requireApprovalForIndividualGoals: boolean;

  @Column({
    type: 'boolean',
    name: 'require_approval_for_department_goals',
    default: false,
  })
  requireApprovalForDepartmentGoals: boolean;

  // ─── Tag settings ───────────────────────────────────────────────────────
  @Column({ type: 'boolean', name: 'is_tags_enabled', default: true })
  isTagsEnabled: boolean;

  @Column({
    type: 'boolean',
    name: 'employees_can_create_tags',
    default: true,
  })
  employeesCanCreateTags: boolean;

  @Column({
    type: 'boolean',
    name: 'employee_tags_visible_to_everyone',
    default: true,
  })
  employeeTagsVisibleToEveryone: boolean;

  @Column({ type: 'varchar', length: 50, default: 'active' })
  status: string;

  @Column({ type: 'uuid', name: 'created_by', nullable: true })
  createdBy?: string | null;

  @Column({ type: 'uuid', name: 'updated_by', nullable: true })
  updatedBy?: string | null;

  @BeforeInsert()
  ensureDefaults(): void {
    if (!this.goalSettingCode) {
      this.goalSettingCode = generatePrefixedCode('GOALSET');
    }

    if (!this.goalTerminology) {
      this.goalTerminology = 'Goal';
    }

    if (!this.status) {
      this.status = 'active';
    }
  }
}
