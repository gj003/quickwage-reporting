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

@Entity({ name: 'employee_exit_request_activity' })
@Index('idx_employee_exit_request_activity_request', ['employeeExitRequestId'])
export class EmployeeExitRequestActivityEntity extends SharedEntity {
  @PrimaryGeneratedColumn('uuid', {
    name: 'employee_exit_request_activity_id',
  })
  employeeExitRequestActivityId: string;

  @Column({ name: 'employee_exit_request_id', type: 'uuid' })
  employeeExitRequestId: string;

  @Column({ type: 'varchar', length: 1000 })
  remark: string;

  @Column({ name: 'user_id', type: 'uuid' })
  userId: string;

  @ManyToOne(() => EmployeeExitRequestEntity, (request) => request.activities, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({
    name: 'employee_exit_request_id',
    referencedColumnName: 'employeeExitRequestId',
  })
  employeeExitRequest: EmployeeExitRequestEntity;

  @ManyToOne(() => UserEntity)
  @JoinColumn({ name: 'user_id', referencedColumnName: 'user_id' })
  user: UserEntity;
}
