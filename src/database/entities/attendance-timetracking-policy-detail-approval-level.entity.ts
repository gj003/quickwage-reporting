import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { SharedEntity } from './shared.entity';
import { AttendanceTimeTrackingPolicyDetailApprovalCriteriaEntity } from './attendance-timetracking-policy-detail-approval-criteria.entity';
import { AttendanceTimeTrackingPolicyDetailApprovalEntity } from './attendance-timetracking-policy-detail-approval.entity';

@Entity('attendance_timetracking_policy_detail_approval_level')
export class AttendanceTimeTrackingPolicyDetailApprovalLevelEntity extends SharedEntity {
  @PrimaryGeneratedColumn('uuid')
  attendance_timetracking_policy_detail_approval_level_id: string;

  @Column({ type: 'uuid' })
  attendance_timetracking_policicy_detail_approval_id: string;

  @Column({ type: 'int', nullable: true })
  level: number;

  @Column({ type: 'int', nullable: true })
  skip_if_no_action_taken_days: number;

  @ManyToOne(
    () => AttendanceTimeTrackingPolicyDetailApprovalEntity,
    (approval) => approval.levels,
    {
      onDelete: 'CASCADE',
    },
  )
  @JoinColumn({ name: 'attendance_timetracking_policicy_detail_approval_id' })
  approval: AttendanceTimeTrackingPolicyDetailApprovalEntity;

  @OneToMany(
    () => AttendanceTimeTrackingPolicyDetailApprovalCriteriaEntity,
    (criteria) => criteria.level,
    {
      cascade: true,
    },
  )
  criteria: AttendanceTimeTrackingPolicyDetailApprovalCriteriaEntity[];
}
