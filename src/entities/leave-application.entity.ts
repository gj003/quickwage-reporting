// src/database/entities/leave-application.entity.ts

import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  OneToMany,
  JoinColumn,
} from 'typeorm';
import { SharedEntity } from './shared.entity';
import { UserEntity } from './user.entity';
import { LeaveStatus, LeaveDayType } from 'src/common/enum';
import { LeavePlanLeaveTypeEntity } from './leave-plan-leave-types.entity';
import { UserLeaveApplicationApprovalEntity } from './user-leave-application-approval.entity';
import { LeaveCycleEntity } from './leave-cycles.entity';

@Entity('user_leave_applications')
export class LeaveApplicationEntity extends SharedEntity {
  @PrimaryGeneratedColumn('uuid')
  leave_application_id: string;

  @Column({ type: 'uuid' })
  user_id: string;

  @Column({ type: 'int' })
  leave_plan_leave_type_id: number;

  @Column({ type: 'date' })
  start_date: Date;

  @Column({ type: 'date' })
  end_date: Date;

  @Column({ type: 'varchar', default: LeaveDayType.FULL })
  leave_day_type: LeaveDayType;

  @Column({ type: 'text' })
  reason: string;

  @Column('text', {
    array: true,
    nullable: true,
    default: () => 'ARRAY[]::text[]',
  })
  attachments: string[];

  @Column({
    type: 'varchar',
    default: LeaveStatus.PENDING,
  })
  status: LeaveStatus;

  @Column({
    name: 'leave_cycle_id',
    type: 'uuid',
    nullable: true,
  })
  leave_cycle_id?: string;

  // Relations
  @ManyToOne(() => UserEntity, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'user_id', referencedColumnName: 'user_id' })
  user: UserEntity;

  @ManyToOne(() => LeavePlanLeaveTypeEntity, { onDelete: 'CASCADE' })
  @JoinColumn({
    name: 'leave_plan_leave_type_id',
    referencedColumnName: 'leave_plan_leave_type_id',
  })
  leave_type: LeavePlanLeaveTypeEntity;

  @OneToMany(
    () => UserLeaveApplicationApprovalEntity,
    (approval) => approval.leaveApplication,
  )
  approvals: UserLeaveApplicationApprovalEntity[];

  @ManyToOne(() => LeaveCycleEntity, { nullable: false })
  @JoinColumn({
    name: 'leave_cycle_id',
  })
  leaveCycle: LeaveCycleEntity;
}
