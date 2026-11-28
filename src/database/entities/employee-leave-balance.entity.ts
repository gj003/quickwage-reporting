import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { SharedEntity } from './shared.entity';
import { LeavePlanLeaveTypeEntity } from './leave-plan-leave-types.entity';
import { UserEntity } from './user.entity';
import { LeaveCycleEntity } from './leave-cycles.entity';

@Entity('employee_leave_balances')
// Partial so an expired (soft-deleted) balance doesn't block a fresh one for
// the same leave type and cycle when an employee moves back onto a plan.
@Index(
  'UQ_EMPLOYEE_LEAVE_BALANCE',
  ['user_id', 'leave_plan_leave_type_id', 'leave_cycle_id'],
  { unique: true, where: 'deleted_at IS NULL' },
)
export class EmployeeLeaveBalanceEntity extends SharedEntity {
  @PrimaryGeneratedColumn('uuid')
  employee_leave_balance_id: string;

  @Column({ type: 'uuid' })
  user_id: string;

  @Column({ type: 'int' })
  leave_plan_leave_type_id: number;

  @Column({ type: 'uuid' })
  leave_cycle_id: string;

  @Column({
    type: 'numeric',
    precision: 8,
    scale: 2,
    default: 0,
  })
  available_days: string;

  @Column({
    type: 'numeric',
    precision: 8,
    scale: 2,
    default: 0,
  })
  used_days: string;

  @Column({
    type: 'numeric',
    precision: 8,
    scale: 2,
    default: 0,
  })
  pending_days: string;

  // ================= RELATIONS =================

  @ManyToOne(() => LeaveCycleEntity)
  @JoinColumn({ name: 'leave_cycle_id' })
  leaveCycle: LeaveCycleEntity;

  @ManyToOne(() => LeavePlanLeaveTypeEntity)
  @JoinColumn({ name: 'leave_plan_leave_type_id' })
  leavePlanLeaveType: LeavePlanLeaveTypeEntity;

  @ManyToOne(() => UserEntity)
  @JoinColumn({ name: 'user_id' })
  user: UserEntity;
}
