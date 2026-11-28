// src/database/entities/leave-plan-leave-types.entity.ts

import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { CompanyLeavePlanEntity } from './company-leave-plans.entity';
import { CompanyLeaveTypeEntity } from './company-leave-type.entity';
import { EmployeeLeaveBalanceEntity } from './employee-leave-balance.entity';
import { SharedEntity } from './shared.entity';
import {
  LeaveTypeAccrualFrequencyMode,
  LeaveTypeApplicableTo,
  LeaveTypeCalculatedIn,
  LeaveYearEndBalanceRule,
  ProrationMethodType,
} from 'src/common/enum';
import { LeavePlanLeaveTypeApprovalLevelEntity } from './leave-plan-leave-type-approval-level.entity';
import { LeavePlanLeaveTypeCompOffAccrualEntity } from './leave-plan-leave-type-compoff-accrual.entity';
import { LeavePlanLeaveTypeCompOffLeaveApplicationRuleEntity } from './leave-plan-leave-type-compoff-leave-application-rule.entity';
import { LeavePlanLeaveTypeCompOffYearEndEntity } from './leave-plan-leave-type-compoff-year-end.entity';

@Entity('leave_plan_leave_types')
export class LeavePlanLeaveTypeEntity extends SharedEntity {
  @PrimaryGeneratedColumn()
  leave_plan_leave_type_id: number;

  @Column({ type: 'int', nullable: true })
  company_leave_plan_id: number;

  @Column({ type: 'int', nullable: true })
  leave_type_id: number;

  @Column({
    type: 'varchar',
    length: 30,
    default: LeaveTypeApplicableTo.ALL,
  })
  applicable_to: LeaveTypeApplicableTo;

  // ================= Accrual =================

  @Column({ type: 'varchar', length: 20, default: LeaveTypeCalculatedIn.DAYS })
  calculated_in: LeaveTypeCalculatedIn;

  @Column({ type: 'numeric', default: 0 })
  yearly_quota: number;

  @Column({
    type: 'varchar',
    length: 30,
    default: LeaveTypeAccrualFrequencyMode.MONTHLY,
  })
  accrual_frequency_mode: LeaveTypeAccrualFrequencyMode;

  // ================= Leave Application =================

  @Column({ type: 'int', default: 0 })
  advance_window_days: number;

  @Column({ type: 'int', default: 0, comment: 'backdated_window_days' })
  backdatedays: number;

  @Column({
    type: 'boolean',
    default: false,
    comment: 'Employees can apply for first or second half sessions',
  })
  allow_half_day: boolean;

  @Column({
    type: 'boolean',
    default: false,
    comment: 'Require employees to enter a reason for every request',
  })
  mandatory_reason: boolean;

  @Column({
    type: 'boolean',
    default: false,
    comment: 'Enforce minimum days between consecutive leaves of this type',
  })
  enable_cooling_gap: boolean;

  @Column({
    type: 'int',
    default: 0,
    comment: 'Minimum number of days required between consecutive leaves',
  })
  cooling_gap_days: number;

  // ================= Year End =================

  @Column({ type: 'boolean', default: false })
  allow_carry_forward: boolean;

  @Column({
    type: 'varchar',
    length: 50,
    default: LeaveYearEndBalanceRule.CARRY_FORWARD_ONLY,
  })
  year_end_balance_rule: LeaveYearEndBalanceRule;

  @Column({
    type: 'int',
    default: 0,
    comment: 'Number of days allowed for carry forward at year end',
  })
  year_end_balance_exceed_days: number;

  @Column({
    type: 'int',
    default: 0,
    comment: 'Maximum number of days that can be carried forward at year end',
  })
  year_end_balance_carry_max: number;

  @Column({
    type: 'boolean',
    default: false,
    comment: 'Whether carried forward leaves expire after a certain period',
  })
  expire_carried_forward_leaves: boolean;

  @Column({
    type: 'int',
    default: 0,
    comment: 'Number of days after which carried forward leaves will expire',
  })
  expire_carried_forward_leaves_expire_after: number;

  @Column({
    type: 'boolean',
    default: false,
    comment: 'Whether encashment of leaves is allowed for this leave type',
  })
  allow_encashment: boolean;

