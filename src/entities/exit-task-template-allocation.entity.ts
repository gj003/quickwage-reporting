import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { SharedEntity } from './shared.entity';
import { ExitTaskAllocationCriteria } from 'src/common/enum';
import { ExitTaskTemplateEntity } from './exit-task-template.entity';

@Entity('exit_task_template_allocation')
export class ExitTaskTemplateAllocationEntity extends SharedEntity {
  @PrimaryGeneratedColumn('uuid')
  exit_task_template_allocation_id: string;

  @Column({ type: 'uuid' })
  exit_task_template_id: string;

  @Column({ type: 'varchar' })
  criteria_id: ExitTaskAllocationCriteria;

  @Column({ type: 'varchar' })
  criteria_value: string;

  @Column({ type: 'boolean', default: true })
  allow: boolean;

  @ManyToOne(() => ExitTaskTemplateEntity, (template) => template.allocations, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'exit_task_template_id' })
  exit_task_template: ExitTaskTemplateEntity;
}
