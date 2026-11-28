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

@Entity({ name: 'employee_exit_replacement_manager' })
@Index('idx_employee_exit_replacement_manager_request', [
  'employeeExitRequestId',
])
@Index(
  'uq_employee_exit_replacement_manager_subordinate',
  ['employeeExitRequestId', 'subordinateEmployeeId'],
  { unique: true },
)
export class EmployeeExitReplacementManagerEntity extends SharedEntity {
  @PrimaryGeneratedColumn('uuid', {
    name: 'employee_exit_replacement_manager_id',
  })
  employeeExitReplacementManagerId: string;

  @Column({ name: 'employee_exit_request_id', type: 'uuid' })
  employeeExitRequestId: string;

  @Column({ name: 'subordinate_employee_id', type: 'uuid' })
  subordinateEmployeeId: string;

  @Column({ name: 'replacement_manager_id', type: 'uuid' })
  replacementManagerId: string;

  /**
   * When the subordinate's reporting manager was actually switched over to
   * replacementManagerId. Null until the exit request reaches EXITED and
   * EmployeeExitRequestSubscriber applies the handover; it doubles as the
   * idempotency guard so a re-save of an already EXITED request never
   * re-points a manager that has since been changed by hand.
   */
  @Column({ name: 'manager_replaced_at', type: 'timestamptz', nullable: true })
  managerReplacedAt?: Date | null;

  @ManyToOne(
    () => EmployeeExitRequestEntity,
    (request) => request.replacementManagers,
    { onDelete: 'CASCADE' },
  )
  @JoinColumn({
    name: 'employee_exit_request_id',
    referencedColumnName: 'employeeExitRequestId',
  })
  employeeExitRequest: EmployeeExitRequestEntity;

  @ManyToOne(() => UserEntity)
  @JoinColumn({
    name: 'subordinate_employee_id',
    referencedColumnName: 'user_id',
  })
  subordinateEmployee: UserEntity;

  @ManyToOne(() => UserEntity)
  @JoinColumn({
    name: 'replacement_manager_id',
    referencedColumnName: 'user_id',
  })
  replacementManager: UserEntity;
}
