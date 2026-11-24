import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

import { SharedEntity } from './shared.entity';
import { UserEntity } from './user.entity';
import { LeavePlanLeaveTypeEntity } from './leave-plan-leave-types.entity';
import { LeaveCycleEntity } from './leave-cycles.entity';

import {
  LeaveAllocationSource,
  LeaveLedgerTransactionType,
} from 'src/common/enum';

@Entity('employee_leave_ledger')
@Index('IDX_EMPLOYEE_LEAVE_LEDGER_USER', [
  'user_id',
  'leave_plan_leave_type_id',
  'leave_cycle_id',
])
export class EmployeeLeaveLedgerEntity extends SharedEntity {
  @PrimaryGeneratedColumn('uuid')
  employee_leave_ledger_id: string;

  @Column({ type: 'uuid' })
  user_id: string;

  /**
   * HR/Admin/System user
   */
  @Column({
    type: 'uuid',
    nullable: true,
  })
  action_by_user_id?: string;

  @Column({ type: 'int' })
  leave_plan_leave_type_id: number;

  /**
   * IMPORTANT
   */
  @Column({ type: 'uuid' })
  leave_cycle_id: string;

  @Column({
    type: 'varchar',
    length: 30,
  })
  transaction_type: LeaveLedgerTransactionType;

  @Column({
    type: 'varchar',
    length: 30,
  })
  source: LeaveAllocationSource;

  /**
   * 2026
   * 2026-2027
   * 2026-05
   */
  @Column({
    type: 'varchar',
    length: 30,
  })
  period_key: string;

  /**
   * +2
   * -1
   */
  @Column({
    type: 'numeric',
    precision: 8,
    scale: 2,
  })
  days: string;

  @Column({
    type: 'numeric',
    precision: 8,
    scale: 2,
    default: 0,
  })
  balance_before: string;

  @Column({
    type: 'numeric',
    precision: 8,
    scale: 2,
    default: 0,
  })
  balance_after: string;

  @Column({
    type: 'timestamptz',
    default: () => 'CURRENT_TIMESTAMP',
  })
  transaction_date: Date;

  @Column({
    type: 'varchar',
    nullable: true,
  })
  remarks: string;

  @Column({
    type: 'jsonb',
    nullable: true,
  })
  meta: Record<string, any>;

  // ================= RELATIONS =================

  @ManyToOne(() => UserEntity, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'user_id' })
  user: UserEntity;

  @ManyToOne(() => UserEntity, {
    nullable: true,
    onDelete: 'SET NULL',
  })
  @JoinColumn({
    name: 'action_by_user_id',
  })
  actionBy: UserEntity;

  @ManyToOne(() => LeavePlanLeaveTypeEntity, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({
    name: 'leave_plan_leave_type_id',
  })
  leaveType: LeavePlanLeaveTypeEntity;

  /**
   * IMPORTANT
   */
  @ManyToOne(() => LeaveCycleEntity, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({
    name: 'leave_cycle_id',
  })
  leaveCycle: LeaveCycleEntity;
}
