// src/database/entities/leave-plan-applicability.entity.ts

import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { SharedEntity } from './shared.entity';
import { PlanApplicabilityCriteriaType } from 'src/common/enum';
import { LeavePlanLeaveTypeApprovalLevelEntity } from './leave-plan-leave-type-approval-level.entity';
import { UserEntity } from './user.entity';
import { RoleEntity } from './roles.entity';

@Entity('leave_plan_leave_type_approval_level_applicability')
export class LeavePlanLeaveTypeApprovalLevelApplicabilityEntity extends SharedEntity {
  @PrimaryGeneratedColumn()
  leave_plan_leave_type_approval_level_applicability_id: number;

  @Column({ type: 'int', nullable: true })
  leave_plan_leave_type_approval_level_id: number;

  @Column({
    type: 'varchar',
    length: 30,
    nullable: true,
  })
  criteria_type: PlanApplicabilityCriteriaType;

  @Column({ type: 'varchar', length: 255, nullable: true })
  criteria_value_id: number | string;

  @ManyToOne(
    () => LeavePlanLeaveTypeApprovalLevelEntity,
    (p) => p.applicabilityRules,
    {
      onDelete: 'CASCADE',
    },
  )
  @JoinColumn({ name: 'leave_plan_leave_type_approval_level_id' })
  plan: LeavePlanLeaveTypeApprovalLevelEntity;

  // runtime-only properties
  applicableUser?: UserEntity | null;

  applicableRole?: RoleEntity | null;
}
