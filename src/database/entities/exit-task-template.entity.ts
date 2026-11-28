import {
  Column,
  Entity,
  JoinColumn,
  JoinTable,
  ManyToMany,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { SharedEntity } from './shared.entity';
import {
  ExitTaskDueDay,
  ExitTaskNotificationOn,
  ExitTaskTrigger,
} from 'src/common/enum';
import { ExitTaskTemplateAllocationEntity } from './exit-task-template-allocation.entity';
import { ExitTaskListEntity } from './exit-task-list.entity';
import { RoleEntity } from './roles.entity';
import { EmployeeExitTaskEntity } from './employee-exit-task.entity';

@Entity('exit_task_template')
export class ExitTaskTemplateEntity extends SharedEntity {
  @PrimaryGeneratedColumn('uuid')
  exit_task_template_id: string;

  @Column({ type: 'uuid' })
  company_id: string;

  @Column({ type: 'varchar', length: 255 })
  name: string;

  @Column({ type: 'text', nullable: true })
  description: string;

  @Column({ type: 'varchar', nullable: true })
  attachment: string;

  @Column({ type: 'uuid' })
  exit_task_list_id: string;

  @ManyToOne(
    () => ExitTaskListEntity,
    (exitTaskList) => exitTaskList.templates,
    {
      onDelete: 'CASCADE',
    },
  )
  @JoinColumn({ name: 'exit_task_list_id' })
  exit_task_list: ExitTaskListEntity;

  @Column({ type: 'varchar' })
  task_trigger: ExitTaskTrigger;

  @Column({ type: 'int', nullable: true })
  trigger_day: number;

  @Column({ type: 'varchar', nullable: true })
  task_due_day: ExitTaskDueDay;

  @Column({ type: 'int', nullable: true })
  task_completion_due_day: number;

  @Column({ type: 'int' })
  task_owner_role_id: number;

  @ManyToOne(() => RoleEntity)
  @JoinColumn({ name: 'task_owner_role_id' })
  task_owner_role: RoleEntity;

  @Column({ type: 'boolean', default: false })
  task_allocated_to_all_employee: boolean;

  @Column({ type: 'jsonb', nullable: true })
  checklist: string[];

  @Column({ type: 'boolean', default: false })
  mandatory_attachment: boolean;

  @Column({ type: 'int', default: 0 })
  send_notification_to_employee: number;

  @Column({ type: 'varchar', nullable: true })
  send_notification_to_employee_on: ExitTaskNotificationOn;

  @ManyToMany(() => RoleEntity)
  @JoinTable({
    name: 'exit_task_template_approvers',
    joinColumn: {
      name: 'exit_task_template_id',
      referencedColumnName: 'exit_task_template_id',
    },
    inverseJoinColumn: { name: 'role_id', referencedColumnName: 'id' },
  })
  approvers?: RoleEntity[];

  @OneToMany(
    () => ExitTaskTemplateAllocationEntity,
    (allocation) => allocation.exit_task_template,
    { cascade: true },
  )
  allocations: ExitTaskTemplateAllocationEntity[];

  @OneToMany(
    () => EmployeeExitTaskEntity,
    (employeeExitTask) => employeeExitTask.exitTaskTemplate,
  )
  employee_exit_tasks: EmployeeExitTaskEntity[];
}
