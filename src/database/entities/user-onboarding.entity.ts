// src/database/entities/user-onboarding.entity.ts

import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { SharedEntity } from './shared.entity';
import { UserEntity } from './user.entity';
import { CompanyLeavePlanEntity } from './company-leave-plans.entity';
import { ShiftEntity } from './shift_template.entity';
import { ExpensePolicyEntity } from './expense-policy.entity';
import { HolidayCalendarEntity } from './holiday-calendar.entity';
import {
  AttendanceCaptureScheme,
  OvertimePolicy,
  PayrollTimeSource,
} from 'src/common/enum';
import { WeeklyOffEntity } from './weekly-off.entity';
import { OnboardingProbationPolicyEntity } from './onboarding-probation-policy.entity';
import { NoticePeriodPolicyEntity } from './notice-period-policy.entity';
import { PenalizationPolicyEntity } from './penalization-policy.entity';
import { AttendanceTimeTrackingPolicyEntity } from './attendance-timetracking-policy.entity';

@Entity('user_onboarding')
export class UserOnboardingEntity extends SharedEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'uuid', nullable: false })
  user_id: string;

  @Column({ type: 'uuid', nullable: true })
  onboarding_probation_policy_id: string;

  @Column({ type: 'int', nullable: true })
  company_leave_plan_id: number;

  @Column({ type: 'uuid', nullable: true })
  shift_id: string;

  @Column({ type: 'uuid', array: true, nullable: true })
  shift_ids: string[] | null;

  @Column({ type: 'uuid', nullable: true })
  expense_policy_id: string;

  @Column({ type: 'uuid', nullable: true })
  notice_period_policy_id: string;

  @Column({ type: 'uuid', nullable: true })
  company_holiday_calendar_id: string | null;

  @Column({ type: 'uuid', nullable: true })
  weekly_off_id: string;

  @Column({ type: 'boolean', default: false })
  allow_multiple_shifts: boolean;

  // @Column({ type: 'boolean', default: false })
  // attandance_number: number;

  @Column({ type: 'varchar', length: 50, nullable: true })
  attendance_capture_scheme?: AttendanceCaptureScheme;

  @Column({ type: 'uuid', nullable: true })
  attendance_timetracking_policy_id?: string;

  @Column({ type: 'varchar', length: 50, nullable: true })
  overtime?: OvertimePolicy;

  @Column({ type: 'varchar', length: 50, nullable: true })
  payroll_time_source?: PayrollTimeSource;

  @Column({ type: 'uuid', nullable: true })
  penalization_policy_id: string | null;

  @Column({ type: 'date', nullable: true })
  penalization_policy_effective_from: string | null;

  @Column({ type: 'date', nullable: true })
  penalization_policy_effective_to: string | null;

  @Column({ type: 'boolean', default: true })
  penalization_policy_no_end_date: boolean;

  // Relations

  @OneToOne(() => UserEntity, (rel) => rel.onboarding, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'user_id' })
  user: UserEntity;

  @ManyToOne(() => CompanyLeavePlanEntity, {
    nullable: true,
    onDelete: 'SET NULL',
  })
  @JoinColumn({ name: 'company_leave_plan_id' })
  companyLeavePlan: CompanyLeavePlanEntity;

  @ManyToOne(() => ShiftEntity, { nullable: true, onDelete: 'SET NULL' })
  @JoinColumn({ name: 'shift_id' })
  shiftTemplate: ShiftEntity;

  @ManyToOne(() => ExpensePolicyEntity, {
    nullable: true,
    onDelete: 'SET NULL',
  })
  @JoinColumn({ name: 'expense_policy_id' })
  expensePolicy: ExpensePolicyEntity;

  @ManyToOne(() => HolidayCalendarEntity, {
    nullable: true,
    onDelete: 'SET NULL',
  })
  @JoinColumn({ name: 'company_holiday_calendar_id' })
  holidayCalendar: HolidayCalendarEntity | null;

  @ManyToOne(() => WeeklyOffEntity, {
    nullable: true,
    onDelete: 'SET NULL',
  })
  @JoinColumn({ name: 'weekly_off_id' })
  weeklyOff: WeeklyOffEntity;

  @ManyToOne(() => OnboardingProbationPolicyEntity, {
    nullable: true,
    onDelete: 'SET NULL',
  })
  @JoinColumn({ name: 'onboarding_probation_policy_id' })
  probation: OnboardingProbationPolicyEntity;

  @ManyToOne(() => NoticePeriodPolicyEntity, {
    nullable: true,
    onDelete: 'SET NULL',
  })
  @JoinColumn({ name: 'notice_period_policy_id' })
  noticePeriodPolicy: NoticePeriodPolicyEntity;

  @ManyToOne(() => PenalizationPolicyEntity, {
    nullable: true,
    onDelete: 'SET NULL',
  })
  @JoinColumn({ name: 'penalization_policy_id' })
  penalizationPolicy: PenalizationPolicyEntity;

  @ManyToOne(() => AttendanceTimeTrackingPolicyEntity, {
    nullable: true,
    onDelete: 'SET NULL',
  })
  @JoinColumn({ name: 'attendance_timetracking_policy_id' })
  attendanceTimeTrackingPolicy?: AttendanceTimeTrackingPolicyEntity;
}
