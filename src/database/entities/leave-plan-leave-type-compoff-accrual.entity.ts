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
  AttendanceRequestWindowType,
  LeaveDisplayFormatType,
} from 'src/common/enum';

@Entity('leave_plan_leave_type_compoff_accrual')
export class LeavePlanLeaveTypeCompOffAccrualEntity extends SharedEntity {
  @PrimaryGeneratedColumn('uuid')
  leave_plan_leave_type_compoff_accrual_id: string;

  @Column({
    type: 'varchar',
    length: 20,
    default: LeaveDisplayFormatType.DAYS,
  })
  calculated_in: LeaveDisplayFormatType;

  @Column({ type: 'boolean', default: false })
  allow_request_compoff_credit: boolean;

  @Column({ type: 'int', default: 0 })
  request_within_days: number;

  @Column({ type: 'int', default: 0 })
  max_allowed_instances: number;

  @Column({
    type: 'varchar',
    length: 20,
    nullable: true,
  })
  max_allowed_instances_window: AttendanceRequestWindowType;

  @Column({ type: 'boolean', default: false })
  only_non_working_days: boolean;

  @Column({ type: 'boolean', default: false })
  no_credit_without_attendance: boolean;

  @Column({ type: 'boolean', default: false })
  allow_manager_award_credit: boolean;

  @Column({
    type: 'varchar',
    length: 20,
    nullable: true,
  })
  leave_expires_window: AttendanceRequestWindowType;

  @Column({ type: 'int', default: 0 })
  leave_expires_after_days: number;

  @Column({ type: 'int' })
  leave_plan_leave_type_id: number;

  // ================= RELATIONS =================

  @OneToOne(() => LeavePlanLeaveTypeEntity, (lt) => lt.compOffAccrual, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'leave_plan_leave_type_id' })
  leavePlanLeaveType: LeavePlanLeaveTypeEntity;
}
