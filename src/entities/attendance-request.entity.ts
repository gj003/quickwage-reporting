// src/database/entities/attendance-request.entity.ts

import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  OneToMany,
  OneToOne,
  JoinColumn,
} from 'typeorm';
import { SharedEntity } from './shared.entity';
import { UserEntity } from './user.entity';
import { AttendanceEntity } from './attendance.entity';
import { AttendanceTimeTrackingPolicyEntity } from './attendance-timetracking-policy.entity';
import {
  AttendanceRequestType,
  AttendanceRequestStatus,
} from 'src/common/enum';
import { AttendanceAdjustmentDetailEntity } from './attendance-adjustment-detail.entity';
import { AttendanceRegularisationDetailEntity } from './attendance-regularisation-detail.entity';
import { AttendanceWfhDetailEntity } from './attendance-wfh-detail.entity';
import { AttendancePartialDayDetailEntity } from './attendance-partial-day-detail.entity';
import { AttendanceOnDutyDetailEntity } from './attendance-on-duty-detail.entity';
import { AttendanceRequestApprovalLevelEntity } from './attendance-request-approval-level.entity';

@Entity('attendance_requests')
export class AttendanceRequestEntity extends SharedEntity {
  @PrimaryGeneratedColumn('uuid')
  request_id: string;

  @Column({ type: 'uuid' })
  user_id: string;

  @Column({ type: 'uuid' })
  company_id: string;

  @Column({ type: 'integer', nullable: true })
  attendance_id: number | null;

  @Column({ type: 'uuid' })
  time_tracking_policy_id: string;

  @Column({ type: 'varchar' })
  request_type: AttendanceRequestType;

  @Column({ type: 'date' })
  request_date: Date;

  @Column({
    type: 'varchar',
    default: AttendanceRequestStatus.PENDING,
  })
  status: AttendanceRequestStatus;

  @Column({ type: 'uuid', nullable: true })
  approver_id: string | null;

  @Column({ type: 'timestamp', nullable: true })
  approval_date: Date | null;

  @Column({ type: 'text', nullable: true })
  comments: string | null;

  @Column({ type: 'text', nullable: true })
  attachment_url: string | null;

  @Column({ type: 'int', nullable: true })
  current_level: number | null;

  @Column({ type: 'jsonb', nullable: true })
  meta: Record<string, unknown> | null;

  // relations

  @ManyToOne(() => UserEntity, { nullable: false, onDelete: 'CASCADE' })
  @JoinColumn({ name: 'user_id', referencedColumnName: 'user_id' })
  user: UserEntity;

  @ManyToOne(() => AttendanceEntity, { nullable: true, onDelete: 'SET NULL' })
  @JoinColumn({ name: 'attendance_id' })
  attendance: AttendanceEntity | null;

  @ManyToOne(() => AttendanceTimeTrackingPolicyEntity, {
    nullable: false,
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'time_tracking_policy_id' })
  timeTrackingPolicy: AttendanceTimeTrackingPolicyEntity;

  @ManyToOne(() => UserEntity, { nullable: true, onDelete: 'SET NULL' })
  @JoinColumn({ name: 'approver_id', referencedColumnName: 'user_id' })
  approver: UserEntity | null;

  @OneToMany(
    () => AttendanceAdjustmentDetailEntity,
    (detail) => detail.request,
    { cascade: true },
  )
  adjustmentDetails: AttendanceAdjustmentDetailEntity[];

  @OneToOne(
    () => AttendanceRegularisationDetailEntity,
    (detail) => detail.request,
    { cascade: true },
  )
  regularisationDetail: AttendanceRegularisationDetailEntity | null;

  @OneToOne(() => AttendanceWfhDetailEntity, (detail) => detail.request, {
    cascade: true,
  })
  wfhDetail: AttendanceWfhDetailEntity | null;

  @OneToOne(
    () => AttendancePartialDayDetailEntity,
    (detail) => detail.request,
    { cascade: true },
  )
  partialDayDetail: AttendancePartialDayDetailEntity | null;

  @OneToOne(() => AttendanceOnDutyDetailEntity, (detail) => detail.request, {
    cascade: true,
  })
  onDutyDetail: AttendanceOnDutyDetailEntity | null;

  @OneToMany(
    () => AttendanceRequestApprovalLevelEntity,
    (level) => level.request,
    { cascade: true },
  )
  approvalLevels: AttendanceRequestApprovalLevelEntity[];
}
