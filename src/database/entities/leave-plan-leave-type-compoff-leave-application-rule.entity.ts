import {
  Column,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { SharedEntity } from './shared.entity';
import { LeavePlanLeaveTypeEntity } from './leave-plan-leave-types.entity';
import {
  LeavePlanCalendarType,
  WeeklyOffLeaveAdjoiningRule,
} from 'src/common/enum';

@Entity('leave_plan_leave_type_compoff_leave_application_rules')
export class LeavePlanLeaveTypeCompOffLeaveApplicationRuleEntity extends SharedEntity {
  @PrimaryGeneratedColumn('uuid')
  leave_plan_leave_type_compoff_leave_application_rule_id: string;

  @Column({ type: 'boolean', default: false })
  allow_half_day: boolean;

  // ================= PRIOR NOTICE =================

  @Column({ type: 'boolean', default: false })
  prior_notice_needed: boolean;

  @Column({ type: 'jsonb', nullable: true })
  prior_notice_rules: {
    calendar_days: number;
    working_days: number;
    for_days_or_more: number;
  }[];

  // ================= BACKDATED =================

  @Column({ type: 'boolean', default: false })
  limit_backdated_leave: boolean;

  @Column({ type: 'int', default: 0 })
  backdated_within_days: number;

  @Column({ type: 'int', default: 0 })
  backdated_before_day_of_month: number;

  // ================= MISC RULES =================

  @Column({ type: 'boolean', default: false })
  comment_mandatory: boolean;

  @Column({ type: 'boolean', default: false })
  cannot_avail_along_with: boolean;

  @Column({ type: 'boolean', default: false })
  manager_cannot_override: boolean;

  @Column({ type: 'int', default: 0 })
  max_days_per_month: number;

  // ================= WEEKLY OFF ADJOINING =================

  @Column({ type: 'boolean', default: false })
  weekly_off_as_leave: boolean;

  @Column({
    type: 'varchar',
    length: 50,
    nullable: true,
  })
  weekly_off_adjoining_rule: WeeklyOffLeaveAdjoiningRule;

  @Column({ type: 'int', default: 0 })
  weekly_off_total_leave_exceed: number;

  @Column({
    type: 'varchar',
    length: 30,
    nullable: true,
  })
  weekly_off_leave_calendar_type: LeavePlanCalendarType;

  @Column({ type: 'boolean', default: false })
  weekly_off_ignore_half_day: boolean;

  // ================= HOLIDAY ADJOINING =================

  @Column({ type: 'boolean', default: false })
  holiday_as_leave: boolean;

  @Column({
    type: 'varchar',
    length: 50,
    nullable: true,
  })
  holiday_adjoining_rule: WeeklyOffLeaveAdjoiningRule;

  @Column({ type: 'int', default: 0 })
  holiday_total_leave_exceed: number;

  @Column({
    type: 'varchar',
    length: 30,
    nullable: true,
  })
  holiday_leave_calendar_type: LeavePlanCalendarType;

  @Column({ type: 'boolean', default: false })
  holiday_ignore_half_day: boolean;

  @Column({ type: 'int' })
  leave_plan_leave_type_id: number;

  // ================= RELATIONS =================

  @OneToOne(
    () => LeavePlanLeaveTypeEntity,
    (lt) => lt.compOffLeaveApplicationRule,
    { onDelete: 'CASCADE' },
  )
  @JoinColumn({ name: 'leave_plan_leave_type_id' })
  leavePlanLeaveType: LeavePlanLeaveTypeEntity;
}
