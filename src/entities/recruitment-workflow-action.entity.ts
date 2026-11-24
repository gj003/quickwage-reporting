import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { BaseEntityColumns } from './base-entity-columns.entity';
import { RecruitmentWorkflowEntity } from './recruitment-workflow.entity';

@Entity({ name: 'recruitment_workflow_actions' })
export class RecruitmentWorkflowActionEntity extends BaseEntityColumns {
  @PrimaryGeneratedColumn('uuid', { name: 'recruitment_workflow_action_id' })
  recruitment_workflow_action_id: string;

  @Column({ name: 'company_id', type: 'uuid' })
  company_id: string;

  @Column({ name: 'recruitment_workflow_id', type: 'uuid' })
  recruitment_workflow_id: string;

  @ManyToOne(() => RecruitmentWorkflowEntity, (workflow) => workflow.actions, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'recruitment_workflow_id' })
  workflow: RecruitmentWorkflowEntity;

  @Column({ name: 'action_type', type: 'varchar', length: 60 })
  action_type: string;

  @Column({ name: 'sequence', type: 'int', default: 1 })
  sequence: number;

  @Column({ name: 'delay_value', type: 'int', nullable: true })
  delay_value?: number | null;

  @Column({ name: 'delay_unit', type: 'varchar', length: 20, nullable: true })
  delay_unit?: string | null;

  @Column({ name: 'email_template_id', type: 'uuid', nullable: true })
  email_template_id?: string | null;

  @Column({ name: 'notification_template_id', type: 'uuid', nullable: true })
  notification_template_id?: string | null;

  @Column({ name: 'target_stage_id', type: 'uuid', nullable: true })
  target_stage_id?: string | null;

  @Column({ name: 'task_title', type: 'varchar', length: 160, nullable: true })
  task_title?: string | null;

  @Column({
    name: 'task_description',
    type: 'varchar',
    length: 1000,
    nullable: true,
  })
  task_description?: string | null;

  @Column({
    name: 'task_assignee_type',
    type: 'varchar',
    length: 40,
    nullable: true,
  })
  task_assignee_type?: string | null;

  @Column({ name: 'task_assignee_user_id', type: 'uuid', nullable: true })
  task_assignee_user_id?: string | null;

  @Column({ name: 'task_due_after_value', type: 'int', nullable: true })
  task_due_after_value?: number | null;

  @Column({
    name: 'task_due_after_unit',
    type: 'varchar',
    length: 20,
    nullable: true,
  })
  task_due_after_unit?: string | null;

  @Column({ name: 'action_config', type: 'jsonb', nullable: true })
  action_config?: Record<string, unknown> | null;
}
