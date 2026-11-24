import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { SharedEntity } from './shared.entity';
import { EmployeeExitRequestEntity } from './employee-exit-request.entity';
import { UserEntity } from './user.entity';
import { EmployeeExitRequestStatus } from 'src/common/enum';

@Entity({ name: 'employee_exit_request_tracking' })
@Index('idx_employee_exit_request_tracking_request', ['employeeExitRequestId'])
export class EmployeeExitRequestTrackingEntity extends SharedEntity {
  @PrimaryGeneratedColumn('uuid', { name: 'employee_exit_request_tracking_id' })
  employeeExitRequestTrackingId: string;

  @Column({ name: 'employee_exit_request_id', type: 'uuid' })
  employeeExitRequestId: string;

  @Column({ type: 'varchar', length: 30 })
  status: EmployeeExitRequestStatus;

  // Approval level (ExitResignationTerminationApprovalLevelEntity.level) this
  // action was taken at. Null for non-level events, e.g. the request's
  // initial submission or an employee withdrawal.
  @Column({ type: 'int', nullable: true })
  level?: number | null;

  @Column({ type: 'varchar', length: 500, nullable: true })
  reason?: string | null;

  @Column({ name: 'updated_by', type: 'uuid', nullable: true })
  updatedBy: string | null;

  @ManyToOne(
    () => EmployeeExitRequestEntity,
    (request) => request.trackingHistory,
  )
  @JoinColumn({
    name: 'employee_exit_request_id',
    referencedColumnName: 'employeeExitRequestId',
  })
  employeeExitRequest: EmployeeExitRequestEntity;

  @ManyToOne(() => UserEntity, { nullable: true })
  @JoinColumn({ name: 'updated_by', referencedColumnName: 'user_id' })
  updatedByUser: UserEntity | null;
}
