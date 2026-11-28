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
import { ExitTaskTemplateEntity } from './exit-task-template.entity';
import { EmployeeExitTaskStatus } from 'src/common/enum';

@Entity({ name: 'employee_exit_task' })
@Index(
  'uq_employee_exit_task_request_template',
  ['employeeExitRequestId', 'exitTaskTemplateId'],
  { unique: true },
)
export class EmployeeExitTaskEntity extends SharedEntity {
  @PrimaryGeneratedColumn('uuid', { name: 'employee_exit_task_id' })
  employeeExitTaskId: string;

  @Column({ name: 'employee_exit_request_id', type: 'uuid' })
  employeeExitRequestId: string;

  @Column({ name: 'exit_task_template_id', type: 'uuid' })
  exitTaskTemplateId: string;

  @Column({
    type: 'varchar',
    length: 30,
    default: EmployeeExitTaskStatus.PENDING,
  })
  status: EmployeeExitTaskStatus;

  @Column({ name: 'due_date', type: 'date', nullable: true })
  dueDate?: string | null;

  @Column({ name: 'notified_at', type: 'timestamptz', nullable: true })
  notifiedAt?: Date | null;

  @ManyToOne(() => EmployeeExitRequestEntity, (request) => request.exitTasks)
  @JoinColumn({
    name: 'employee_exit_request_id',
    referencedColumnName: 'employeeExitRequestId',
  })
  employeeExitRequest: EmployeeExitRequestEntity;

  @ManyToOne(
    () => ExitTaskTemplateEntity,
    (template) => template.employee_exit_tasks,
  )
  @JoinColumn({
    name: 'exit_task_template_id',
    referencedColumnName: 'exit_task_template_id',
  })
  exitTaskTemplate: ExitTaskTemplateEntity;
}
