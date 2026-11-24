// src/database/entities/attendance-timetracking-policy.entity.ts

import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { SharedEntity } from './shared.entity';
import { CompanyEntity } from './company.entity';
import { AttendanceTimeTrackingPolicyDetailEntity } from './attendance-timetracking-policy-detail.entity';
import { AttendanceTimeTrackingPolicyRuleEntity } from './attendance-timetracking-policy-rule.entity';
import {
  AttandanceTimeTrackingPolicyDenyRemoteWork,
  AttendancePartialDayLimitType,
  AttendanceRequestWindowType,
} from 'src/common/enum';

@Entity('attendance_timetracking_policy')
export class AttendanceTimeTrackingPolicyEntity extends SharedEntity {
  @PrimaryGeneratedColumn('uuid', {
    name: 'attendance_timetrackingpolicicy_id',
  })
  attendance_timetracking_policy_id: string;

  @Column({ type: 'uuid' })
  company_id: string;

  @Column({ type: 'varchar', length: 255 })
  policy_name: string;

  @Column({ type: 'text', nullable: true })
  description?: string;

  @Column({ type: 'boolean', default: false })
  exclude_holidays_and_weekly_offs: boolean;

  @Column({ type: 'boolean', default: false })
  attachment_mandatory: boolean;

  @Column({ type: 'varchar', nullable: true })
  deny_remote_work_on?: AttandanceTimeTrackingPolicyDenyRemoteWork;

  @Column({ type: 'int', nullable: true })
  max_request_advance_days?: number;

  @Column({ type: 'boolean', default: false })
  allow_clock_in_out: boolean;

  @Column({ type: 'boolean', default: true })
  web_clock_in_enabled: boolean;

  @Column({ type: 'boolean', default: false })
  mark_absent_on_no_punch: boolean;

  @Column({ type: 'boolean', default: true })
  is_enabled: boolean;

  @Column({ type: 'boolean', default: false })
  is_default: boolean;

  @Column({ type: 'boolean', default: false })
  geo_fencing_allowed: boolean;

  @Column({ type: 'jsonb', default: () => "'[]'::jsonb" })
  geo_fencing_locations: Array<{
    work_location_id?: number;
    latitude: number;
    longitude: number;
    radius: number;
  }>;

  // regularize

  @Column({ type: 'boolean', default: false })
  enable_attendance_adjustment: boolean;

  @Column({ type: 'boolean', default: false })
  adjustment_add_edit_all_logs: boolean;

  @Column({ type: 'boolean', default: false })
  adjustment_add_missing_logs: boolean;

  @Column({ type: 'int', nullable: true })
  adjustment_max_requests?: number;

  @Column({
    type: 'varchar',
    default: AttendanceRequestWindowType.WEEK,
  })
  adjustment_max_requests_window: AttendanceRequestWindowType;

  @Column({ type: 'int', nullable: true })
  adjustment_apply_within_incident_days?: number;

  @Column({ type: 'int', nullable: true })
  adjustment_past_date_last_day_of_month?: number;

  @Column({ type: 'boolean', default: false })
  enable_attendance_regularisation: boolean;

  @Column({ type: 'boolean', default: false })
  regularisation_remove_penalties: boolean;

  @Column({ type: 'int', nullable: true })
  regularisation_max_requests?: number;

  @Column({
    type: 'varchar',
    default: AttendanceRequestWindowType.WEEK,
  })
  regularisation_max_requests_window: AttendanceRequestWindowType;

  @Column({ type: 'int', nullable: true })
  regularisation_apply_within_incident_days?: number;

  @Column({ type: 'int', nullable: true })
  regularisation_past_date_last_day_of_month?: number;

  @Column({ type: 'boolean', default: false })
  regularisation_reason_required: boolean;

  @Column({ type: 'jsonb', nullable: true })
  regularisation_reasons?: string[];

  @Column({ type: 'boolean', default: false })
  enable_partial_day: boolean;

  @Column({
    type: 'varchar',
    default: AttendancePartialDayLimitType.MINUTES,
  })
  partial_day_limit_type: AttendancePartialDayLimitType;

  @Column({ type: 'int', nullable: true })
  partial_day_total_limit?: number;

  @Column({
    type: 'varchar',
    default: AttendanceRequestWindowType.WEEK,
  })
  partial_day_total_limit_window: AttendanceRequestWindowType;

  @Column({ type: 'int', nullable: true })
  partial_day_late_arrival_max_per_request?: number;

  @Column({ type: 'int', nullable: true })
  partial_day_early_departure_max_per_request?: number;

  @Column({ type: 'int', nullable: true })
  partial_day_shift_absence_max_per_request?: number;

  @Column({ type: 'boolean', default: false })
  partial_day_comment_mandatory: boolean;

  @Column({ type: 'int', nullable: true })
  partial_day_request_advance_days?: number;

  @Column({ type: 'boolean', default: false })
  partial_day_allow_past_dated_requests: boolean;

  @Column({ type: 'int', nullable: true })
  partial_day_allow_past_dated_day_upto?: number;

  @Column({ type: 'int', nullable: true })
  partial_day_allow_past_dated_last_date?: number;

  @Column({ type: 'boolean', default: false })
  enable_mandatory_approval: boolean;

  @Column({ type: 'int', nullable: true })
  approval_mandatory_after_requests?: number;

  @Column({
    type: 'varchar',
    default: AttendanceRequestWindowType.WEEK,
  })
  approval_mandatory_after_requests_window: AttendanceRequestWindowType;

  @Column({ type: 'jsonb', nullable: true })
  approval_levels?: Array<{
    level: number;
    assignees: Array<{ type: 'ROLE' | 'EMPLOYEE'; id: string | number }>;
  }>;

  @Column({ type: 'boolean', default: false })
  auto_approve_if_approver_missing: boolean;

  @Column({ type: 'boolean', default: false })
  disable_individual_approver_emails: boolean;

  @Column({ type: 'boolean', default: false })
  web_clock_in_comment_required: boolean;

  // relation

  @ManyToOne(() => CompanyEntity, (company) => company.id, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'company_id' })
  company: CompanyEntity;

  @OneToMany(
    () => AttendanceTimeTrackingPolicyDetailEntity,
    (detail) => detail.policy,
    { cascade: true },
  )
  timeTrackingDetail: AttendanceTimeTrackingPolicyDetailEntity[];

  @OneToMany(
    () => AttendanceTimeTrackingPolicyRuleEntity,
    (rule) => rule.policy,
    { cascade: true },
  )
  rules: AttendanceTimeTrackingPolicyRuleEntity[];
}