  @Column({
    type: 'int',
    default: 0,
    comment: 'Number of days allowed for encashment at year end',
  })
  max_encashment_balance_exceed: number;

  @Column({
    type: 'int',
    default: 0,
    comment: 'Maximum number of days that can be encashed for this leave type',
  })
  max_encashment_days: number;

  // ================= PROBATION =================

  @Column({
    type: 'boolean',
    default: false,
    comment: 'Employees earn this leave while on probation',
  })
  accrue_leave_during_probation: boolean;

  @Column({
    type: 'boolean',
    default: false,
    comment: 'Adjust balance based on joining date within the month.',
  })
  prorate_first_month_accrual: boolean;

  @Column({
    type: 'varchar',
    nullable: true,
    comment: 'Adjust balance based on joining date within the month.',
  })
  proration_method: ProrationMethodType;

  @Column({
    type: 'jsonb',
    nullable: true,
    comment: 'Joining day range for first month accrual proration',
  })
  proration_range: { from_day: number; to_day: number; days?: number };

  @Column({
    type: 'boolean',
    default: false,
    comment: 'Prevent encashment until probation is completed.',
  })
  restrict_encashment_during_probation: boolean;

  @Column({
    type: 'boolean',
    default: false,
    comment: 'Employee can request leave only after N days from joining',
  })
  restrict_leave_requests_after_joining: boolean;

  @Column({
    type: 'int',
    default: 0,
    comment:
      'Number of days after joining before an employee can request leave',
  })
  restrict_leave_requests_after_joining_days: number;

  @Column({ type: 'boolean', default: true })
  isActive: boolean;

  // ================= NOTICE PERIOD =================

  @Column({
    type: 'boolean',
    default: false,
    comment: 'Adjust balance based on last working day in the month.',
  })
  prorate_leave_balance_on_exit: boolean;

  @Column({
    type: 'boolean',
    default: false,
    comment: 'Prevent encashment of this leave during notice period.',
  })
  restrict_encashment_during_notice: boolean;

  @Column({
    type: 'boolean',
    default: false,
    comment:
      'Auto-extend the last working day based on leaves used during notice.',
  })
  extend_notice_period_for_leaves_taken: boolean;

  @Column({
    type: 'int',
    default: 0,
    comment: 'Number of days to extend the notice period for each leave taken',
  })
  extend_notice_period_for_leaves_taken_days: number;

  // ================= APPROVAL =================

  @Column({ type: 'boolean', default: false })
  approval_required: boolean;

  // ================= RELATIONS =================

  @ManyToOne(() => CompanyLeavePlanEntity, (p) => p.leaveTypes, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'company_leave_plan_id' })
  plan: CompanyLeavePlanEntity;

  @ManyToOne(() => CompanyLeaveTypeEntity)
  @JoinColumn({ name: 'leave_type_id' })
  leaveType: CompanyLeaveTypeEntity;

  @OneToMany(
    () => LeavePlanLeaveTypeApprovalLevelEntity,
    (level) => level.leaveType,
    { cascade: true },
  )
  approvalLevels: LeavePlanLeaveTypeApprovalLevelEntity[];

  @OneToMany(
    () => EmployeeLeaveBalanceEntity,
    (balance) => balance.leavePlanLeaveType,
  )
  leaveBalances: EmployeeLeaveBalanceEntity[];

  @OneToOne(
    () => LeavePlanLeaveTypeCompOffAccrualEntity,
    (r) => r.leavePlanLeaveType,
  )
  compOffAccrual: LeavePlanLeaveTypeCompOffAccrualEntity;

  @OneToOne(
    () => LeavePlanLeaveTypeCompOffLeaveApplicationRuleEntity,
    (r) => r.leavePlanLeaveType,
  )
  compOffLeaveApplicationRule: LeavePlanLeaveTypeCompOffLeaveApplicationRuleEntity;

  @OneToOne(
    () => LeavePlanLeaveTypeCompOffYearEndEntity,
    (r) => r.leavePlanLeaveType,
  )
  compOffYearEnd: LeavePlanLeaveTypeCompOffYearEndEntity;
}
