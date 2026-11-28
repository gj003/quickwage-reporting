import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { SharedEntity } from './shared.entity';
import { ExitTaskTemplateEntity } from './exit-task-template.entity';

@Entity('exit_task_list')
export class ExitTaskListEntity extends SharedEntity {
  @PrimaryGeneratedColumn('uuid')
  exit_task_list_id: string;

  @Column({ type: 'uuid' })
  company_id: string;

  @Column({ type: 'varchar', length: 255 })
  task_name: string;

  @Column({ type: 'text', nullable: true })
  description?: string;

  @Column({ type: 'boolean', default: true })
  is_mandatory: boolean;

  @Column({ type: 'boolean', default: true })
  is_active: boolean;

  @OneToMany(
    () => ExitTaskTemplateEntity,
    (template) => template.exit_task_list,
  )
  templates: ExitTaskTemplateEntity[];
}
