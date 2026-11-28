import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { SharedEntity } from './shared.entity';
import {
  AttendanceTimeTrackingPolicyDetailDaysType,
  AttendanceTimeTrackingPolicyProrateType,
  TimeTrackingPolicyType,
} from 'src/common/enum';
import { AttendanceTimeTrackingPolicyEntity } from './attendance-timetracking-policy.entity';
import { AttendanceTimeTrackingPolicyDetailApprovalEntity } from './attendance-timetracking-policy-detail-approval.entity';

@Entity('attendance_timetracking_policy_detail')
export class AttendanceTimeTrackingPolicyDetailEntity extends SharedEntity {
  @PrimaryGeneratedColumn('uuid')
  attendance_timetracking_policicy_detail_id: string;

  @Column({ type: 'uuid' })
  attendance_timetracking_policy_id: string;

  @Column({ type: 'enum', enum: TimeTrackingPolicyType })
  policy_type: TimeTrackingPolicyType;

  @Column({ type: 'int', nullable: true })
  max_days_per_week?: number;

  @Column({ type: 'varchar', nullable: true })
  max_days_type: AttendanceTimeTrackingPolicyDetailDaysType;

  @Column({ type: 'varchar', nullable: true }) // new field
  prorate_based_on: AttendanceTimeTrackingPolicyProrateType;

  @Column({ type: 'boolean', default: false })
  allow_half_day: boolean;

  @Column({ type: 'boolean', default: false })
  allow_hourly: boolean;

  @Column({ type: 'int', nullable: true })
  prior_notice_days?: number;

  @Column({ type: 'int', nullable: true })
  apply_within_incident_days?: number;

  @Column({ type: 'int', nullable: true })
  past_dated_request_last_day_of_month?: number;

  @Column({ type: 'jsonb', nullable: true })
  allowed_days?: string[];

  @Column({ type: 'int', nullable: true })
  max_days_work_taken: number;

  @Column({ type: 'varchar', nullable: true })
  max_days_work_taken_type: AttendanceTimeTrackingPolicyDetailDaysType;

  @Column({ type: 'boolean', default: false })
  require_reason: boolean;

  // array of reasons
  @Column({ type: 'jsonb', nullable: true })
  reasons?: string[];

  @ManyToOne(
    () => AttendanceTimeTrackingPolicyEntity,
    (policy) => policy.timeTrackingDetail,
    {
      onDelete: 'CASCADE',
    },
  )
  @JoinColumn({ name: 'attendance_timetracking_policy_id' })
  policy: AttendanceTimeTrackingPolicyEntity;

  @OneToOne(
    () => AttendanceTimeTrackingPolicyDetailApprovalEntity,
    (approval) => approval.policyDetail,
    {
      cascade: true,
    },
  )
  approval: AttendanceTimeTrackingPolicyDetailApprovalEntity;
}
