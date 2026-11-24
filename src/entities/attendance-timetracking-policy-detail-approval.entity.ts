import {
  Column,
  Entity,
  JoinColumn,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { SharedEntity } from './shared.entity';
import { AttendanceTimeTrackingPolicyDetailEntity } from './attendance-timetracking-policy-detail.entity';
import { AttendanceTimeTrackingPolicyDetailDaysType } from 'src/common/enum';
import { AttendanceTimeTrackingPolicyDetailApprovalLevelEntity } from './attendance-timetracking-policy-detail-approval-level.entity';

@Entity('attendance_timetracking_policy_detail_approval')
export class AttendanceTimeTrackingPolicyDetailApprovalEntity extends SharedEntity {
  @PrimaryGeneratedColumn('uuid')
  attendance_timetracking_policicy_detail_approval_id: string;

  @Column({ type: 'uuid' })
  attendance_timetracking_policicy_detail_id: string;

  @Column({ type: 'int', nullable: true })
  approval_required_after_times?: number;

  @Column({ type: 'varchar', nullable: true })
  approval_required_type: AttendanceTimeTrackingPolicyDetailDaysType;

  @Column({ type: 'boolean', default: false })
  auto_approve_if_approver_missing: boolean;

  @Column({ type: 'boolean', default: false })
  send_approval_email: boolean;

  @OneToOne(
    () => AttendanceTimeTrackingPolicyDetailEntity,
    (policy) => policy.approval,
    {
      onDelete: 'CASCADE',
    },
  )
  @JoinColumn({ name: 'attendance_timetracking_policicy_detail_id' })
  policyDetail: AttendanceTimeTrackingPolicyDetailEntity;

  @OneToMany(
    () => AttendanceTimeTrackingPolicyDetailApprovalLevelEntity,
    (level) => level.approval,
    {
      cascade: true,
    },
  )
  levels: AttendanceTimeTrackingPolicyDetailApprovalLevelEntity[];
}
