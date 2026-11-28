// src/database/entities/leave-plan-applicability.entity.ts

import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { SharedEntity } from './shared.entity';
import { LeavePlanLeaveTypeEntity } from './leave-plan-leave-types.entity';
import { LeavePlanLeaveTypeApprovalLevelApplicabilityEntity } from './leave-plan-leave-type-approval-level-applicability.entity';

@Entity('leave_plan_leave_type_approval_levels')
export class LeavePlanLeaveTypeApprovalLevelEntity extends SharedEntity {
  @PrimaryGeneratedColumn()
  leave_plan_leave_type_approval_level_id: number;

  @Column({ type: 'int' })
  leave_plan_leave_type_id: number;

  @Column({ type: 'int' })
  level: number;

  @Column({ type: 'int', default: 0 })
  skip_step_if_no_action_taken_in_days: number;

  // relations

  @ManyToOne(
    () => LeavePlanLeaveTypeEntity,
    (leaveType) => leaveType.approvalLevels,
    { onDelete: 'CASCADE' },
  )
  @JoinColumn({ name: 'leave_plan_leave_type_id' })
  leaveType: LeavePlanLeaveTypeEntity;

  @OneToMany(
    () => LeavePlanLeaveTypeApprovalLevelApplicabilityEntity,
    (r) => r.plan,
  )
  applicabilityRules: LeavePlanLeaveTypeApprovalLevelApplicabilityEntity[];
}
