import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { SharedEntity } from './shared.entity';
import { AttendanceTimeTrackingPolicyDetailApprovalLevelEntity } from './attendance-timetracking-policy-detail-approval-level.entity';

@Entity('attendance_timetracking_policy_detail_approval_criteria')
export class AttendanceTimeTrackingPolicyDetailApprovalCriteriaEntity extends SharedEntity {
  @PrimaryGeneratedColumn('uuid')
  attendance_timetracking_policy_detail_approval_criteria_id: string;

  @Column({ type: 'uuid' })
  attendance_timetracking_policy_detail_approval_level_id: string;

  @Column({ type: 'varchar', nullable: true })
  criteria_key: string;

  @Column({ type: 'varchar', nullable: true })
  criteria_value: string;

  @ManyToOne(
    () => AttendanceTimeTrackingPolicyDetailApprovalLevelEntity,
    (level) => level.criteria,
    {
      onDelete: 'CASCADE',
    },
  )
  @JoinColumn({
    name: 'attendance_timetracking_policy_detail_approval_level_id',
  })
  level: AttendanceTimeTrackingPolicyDetailApprovalLevelEntity;
}
