import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { SharedEntity } from './shared.entity';
import { EmployeeExitTaskEntity } from './employee-exit-task.entity';
import { UserEntity } from './user.entity';
import { EmployeeExitTaskStatus } from 'src/common/enum';

@Entity({ name: 'employee_exit_task_log' })
@Index('idx_employee_exit_task_log_task', ['employeeExitTaskId'])
export class EmployeeExitTaskLogEntity extends SharedEntity {
  @PrimaryGeneratedColumn('uuid', { name: 'employee_exit_task_log_id' })
  employeeExitTaskLogId: string;

  @Column({ name: 'employee_exit_task_id', type: 'uuid' })
  employeeExitTaskId: string;

  @Column({ type: 'varchar', length: 30 })
  status: EmployeeExitTaskStatus;

  @Column({ name: 'updated_by', type: 'uuid', nullable: true })
  updatedBy: string | null;

  @Column({ type: 'varchar', length: 500, nullable: true })
  remark?: string | null;

  @ManyToOne(() => EmployeeExitTaskEntity)
  @JoinColumn({
    name: 'employee_exit_task_id',
    referencedColumnName: 'employeeExitTaskId',
  })
  employeeExitTask: EmployeeExitTaskEntity;

  @ManyToOne(() => UserEntity, { nullable: true })
  @JoinColumn({ name: 'updated_by', referencedColumnName: 'user_id' })
  updatedByUser: UserEntity | null;
}
