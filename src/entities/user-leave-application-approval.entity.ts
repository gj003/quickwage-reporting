import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { SharedEntity } from './shared.entity';
import { LeaveApplicationEntity } from './leave-application.entity';
import { UserEntity } from './user.entity';
import { LeaveStatus, PlanApplicabilityCriteriaType } from 'src/common/enum';

@Entity('user_leave_application_approvals')
export class UserLeaveApplicationApprovalEntity extends SharedEntity {
  @PrimaryGeneratedColumn('uuid')
  user_leave_application_approval_id: string;

  @Column({ type: 'uuid' })
  leave_application_id: string;

  @Column({ type: 'uuid', nullable: true })
  approver_id: string;

  @Column({ type: 'varchar' })
  approval_status: LeaveStatus;

  @Column({ type: 'varchar', nullable: true })
  criteria_type?: string;

  @Column({ type: 'varchar', nullable: true })
  criteria_value?: string;

  @Column({ type: 'int', nullable: true })
  approlval_step: number;

  @Column({ type: 'text', nullable: true })
  remark: string;

  // relations

  @ManyToOne(
    () => LeaveApplicationEntity,
    (application) => application.approvals,
    {
      onDelete: 'CASCADE',
    },
  )
  @JoinColumn({
    name: 'leave_application_id',
    referencedColumnName: 'leave_application_id',
  })
  leaveApplication: LeaveApplicationEntity;

  @ManyToOne(() => UserEntity, { onDelete: 'SET NULL' })
  @JoinColumn({
    name: 'approver_id',
    referencedColumnName: 'user_id',
  })
  approver: UserEntity;
}
