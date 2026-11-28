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
  LeaveBalanceRoundOffDirection,
  LeaveBalanceRoundOffUnit,
  YearEndLeaveBalanceAction,
} from 'src/common/enum';

@Entity('leave_plan_leave_type_compoff_year_end')
export class LeavePlanLeaveTypeCompOffYearEndEntity extends SharedEntity {
  @PrimaryGeneratedColumn('uuid')
  leave_plan_leave_type_compoff_year_end_id: string;

  @Column({
    type: 'varchar',
    length: 50,
    default: YearEndLeaveBalanceAction.RESET_TO_ZERO,
  })
  year_end_action: YearEndLeaveBalanceAction;

  @Column({ type: 'jsonb', nullable: true })
  balance_rules: {
    balance_exceed_days: number;
    carry_forward_percent: number;
    pay_percent: number;
    payable_up_to_days: number;
    carry_forward_up_to_days: number;
  }[];

  @Column({
    type: 'varchar',
    length: 30,
    nullable: true,
  })
  round_off_direction: LeaveBalanceRoundOffDirection;

  @Column({
    type: 'varchar',
    length: 20,
    nullable: true,
  })
  round_off_unit: LeaveBalanceRoundOffUnit;

  @Column({ type: 'varchar', length: 255, nullable: true })
  carry_forward_to_leave_type: string;

  @Column({ type: 'int', default: 0 })
  carried_forward_expire_in_days: number;

  @Column({ type: 'int' })
  leave_plan_leave_type_id: number;

  // ================= RELATIONS =================

  @OneToOne(() => LeavePlanLeaveTypeEntity, (lt) => lt.compOffYearEnd, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'leave_plan_leave_type_id' })
  leavePlanLeaveType: LeavePlanLeaveTypeEntity;
}
